class Carrinho {
  constructor(){
    this.itens = []
  }

  adicionar(nome, preco, quantidade){
    this.itens.push({nome, preco, quantidade})
  }

  remover(nome){
    const index = this.itens.findIndex(e => e.nome = nome)

    if(index === -1){
      console.log("Item não econtrado.")
      return
    }

    this.itens.splice(index, 1)
  }

  total(){
    return this.itens.reduce((a,b) => a + b.preco*b.quantidade, 0)
  }

  exibir(){
    this.itens.map(e => console.log(`${e.quantidade}x ${e.nome} — R$ ${e.preco.toFixed(2)}`))
    console.log(`Total: R$ ${this.total().toFixed(2)}`)
  }
}

const carrinho1 = new Carrinho()

carrinho1.adicionar("Notebook", 2500, 1)
carrinho1.adicionar("Mouse", 50.50, 2)
carrinho1.adicionar("Teclado", 150.75, 1)

carrinho1.exibir()

console.log(carrinho1.total())

carrinho1.remover("Mouse")

carrinho1.exibir()

