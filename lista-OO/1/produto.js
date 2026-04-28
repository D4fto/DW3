class Produto{
  constructor(nome, preco, estoque){
    this.nome = nome
    this.preco = preco
    this.estoque = estoque
  }

  disponivel(){
    return this.estoque>0
  }

  exibir(){
    console.log(`${this.nome} | R$ ${this.preco.toFixed(2)} | ${this.disponivel()?"Em estoque":"Fora de estoque"}`)
  }
}

const notebook = new Produto("Notebook", 243, 1)

const fone = new Produto("Fone de ouvido", .67, 12)

notebook.exibir()
fone.exibir()

console.log(notebook.disponivel())
console.log(fone.disponivel())

notebook.estoque=0

console.log(notebook.disponivel())
notebook.exibir()