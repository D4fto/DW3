# Exercício 1 - Consultar projetos com detalhamento

Como queremos apenas os projetos que possuem um registro correspondente em `detalhes_projeto`, devemos usar `INNER JOIN`.

```sql
SELECT
    p.nome,
    d.descricao_longa,
    d.prazo_final
FROM projetos p
INNER JOIN detalhes_projeto d
    ON d.projeto_id = p.id;
```

### Explicação

O `INNER JOIN` retorna somente os projetos que possuem um detalhamento associado. Projetos sem registro em `detalhes_projeto` não aparecem no resultado.

---

# Exercício 2 - Garantir o 1:1

### Primeiro registro

```sql
INSERT INTO detalhes_projeto (
    projeto_id,
    descricao_longa,
    observacoes,
    prazo_final
)
VALUES (
    2,
    'Detalhamento do Projeto Banco Relacional',
    'Primeiro cadastro',
    '2026-08-10'
);
```

### Segunda tentativa para o mesmo projeto

```sql
INSERT INTO detalhes_projeto (
    projeto_id,
    descricao_longa,
    observacoes,
    prazo_final
)
VALUES (
    2,
    'Outro detalhamento',
    'Segunda tentativa',
    '2026-09-01'
);
```

### Explicação

A segunda inserção é rejeitada porque a coluna `projeto_id` possui a restrição `UNIQUE`.

Isso significa que cada valor de `projeto_id` pode aparecer apenas uma vez na tabela `detalhes_projeto`.

Dessa forma, um projeto pode ter no máximo um detalhamento, caracterizando um relacionamento `1:1`.

O PostgreSQL gera um erro semelhante a:

```text
ERROR: duplicate key value violates unique constraint
```

---

# Exercício 3 - Consultar tarefas com tags

## Parte A - Listar descrição da tarefa e nome da tag

```sql
SELECT
    t.descricao,
    tg.nome AS tag
FROM tarefas t
INNER JOIN tarefas_tags tt
    ON tt.tarefa_id = t.id
INNER JOIN tags tg
    ON tg.id = tt.tag_id
ORDER BY t.descricao, tg.nome;
```

### Exemplo de resultado

| descricao | tag |
|------------|-----|
| Integrar PostgreSQL | api |
| Integrar PostgreSQL | backend |
| Integrar PostgreSQL | postgres |
| Refatorar Repository | arquitetura |
| Refatorar Repository | backend |

---

## Parte B - Apenas tarefas com mais de uma tag

```sql
SELECT
    t.id,
    t.descricao,
    COUNT(*) AS quantidade_tags
FROM tarefas t
INNER JOIN tarefas_tags tt
    ON tt.tarefa_id = t.id
GROUP BY t.id, t.descricao
HAVING COUNT(*) > 1
ORDER BY quantidade_tags DESC;
```

### Explicação

- `GROUP BY` agrupa os registros por tarefa;
- `COUNT(*)` conta quantas tags cada tarefa possui;
- `HAVING COUNT(*) > 1` mantém apenas tarefas com mais de uma tag.

---

# Exercício 4 - Escolhendo a modelagem certa

## Cenário 1

**Cada usuário tem um único perfil público (bio, foto, links).**

### Tipo de relação

**1:1**

### Justificativa

- Um usuário possui apenas um perfil público.
- Um perfil público pertence a apenas um usuário.

### Estrutura

```text
usuarios
--------
id
nome
email

perfis
--------
id
usuario_id (UNIQUE)
bio
foto
links
```

---

## Cenário 2

**Um cliente pode fazer vários pedidos, mas cada pedido pertence a um único cliente.**

### Tipo de relação

**1:N**

### Justificativa

- Um cliente pode possuir vários pedidos.
- Cada pedido pertence a apenas um cliente.

### Estrutura

```text
clientes
---------
id
nome

pedidos
---------
id
cliente_id
data
valor_total
```

A chave estrangeira fica em `pedidos`.

---

## Cenário 3

**Um artigo de blog pode ter várias categorias, e uma categoria pode agrupar vários artigos.**

### Tipo de relação

**N:N**

### Justificativa

- Um artigo pode pertencer a várias categorias.
- Uma categoria pode conter vários artigos.

### Estrutura das tabelas

```text
artigos
---------
id
titulo
conteudo

categorias
------------
id
nome

artigos_categorias
-------------------
artigo_id
categoria_id
```

### SQL de exemplo

```sql
CREATE TABLE artigos (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE
);

CREATE TABLE artigos_categorias (
    artigo_id INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    PRIMARY KEY (artigo_id, categoria_id),
    FOREIGN KEY (artigo_id) REFERENCES artigos(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
```

A tabela `artigos_categorias` é a tabela associativa responsável por armazenar os vínculos entre artigos e categorias.

# Exercício 5 - (Desafio) Expondo tags na API

### Quantos JOINs a query precisa?

A consulta precisa de **2 JOINs**:

1. `tarefas` → `tarefas_tags`
2. `tarefas_tags` → `tags`

Exemplo:

```sql
SELECT
    t.id,
    t.descricao,
    t.concluido,
    t.projeto_id,
    tg.id AS tag_id,
    tg.nome AS tag_nome
FROM tarefas t
LEFT JOIN tarefas_tags tt
    ON tt.tarefa_id = t.id
LEFT JOIN tags tg
    ON tg.id = tt.tag_id
WHERE t.id = $1;
```

### O resultado deve vir achatado ou agrupado?

A consulta retorna os dados de forma **achatada**, ou seja, uma linha para cada tag associada à tarefa.

Exemplo:

| id | descricao | tag_id | tag_nome |
|----|-----------|---------|----------|
| 2 | Integrar PostgreSQL | 1 | backend |
| 2 | Integrar PostgreSQL | 2 | postgres |
| 2 | Integrar PostgreSQL | 3 | api |

Para o frontend, é mais útil receber os dados **agrupados**, pois a tarefa aparece apenas uma vez e suas tags ficam dentro de uma lista.

Exemplo:

```json
{
  "id": 2,
  "descricao": "Integrar PostgreSQL",
  "concluido": false,
  "projeto_id": 1,
  "tags": [
    {
      "id": 1,
      "nome": "backend"
    },
    {
      "id": 2,
      "nome": "postgres"
    },
    {
      "id": 3,
      "nome": "api"
    }
  ]
}
```

### Onde deve ocorrer a transformação?

A transformação deve ocorrer no **Repository**, pois ele é responsável por acessar o banco de dados e preparar os dados retornados pelas consultas.

Dessa forma:

- o **Repository** executa a query e organiza as tags;
- o **Service** aplica regras de negócio;
- o **Controller** apenas recebe a requisição e envia a resposta.

Essa separação mantém cada camada com sua responsabilidade bem definida e facilita a manutenção do código.