var models = require('../models/models.js');


exports.inicio = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('inicio', { title: 'Hola NewQuiz in the game.'});
	})
};

exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes});
	})
};

// GET /quizes/new
exports.show = function(req, res) {
  //res.render('quizes/question', { pregunta: 'Capital de España'});
 models.Quiz.find(req.params.quizId).then(function(quiz){
 	res.render('quizes/show',{quiz: quiz});
 })
};

  exports.answer = function(req, res) {
  	models.Quiz.find(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', {quiz: quiz, respuesta: 'correcto'});
		}
		else {
		  	res.render('quizes/answer', {quiz: quiz, respuesta: 'incorrecto'});
		}  		
  	})
};
// GET /quizes/autores
exports.author = function(req, res) {
  res.render('author', { autor: 'Juanma de Castro'});
};