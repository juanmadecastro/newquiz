var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req,res){
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req,res){
	var comentario = models.Comment.build(
		{ texto: req.body.comment.texto,
		  QuizId: req.params.quizId
		});
	comentario.validate().then(
		function(err){
			if(err){
				res.render('comments/new.ejs', {comentario: comentario, quizid: req.params.quizId, errors: err.errors});
			}else{
				comentario.save().then(function(){
					res.redirect('/quizes/'+req.params.quizId);
				})
			}
		}).catch(function(error){next(error)});
};