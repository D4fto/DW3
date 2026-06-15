// @file: src/features/tarefas/tarefa.service.js
import { AppError } from '../../errors/appError.js'

export class TarefaService {
  constructor(repository) {
    this.repository = repository
  }

  async listarTarefas(opcoes) {
    console.log("Service: listar chamado")
    const { busca, concluido } = opcoes

    let resultado = await this.repository.buscarTodos()

    if (busca) {
      resultado = resultado.filter(t =>
        t.descricao.toLowerCase().includes(busca.toLowerCase())
      )
    }

    if (concluido !== undefined) {
      const concluidoBool = concluido === 'true'
      resultado = resultado.filter(t => t.concluido === concluidoBool)
    }

    return resultado
  }

  async buscarPorId(id) {
    const tarefa = await this.repository.buscarPorId(id)
    console.log(id)
    console.log(tarefa)
    if (!tarefa) {
      // 404: Not Found (Não Encontrado)
      throw new AppError('Tarefa não encontrada', 404)
    }
    return tarefa
  }

  async criarTarefa(dados) {
    if (!dados.descricao || dados.descricao.trim() === '') {
      throw new AppError('O descrição é obrigatório', 400)
    }

    return this.repository.salvar({ ...dados, status: 'pendente' })
  }

  async atualizarTarefa(id, dados) {
    const tarefa = await this.buscarPorId(id) // Se não achar, o método acima já lança o AppError 404

    if (tarefa.status === 'concluida') {
      throw new AppError('Não é possível atualizar uma tarefa já concluída', 400)
    }

    return this.repository.atualizar(id, dados)
  }

  async concluirTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    const novoStatus = tarefa.status === 'concluida' ? 'pendente' : 'concluida'
    return this.repository.atualizar(id, { status: novoStatus })
  }

  async removerTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    if (tarefa.status === 'concluida') {
      throw new AppError('Não é possível remover uma tarefa já concluída', 400)
    }

    return this.repository.remover(id)
  }
}