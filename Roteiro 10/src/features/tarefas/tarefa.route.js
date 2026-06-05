// @file: src/features/tarefas/tarefa.routes.js

// 1. Os imports agora são locais (na mesma pasta), repare no './'
import TarefaRepository from './tarefa.repository.js'
import {TarefaService} from './tarefa.service.js'
import {TarefaController} from './tarefa.controller.js'

export default async function tarefaRoutes(server) {

  // ==========================================
  // INJEÇÃO DE DEPENDÊNCIA (A MONTAGEM)
  // ==========================================

  const repository = new TarefaRepository()
  const service = new TarefaService(repository)
  const controller = new TarefaController(service)

  // ==========================================
  // REGISTRO DAS ROTAS
  // ==========================================

  server.get('/tarefas', async (request, reply) => await controller.listar(request, reply))
  server.post('/tarefas', async (request, reply) => await controller.criar(request, reply))
  server.get('/tarefas/:id', async (request, reply) => await controller.buscar(request, reply))
  server.patch('/tarefas/:id', async (request, reply) => await controller.atualizar(request, reply))
  server.patch('/tarefas/:id/concluir', async (request, reply) => await controller.concluir(request, reply))
  server.delete('/tarefas/:id', async (request, reply) => await controller.remover(request, reply))
}