// @file: server.js

import Fastify from 'fastify'
import cors from '@fastify/cors'

import tarefaRoutes from './features/tarefas/tarefa.route.js'


const server = Fastify()

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})



server.register(tarefaRoutes)

const PORT = 3000
server.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})