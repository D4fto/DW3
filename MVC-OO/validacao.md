## Validação

Indique em qual(is) camada(s) (Routes, Controller ou Model) as seguintes validações deveriam ficar e justifique sua escolha:



### 1. Verificar se a descrição da tarefa não está vazia ao criar uma nova tarefa.

**Camada**: Controller ou Model  

**Justificativa**:  
Essa verificação pode ser feita tanto na camada de controller quanto na camada de model. No controller, serve como uma validação inicial dos dados recebidos da requisição. Já no model, garante a integridade dos dados independentemente da origem, evitando que registros inválidos sejam persistidos no banco.


### 2. Verificar se o ID da tarefa existe antes de tentar atualizar ou remover uma tarefa.

**Camada**: Model  

**Justificativa**:  
Essa validação deve ficar no model, pois está diretamente relacionada ao acesso e manipulação dos dados. 

### 3. Verificar se os parâmetros de consulta (query) são válidos ao listar as tarefas (por exemplo, se o valor de concluido é true ou false).

**Camada**: Controller ou Model  

**Justificativa**:  
No controller, essa validação atua como filtro de entrada, garantindo que apenas parâmetros válidos sejam processados. No model, pode ser feita para evitar repetição e garantir integridade, caso esse model seja utilizado em mais locais.


### 4. Converter o parâmetro id vindo da URL (que chega como string) para um número (Number) antes de buscar os dados.

**Camada**: Controller  

**Justificativa**:  
O controller é responsável por tratar e adaptar os dados da requisição HTTP. Como os parâmetros da URL sempre chegam como string, a conversão para número deve ser feita nessa camada antes de enviar os dados para o model.


### 5. Impedir a remoção de uma tarefa que já esteja marcada como "concluída" (regra para preservar o histórico de produtividade).

**Camada**: Model  

**Justificativa**:  
Essa é uma regra de negócio, portanto deve ficar no model. Assim, a regra é aplicada independentemente de qual controller ou rota esteja tentando remover a tarefa, garantindo consistência e evitando que a regra seja ignorada.


### 6. Verificar se o usuário já atingiu o limite máximo de 10 tarefas pendentes antes de permitir a criação de uma nova.

**Camada**: Model  

**Justificativa**:  
Essa também é uma regra de negócio, pois envolve lógica específica da aplicação. O model deve ser responsável por consultar a quantidade de tarefas pendentes e validar o limite, garantindo que a regra seja sempre respeitada em qualquer ponto do sistema.