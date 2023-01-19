// Começar a utilizar o express
const { response } = require("express");
const express = require("express");

const server = express();

server.use(express.json());

const cursos = ['JavaScript', 'NodeJS', 'Python', 'Delphi']

/**
 * Listagem de todos os cursos
 */
server.get("/cursos", (request, response) => {
  const valorJson = request.params.cursos;

  response.json(cursos);
});

/**
 * Listagem de um curso em específico
 */
server.get("/cursos/:id", (request, response) => {
  const { id } = request.params;

  return response.json(cursos[id]);
});

/**
 * Adicionar um curso
 */
server.post("/cursos", (request, response) => {
  const { name } = request.body;

  if (name in cursos) {
    return response.send(`O curso ${name} já consta na lista de cursos!`);
  }

  cursos.push(name);

  return response.send(`O curso ${name} foi adicionado com sucesso na lista de cursos!`);

})

/**
 * Alterar um curso
 */

server.put("/cursos/:id", (request, response) => {

  const { id } = request.params;
  const { name } = request.body;

  if (!name in cursos) {
    return response.send(`Curso não encontrado na lista de cursos!`);
  }

  // Atualizar
  cursos[id] = name;

  return response.send(`Curso alterado com sucesso!`);

});

/**
 * Excluir um curso
 */
server.delete("/cursos/:id", (request, response) => {
  
  const { id } = request.params;

  cursos.splice(id, 1);

  return response.send(`Curso deletado com sucesso!`);

});

// Pra rodar eu preciso definir uma porta
server.listen(3000);