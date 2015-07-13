// GET /quizes/new
exports.question = function(req, res) {
  res.render('quizes/question', { pregunta: 'Capital de España'});
 
};

  exports.answer = function(req, res) {
if(req.query.respuesta === 'Madrid'){
res.render('quizes/answer', {respuesta: 'correcto'});
}
else {
  res.render('quizes/answer', {respuesta: 'incorrecto'});
}
};
// GET /quizes/autores
exports.author = function(req, res) {
  res.render('quizes/author', { autor: 'Juanma de Castro'});
 
};