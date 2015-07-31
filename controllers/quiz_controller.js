var models = require('../models/models.js');
// GET /quizes/new
exports.question = function(req, res) {
  //res.render('quizes/question', { pregunta: 'Capital de España'});
 models.Quiz.findAll().success(function(quiz){
 	res.render('quizes/question',{pregunta: quiz[0].pregunta})
 })
};

  exports.answer = function(req, res) {
  	models.Quiz.findAll().success(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
		res.render('quizes/answer', {respuesta: 'correcto'});
		}
		else {
		  res.render('quizes/answer', {respuesta: 'incorrecto'});
		}  		
  	})
};
// GET /quizes/autores
exports.author = function(req, res) {
  res.render('author', { autor: 'Juanma de Castro'});
 
};