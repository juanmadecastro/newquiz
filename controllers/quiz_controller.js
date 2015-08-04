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
		res.render('inicio', { title: 'Hola NewQuiz in the game.', errors: []});
	})
};

exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes, errors: []});
	}
	).catch(function(error) {next(error);})
};

// GET /quizes/new
exports.show = function(req, res) {
  //res.render('quizes/question', { pregunta: 'Capital de España'});
 //models.Quiz.find(req.params.quizId).then(function(quiz){
 	res.render('quizes/show',{quiz: req.quiz, errors: []});
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
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
  	//})
};
// GET /quizes/autores
exports.author = function(req, res) {
  res.render('author', { autor: 'Juanma de Castro', errors: []});
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{ pregunta: "Pregunta", respuesta: "Respuesta", indice: "Indice"});
	res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(
		function(err){
			if(err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors});	
			}else{
				quiz.save({fields: ["pregunta", "respuesta", "indice"]})
				.then(function(){ res.redirect('/quizes')})
			}
		}
	);
};

// GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.indice = req.body.quiz.tema;
	req.quiz.
	validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
			}else{
				req.quiz.
				save( {fields: ["pregunta", "respuesta", "indice"]})
				.then( function(){res.redirect('/quizes');});
			}
		}
		);
};
// DELETE /quizes/:id
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};