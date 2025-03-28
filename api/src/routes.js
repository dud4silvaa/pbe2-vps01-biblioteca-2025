const express = require('express');
const routes = express.Router();

const Aluno = require('./controller/controlleraluno');
const Emprestimo = require('./controller/controlleremprestimo');
const Livro = require('./controller/controllerlivro');


routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca ACME' });
});

routes.post('/alunos', Aluno.create);
routes.get('/alunos', Aluno.read);
routes.get('/alunos/:ra', Aluno.readOne);
routes.put('/alunos/:ra', Aluno.update);
routes.delete('/alunos/:ra', Aluno.remove);

routes.post('/emprestimo', Emprestimo.create);
routes.get('/emprestimo', Emprestimo.read);
routes.put('/emprestimo/:id', Emprestimo.update);
routes.delete('/emprestimo/:id', Emprestimo.remove);

routes.post('/livro', Livro.create);
routes.get('/livro', Livro.read);
routes.put('/livro/:id', Livro.update);
routes.delete('/livro/:id', Livro.remove);

module.exports = routes;






