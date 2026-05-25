// @file: src/controllers/tarefa.controller.js

class TarefaController {
  constructor(service) {      // ← recebe o service de fora
    this.service = service
  }

  async listar(request, reply) {
    console.log("Controller: listar chamado")
    const { busca, concluido } = request.query
    const resultado = await this.service.listar({ busca, concluido })
    return reply.send(resultado)
  }

  async criar(request, reply) {
    console.log("Controller: criar chamado")
    const { descricao } = request.body
    if (!descricao || descricao.trim() === '') {
      return reply.status(400).send({
        status: 'error',
        message: 'A descrição da tarefa é obrigatória'
      })
    }
    const novaTarefa = await this.service.criar(descricao)
    return reply.status(201).send(novaTarefa)
  }

  async buscar(request, reply) {
    console.log("Controller: buscar chamado")
    const id = Number(request.params.id)
    const tarefa = await this.service.buscarPorId(id)
    if (!tarefa) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }
    return reply.send(tarefa)
  }

  async atualizar(request, reply) {
    console.log("Controller: atualizar chamado")
    const id = Number(request.params.id)
    const tarefa = await this.service.atualizar(id, request.body)
    if (!tarefa) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }
    return reply.send(tarefa)
  }

  async concluir(request, reply) {
    console.log("Controller: concluir chamado")
    const id = Number(request.params.id)
    const tarefa = await this.service.alternarConcluido(id)
    if (!tarefa) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }
    return reply.send(tarefa)
  }

  async remover(request, reply) {
    console.log("Controller: remover chamado")
    const id = Number(request.params.id)
    const removido = await this.service.remover(id)
    if (!removido) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }
    return reply.status(204).send()
  }

}

export default TarefaController