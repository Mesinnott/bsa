//DayCamp constructor builds camp objects and pushes them to the dayCamps array
var db = firebaseService();
var user;

function loginDropDown(camps) {
    var select = document.getElementById("selectCamp");
    for (var key in camps) {
        var camp = camps[key];
        var el = document.createElement('option');
        el.textContent = camp.id + ':  ' + camp.dates + ', ' + camp.location;
        el.value = key;
        select.appendChild(el);
    }
}

function login(e, form) {
    e.preventDefault();
    user = {
        email: form['email'].value,
        pack: form['pack'].value,
        camp: form['camp'].value
    }
    db.login(user, function (formData) {
        showRegForm();
    })
}

function showRegForm() {
    $('#login-form').hide();
    $('#reg-form').show('fast', function () {
        db.getCampForm(function (formRef, data) {
            formData = data || {};
            registration = formRef;
            if (!data.contacts) {
                displayModal('contacts-modal');
            }
        }, update);
    });
}

db.camps(loginDropDown);