
async function routes(server, options) {
  server.get('/', async (req, res)=>{
    res.send({hello: "world"}).status(400)
  })
  server.get('/ola/:nome', async (req, res)=>{
    res.send("Olá " + req.params.nome).status(400)
    
  })
}

export default routes
