import Fastify from "fastify"
import cors from "@fastify/cors"

const server = Fastify()

server.register(cors, {
  origin: "*",
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

const PORT = 3000

const tarefas = [
  {id: 1, descricao: "Fazer compras", concluido: false}, 
  {id: 2, descricao: "Lavar o carro", concluido: false},
  {id: 3, descricao: "Estudar Fastify", concluido: true}
]

server.get('/tarefas', async (req, res) => {
  const concluido = req.query.concluido
  const concluidoBool = concluido === 'true'
  let descricao = req.query.busca

  let resultado = tarefas

  if (concluido !== undefined) {
    resultado = resultado.filter(t => t.concluido === concluidoBool)
  }
  if (descricao !== undefined) {
    descricao = String(descricao).trim().toLowerCase()
    resultado = resultado.filter(t => t.descricao.toLowerCase().includes(descricao))
  }

  return res.send(resultado)
})

server.get('/tarefas/resumo', (req, res) => {
  const resultado = {
    total: 0,
    concluidas: 0,
    pendentes: 0
  }

  resultado.total = tarefas.length

  resultado.concluidas = tarefas.filter(t => t.concluido).length

  resultado.pendentes = resultado.total - resultado.concluidas

  return res.send(resultado)
})

server.post('/tarefas', (req, res) => {
  const tarefa = req.body

  const descricao = tarefa.descricao

  if(!descricao || String(descricao).trim() === ''){
    return res.status(400).send({ status: 'error', message: 'O campo de descrição é obrigatório'})
  }

  tarefa.descricao = String(descricao).trim()

  const novoId = tarefas.length > 0 ? tarefas[tarefas.length-1].id + 1 : 1 
  const novaTarefa = { id: novoId, ...tarefa}

  tarefas.push(novaTarefa)

  return res.status(201).send(novaTarefa)
})

server.get('/tarefas/:id', async (req, res) => {
  const id = Number(req.params.id)

  const tarefa = tarefas.find(t => t.id === id)

  if(!tarefa) {
    return res.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  return res.send(tarefa)
})

server.patch('/tarefas/:id', async (req, res) => {
  const id = Number(req.params.id)

  const index = tarefas.findIndex(t => t.id === id)

  if (index === -1) {
    return res.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  const tarefaAtualizada = req.body

  tarefas[index] = {...tarefas[index], ...tarefaAtualizada, id }

  return res.send(tarefas[index])
})

server.patch('/tarefas/:id/concluir', async (req,res) => {
  const id = Number(req.params.id)

  const index = tarefas.findIndex(t => t.id === id)

  if (index === -1) {
    return res.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  tarefas[index].concluido = !tarefas[index].concluido

  return res.send(tarefas[index])
})

server.delete('/tarefas/:id', async (req, res) => {
  const id = Number(req.params.id)

  const index = tarefas.findIndex(t => t.id === id)

  if (index === -1) {
    return res.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  tarefas.splice(index, 1)

  return res.status(204).send()
})

server.setNotFoundHandler((req, res) => {
  
  return res.status(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',
  })
})

const start = async () => {
  try {
    await server.listen({port: PORT})
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  } catch (error){
    console.error(error)
    process.exit(1)
  }
}

start()