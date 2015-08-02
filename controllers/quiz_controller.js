var models = require('../models/models.js');


//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{next(new Error('No existe quizId=' + quizId));}
		}
		).catch(function(error){next(error);});
};

exports.inicio = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('inicio', { title: 'Hola NewQuiz in the game.'});
	})
};

exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes});
	}
	).catch(function(error) {next(error);})
};

// GET /quizes/new
exports.show = function(req, res) {
  //res.render('quizes/question', { pregunta: 'Capital de España'});
 //models.Quiz.find(req.params.quizId).then(function(quiz){
 	res.render('quizes/show',{quiz: req.quiz});
 //})
};

  exports.answer = function(req, res) {
  //	models.Quiz.find(req.params.quizId).then(function(quiz){
  	var resultado = 'incorrecto';
		if(req.query.respuesta === req.quiz.respuesta){
			//res.render('quizes/answer', {quiz: quiz, respuesta: 'correcto'});
			resultado = 'correcto';
		}
		//else {
		//  	res.render('quizes/answer', {quiz: quiz, respuesta: 'incorrecto'});
		//}
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
  	//})
};
// GET /quizes/autores
exports.author = function(req, res) {
  res.render('author', { autor: 'Juanma de Castro'});
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{ pregunta: "Pregunta", respuesta: "Respuesta"});
	res.render('quizes/new', {quiz: quiz});
};

//POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes');
	})
};