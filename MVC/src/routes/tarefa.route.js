import {
  listarTarefas,
  criarTarefa,
  obterResumo,
  obterTarefa,
  atualizarTarefa,
  concluirTarefa,
  removerTarefa,
  obterPendentes,
} from "../controllers/tarefa.controller.js";

export async function tarefaRoutes(server, options) {
  // ROTAS e PROCESSAMENTO das requisições relacionadas às tarefas.

  server.get("/tarefas", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: GET /tarefas chamada");
    // Chama a função do controlador para processar a requisição
    listarTarefas(request, reply);
  });

  server.post("/tarefas", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: POST /tarefas chamada");
    // Chama a função do controlador para processar a requisição
    criarTarefa(request, reply);
  });

  server.get("/tarefas/resumo", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: GET /tarefas/resumo chamada");
    // Chama a função do controlador para processar a requisição
    obterResumo(request, reply);
  });

  server.get("/tarefas/pendentes", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: GET /tarefas/pendentes chamada");
    // Chama a função do controlador para processar a requisição
    obterPendentes(request, reply);
  });
  
  server.get("/tarefas/:id", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: GET /tarefas/:id chamada");
    // Chama a função do controlador para processar a requisição
    obterTarefa(request, reply);
  });

  server.patch("/tarefas/:id", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: PATCH /tarefas/:id chamada");
    // Chama a função do controlador para processar a requisição
    atualizarTarefa(request, reply);
  });

  server.patch("/tarefas/:id/concluir", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: PATCH /tarefas/:id/concluir chamada");
    // Chama a função do controlador para processar a requisição
    concluirTarefa(request, reply);
  });

  server.delete("/tarefas/:id", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: DELETE /tarefas/:id chamada");
    // Chama a função do controlador para processar a requisição
    removerTarefa(request, reply);
  });
}
