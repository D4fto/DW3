import Fastify from "fastify";
import firstroute from "./our-first-route.js"

const server = Fastify({
  logger: true
})

server.register(firstroute)

server.listen({ port: 3000 }, (err, address) => {
  if(err){
    server.log.error(err)
    process.exit(1)
  }
})