var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('/index', { title: 'NewQuiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);

//Definicion de rutas de /quizes
router.get('/inicio', 					quizController.inicio)
router.get('/quizes',				 	quizController.index);
router.get('/quizes/index', 			quizController.index);
router.get('/quizes/:quizId(\\d+)', 	quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',				 quizController.new);
router.post('/quizes/create',			 quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', 	 quizController.update);
router.delete('/quizes/:quizId(\\d+)', 	 quizController.destroy);

router.get('/author', 					 quizController.author);

module.exports = router;
