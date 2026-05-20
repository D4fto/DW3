## Questões de reflexão

Responda com base no que foi visto neste roteiro:

1. O que é um **Fat Model** e por que ele é considerado um problema em aplicações que tendem a crescer?

Um Fat Model acontece quando quase toda a lógica da aplicação fica concentrada no model. Isso vira um problema porque o código fica muito grande, difícil de manter e de entender. Conforme o sistema cresce, o model acaba acumulando muitas responsabilidades, dificultando testes, reutilização e organização do projeto.

2. Por que o `TarefaService` recebe o `TarefaRepository` via constructor em vez de criá-lo internamente com `new TarefaRepository()`? Que vantagem isso traz?

O service recebe o repository pelo constructor para diminuir o acoplamento entre as classes. Assim, o service não depende diretamente de uma implementação específica e fica mais fácil trocar o repository no futuro ou criar testes usando versões simuladas. Isso deixa a arquitetura mais flexível e organizada.

3. O `server.js` foi chamado de **Composition Root**. Em suas próprias palavras, qual é o papel desse arquivo na nova arquitetura?

O server.js é o arquivo responsável por montar e conectar toda a aplicação. É nele que as dependências são criadas e passadas entre repository, service e controller. Ele centraliza a configuração principal do sistema e inicia o servidor.

4. Se você precisasse trocar o armazenamento em memória por um banco de dados PostgreSQL, **quais arquivos você precisaria criar ou modificar** com a arquitetura atual? Justifique.

Seria necessário criar ou modificar principalmente o repository, porque é ele que cuida do acesso aos dados. Em vez de usar arrays em memória, os métodos passariam a fazer consultas no PostgreSQL. Também seria necessário criar a configuração da conexão com o banco. O restante da aplicação, como service, controller e rotas, provavelmente continuaria igual, porque eles já dependem apenas da interface do repository.

5. Observe o método `alternarConcluido` no `TarefaService`:
Por que essa lógica está no **Service** e não no **Repository**?

Essa lógica fica no service porque ela representa uma regra de negócio da aplicação. O repository deve cuidar apenas do acesso e persistência dos dados. Já o service é responsável pelas decisões e comportamentos do sistema, como buscar a tarefa, verificar se ela existe e inverter o valor de concluído antes de atualizar.