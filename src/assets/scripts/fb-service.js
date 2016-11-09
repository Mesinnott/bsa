/* global Firebase */
function firebaseService() {

	var _user = {};
	var _campList = {};
	// var firebaseUrl = 'https://ore-ida.firebaseio.com/';
	var firebaseUrl = 'https://oreidabsa-b4054.firebaseio.com/'
	var firebaseLogin = new Firebase(firebaseUrl);

	return {
    getCampForm: getCampForm,
		getCamp: getCamp,
		camps: getCamps,
		login: login,
		user: _user 
	}

	function login(user, cb) {
		firebaseLogin.authAnonymously(function (err, authData) {
			if (authData) {
				user.timestamp = Date.now();
				user.id = user.email.slice(0, user.email.indexOf('@'));
				user.id = user.id.replace(/\./g,'-');
				setUserData(user);
				//set user info
				//set user for pack
				firebaseLogin.child('packs').child(user.pack).child('users').child(user.id).update(user)
				firebaseLogin.child('users').child(user.id).child('packs').child(user.pack).update(user);
				//create camp form
				var t = new Date();
				var year = t.getFullYear();
				firebaseLogin.child('camp-forms').child(year).child(user.camp).child(user.pack).child(user.id).update({registrar: user.email});
				cb(user);
			} else {
				console.log('something went wrong');
				cb(authData);
			}
		});
	}

	function setUserData(user){
		_user.campForm = firebaseLogin.child('camp-forms').child('2016').child(user.camp).child(user.pack).child(user.id);
	}
    
    function getCampForm(cb, update){
        _user.campForm.on('value', function(data){
            cb(_user.campForm, data.val());
            update();
        });
    }

	function getCamps(cb){
		firebaseLogin.child('camps').child('2016').on('value', function(data){
			_campList = data.val();
			return cb(_campList);
		})
	}
	
	function getCamp(key){
		return _campList[key];
	}
}