class Cliente {
  constructor(nome, email){
    this.nome = nome
    this.email = email
  }

  exibir(){
    return `${this.nome} <${this.email}>`
  }
}

class Pedido {
  constructor(id, cliente){
    this.id = id
    this.cliente = cliente
    this.itens = []
    this.status = "aberto"
  }

  adicionarItem(descricao, valor){
    this.itens.push({
      descricao,
      valor
    })
  }

  total(){
    return this.itens.reduce((a, b) => a + b.valor, 0)
  }

  fechar(){
    this.status = "fechado"
  }

  exibir(){
    console.log(`
Pedido #${this.id} | Status: ${this.status}
Cliente: ${this.cliente.exibir()}
Itens:`)
    this.itens.map(e => console.log(` - ${e.descricao}: R$ ${e.valor.toFixed(2)}`))
    console.log(`Total: R$ ${this.total().toFixed(2)}`)

  }
}

const cliente1 = new Cliente("João Silva", "joao@email.com")

const pedido1 = new Pedido(1001, cliente1)

pedido1.adicionarItem("Notebook Dell", 2500)
pedido1.adicionarItem("Mouse Logitech", 85.50)

pedido1.fechar()

pedido1.exibir()
