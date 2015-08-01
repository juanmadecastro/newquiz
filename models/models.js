var path = require('path');

//Postgres DATABASE_URL=
//SQLITE   DATABASE_URL=sqlite://:@:
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar el modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite
//var sequelize = new Sequelize(null,null,null,
//	{dialect: "sqlite", storage: "quiz.sqlite"});

var sequelize = new Sequelize(DB_name, user, pwd,
	{dialect: protocol, 
	 protocol: protocol,
	 port: port,
	 host: host,
	 storage: storage,
	 omitNull: true
		});

//Importa la definicion de la tabla Quiz de quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

//Exportar definicion de la tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa la tabla de Quiz en BBDD
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count===0){
			Quiz.create({pregunta: 'Capital de Italia',
						 respuesta: 'Roma'});
			Quiz.create({pregunta: 'Capital de España',
						 respuesta: 'Madrid'});
			Quiz.create({pregunta: 'Capital de Francia',
						 respuesta: 'Paris'});
			Quiz.create({pregunta: 'Capital de Grecia',
						 respuesta: 'Atenas'})			
			.then(function(){console.log('Base de datos inicializada')});
		};
	});
});