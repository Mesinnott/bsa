var registration;
var formData;
var confirmationID; 

function lockForm() {
    var participantBtn = document.getElementById('registrant-modal-btn');
    formData.contacts = formData.contacts || {};
    var contacts = Object.keys(formData.contacts).length;
    if (contacts < 2) {
        participantBtn.disabled = true;
    } else {
        participantBtn.disabled = false;
    }
}

function Contact(firstName, lastName, position, email, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.email = email;
    this.phoneNumber = phoneNumber;
}

function Participant(firstName, lastName, tShirt, healthForm, adult, denLeader) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.adult = adult;
    this.tShirt = tShirt;
    this.healthForm = healthForm;
    this.denLeader = denLeader;
}

function addRegistrant(e, form, type) {
    // Prevent page reload
    e.preventDefault();
    
    // define values
    var firstName = form['firstName'].value;
    var lastName = form['lastName'].value;
    if (type === 'contact') {
        var position = form['position'].value;
        var email = form['email'].value;
        var phoneNumber = form['phoneNumber'].value;
        //handle edits
        if (form['key'].value) {
            registration.child('contacts').child(form['key'].value).update(new Contact(firstName, lastName, position, email, phoneNumber));
        } else {
            registration.child('contacts').push(new Contact(firstName, lastName, position, email, phoneNumber));
        }
    } else {
        var adult = form['adult'].value;
        var denLeader = form['denLeader'].value;
        var healthForm = form['healthForm'].value;
        var tShirt = form['tShirt'].value;
        var participant = new Participant(firstName, lastName, tShirt, healthForm, adult, denLeader);
        if (form['key'].value) {
            registration.child('participants').child(form['key'].value).update(participant)
        } else {
            registration.child('participants').push(participant)
        }
    }
    // clear form
    form.reset();
}

function editContact(btn, list) {
    var key = btn.id;
    var user = formData[list][key] || {};
    var form = document.getElementById(list + '-form');
    form['key'].value = key;
    //set form details
    for (var key in user) {
        form[key].value = user[key];
        if (key === 'adult' || key === 'healthForm' || key === 'denLeader') {
            if (user[key] === 'true') {
                form[key].checked = true;
                form[key].value = 'true'
            }
        }
    }
    displayModal(list + '-modal')
}

function showMessage() {
    var regMessage = $('#reg-message');
    if (!formData.participants) {
        return;
    }
    formData.participants = formData.participants || {};
    var participants = Object.keys(formData.participants).length;
    if (!regMessage.hasClass('alert-danger')) {
        regMessage.removeClass('alert-info');
        regMessage.addClass('alert-danger');
    };
    if (participants < 2) {
        regMessage.text('Two adult participants are required prior to adding scouts');
    } else if (participants % 5 === 0 && participants > 10) {
        regMessage.text('Another adult leader is required to continue adding scouts');
    } else {
        regMessage.removeClass('alert-danger');
        regMessage.addClass('alert-info');
        regMessage.text('Add scouts we will let you know when another adult is necessary');
    }
}

function drawContacts(currentUser) {
    $('#contact-list').empty();
    var template = '';
    formData.contacts = formData.contacts || {};
    for (var key in formData.contacts) {
        var currentUser = formData.contacts[key];
        template += '<li class="list-group-item text-left"><h4 class="list-group-item-heading">' + currentUser.firstName + ' ' + currentUser.lastName + '</h4><p class="list-group-item-text"><b>Email <i class="glyphicon glyphicon-envelope"></i></b> ' + currentUser.email + '</p><p class="list-group-item-text"><b>Phone <i class="glyphicon glyphicon-earphone"></i></b> ' + currentUser.phoneNumber + '</p><p class="list-group-item-text"><b>Position:</b> ' + currentUser.position + '</p><div class="button-group"><button class="btn btn-raised btn-info" id="' + key + '" onclick="editContact(this, \'contacts\')"><i class="glyphicon glyphicon-edit"></i> Edit</button><button class="btn btn-raised btn-danger" id="' + key + '" onclick="removeContact(this, \'contacts\')"><i class="glyphicon glyphicon-trash"></i> Remove</button></div></div></div></li>';
    }
    $('#contact-list').append(template);
    if (Object.keys(formData.contacts).length > 1) {
        $('#contacts-modal').modal('hide')
    }
}

function toggleValue(btn, on, off) {
    if (btn.value == on) {
        btn.value = off;
        $(this).removeAttr('checked');
    } else {
        btn.value = on;
        btn.checked = true;
    }
}

function removeContact(button, list) {
    var key = button.id;
    registration.child(list).child(key).remove();
}

function update() {
    var template = '';
    $('#pack-num').text(user.pack);
    $('#camp-num').text(db.getCamp(user.camp).id);
    $('#form-notes').val(formData.notes);
    showMessage();
    $('#participant-list').empty();
    resetPrices();

    for (var key in formData.participants) {
        //read object
        var currentUser = formData.participants[key];
        //write to page
        var fullName = currentUser.firstName + ' ' + currentUser.lastName;
        var adultClass = currentUser.adult === 'true' ? 'adult': '';
        var healthFormIcon = currentUser.healthForm === 'true' ? '<i class="glyphicon glyphicon-ok" style="color:green;"></i>' : '<i class="glyphicon glyphicon-unchecked" style="color:red;"></i>';
        var notes = currentUser.notes ? currentUser.notes : '...';
        var shirtSize = currentUser.tShirt == 'false' ? '<i class="glyphicon glyphicon-exclamation-sign" style="color: red;"></i> not selected': currentUser.tShirt;
        
        template += '<li class="list-group-item participant ' + adultClass + '"><div class="row-content"><div class="button-group pull-right"><button class="btn btn-raised btn-info" id="' + key + '" onclick="editContact(this, \'participants\')"><i class="glyphicon glyphicon-edit"></i></button><button class="btn btn-raised btn-danger" id="' + key + '" onclick="removeContact(this, \'participants\')"><i class="glyphicon glyphicon-trash"></i></button></div><h4 class="list-group-item-heading">' + fullName + '</h4><p class="list-group-item-text">Shirt Size: ' + shirtSize + '</p><p class="list-group-item-text">Health Form: ' + healthFormIcon + '</p><p class="list-group-item-text">Notes: '+ notes + '</p></div></div></li>';
        //Appends currentuser to the table
        addShirt(currentUser);
    }
    $('#participant-list').append(template);
    lockForm();
    drawContacts();
    updatePrices();
}

function displayModal(id) {
    $("#" + id).modal({
        show: true
    });
}

function confirmRegistration(e, form){
    e.preventDefault();
    var notes = form['notes'].value || '';
    registration.update({notes: notes}, function(err){
        if(err) { console.log(err) };
        confirmationID = user.camp + '/' + user.pack + '/' + user.id;
        user.confirmationID = confirmationID;
        $('#reg-form').hide('fast');
        $('#thank-you').show('fast', function () {
            $('#confirmation-id').text(confirmationID);
        });
        $.post('https://scouts-daycamp.herokuapp.com/bsa-daycamp-registration', {formData: formData, user: user})
            .success(function(){
                registration.update({notifySent: true})
            });
    });
    //show thank you page and confirmation
}