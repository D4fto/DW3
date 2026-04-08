import Fastify from "fastify";

const server = Fastify()

const tarefas = [
  {id: 1, descricao: "Fazer compras"},
  {id: 2, descricao: "Fazer Nada"},
  {id: 3, descricao: "Fazer Tudo"},

]

server.get('/tarefas', async (req, res)=>{
  res.send(tarefas)
})

server.post('/tarefas', async (req, res)=>{
  const tarefa = req.body
  tarefas.push(tarefa)
  res.send({status: "sucesso", message: "Tarefa adicionada com sucesso"})
})

try{

  await server.listen({port: 3000})
  console.log("servidor rodando na porta 3000")

} catch (error){

}