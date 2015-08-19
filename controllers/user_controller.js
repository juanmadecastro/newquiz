var users = {admin: {id:1, username:"admin", password:"1234"},
			  juanma: {id:2, username:"juanma", password:"5678"}};

//Comprueba si el usuario esta registrado en la variable users
exports.autenticar = function(login, password, callback){
	if(users[login]){
		if(password === users[login].password){
			callback(null, users[login]);
		}else{
			callback(new Error('Password erróneo.'));
		}
	}else{
		callback(new Error('No existe el usuario.'));
	}
};