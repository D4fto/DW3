# Exercício 1 — Explicar a entrada do ORM

O ORM entra depois do SQL puro porque primeiro é importante entender como o banco de dados funciona diretamente, conhecendo SQL, tabelas, relacionamentos, `JOINs`, chaves estrangeiras e consultas.

Depois de aprender SQL puro, o ORM facilita o desenvolvimento porque permite trabalhar com as tabelas e operações do banco através do código da aplicação, reduzindo a quantidade de SQL escrito manualmente.

Assim, o ORM não substitui o conhecimento de SQL. Ele é uma camada de abstração que facilita o trabalho com o banco, mas entender SQL continua sendo importante para compreender o que está acontecendo por baixo.

---


# Exercício 4 — Comparar uma operação

Escolhi a operação de **listar tarefas**.

## SQL puro

Uma consulta em SQL puro poderia ser:

```sql
SELECT *
FROM tarefas
ORDER BY id;
```

No backend, utilizando o PostgreSQL, seria necessário executar essa string SQL através do cliente ou `pool` do banco.

## Drizzle

Com Drizzle, a mesma operação pode ser escrita como:

```javascript
import { asc } from "drizzle-orm";
import { db } from "../database/db.js";
import { tarefas } from "../database/schema.js";

const resultado = await db
  .select()
  .from(tarefas)
  .orderBy(asc(tarefas.id));
```

## Comparação

| Critério | SQL puro | Drizzle |
|---|---|---|
| Legibilidade | Mais próximo da linguagem do banco | Mais integrado ao JavaScript |
| Controle | Maior controle direto sobre o SQL | Abstrai parte da construção da consulta |
| Volume de código | Pode ser menor para consultas simples | Pode exigir mais código inicialmente |
| Proximidade com o banco | Muito alta | Menor, pois existe uma camada de abstração |
| Facilidade no código | É necessário escrever SQL manualmente | Permite construir consultas utilizando JavaScript |
| Segurança de tipos | Depende da implementação | Pode aproveitar o schema e o sistema de tipos |

O SQL puro oferece maior controle e proximidade com o banco de dados. Já o Drizzle fornece uma abstração que facilita a integração entre o código JavaScript e o banco.

Para consultas simples, as duas abordagens podem ter uma quantidade semelhante de código. Conforme o projeto cresce, o ORM pode ajudar na organização e manutenção das operações relacionadas ao banco.