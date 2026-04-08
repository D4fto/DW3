import Fastify from "fastify";

const server = Fastify()

server.get('/', async (req, res)=>{
  console.log("Requisiçã recebida")
  res.send("oi")
})

server.get('/json', async (req, res)=>{
  console.log("Requisiçã recebida")
  res.send({"ola": "mundo"})
})

server.get('/html', async (req, res)=>{
  console.log("Requisiçã recebida")
  res.type("text/html").send("<h1>Olá Mundo</h1>")
})

try{

  await server.listen({port: 3000})
  console.log("servidor rodando na porta 3000")

} catch (error){

}