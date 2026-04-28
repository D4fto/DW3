class Estoque {
  constructor(){
    this.produtos = []
  }

  cadastrar(nome, quantidade){
    if(this.produtos.findIndex(e => e.nome.toLowerCase() === nome.toLowerCase()) !== -1){
      console.log("Produto já cadastrado")
      return
    }
    
    this.produtos.push({
      nome,
      quantidade
    })
  }
  
  entrada(nome, quantidade){
    const index = this.produtos.findIndex(e => e.nome.toLowerCase() === nome.toLowerCase())
    if(index === -1){
      console.log("Produto não encontrado")
      return
    }
    
    this.produtos[index].quantidade+=quantidade
  }
  
  saida(nome, quantidade) {
    const index = this.produtos.findIndex(e => e.nome.toLowerCase() === nome.toLowerCase())
    if(index === -1){
      console.log("Produto não encontrado")
      return
    }

    const produto = this.produtos[index] 
    if(quantidade > produto.quantidade){
      console.log("Quantidade insuficiente")
      return
    }

    produto.quantidade-=quantidade
  }

  exibir(){
    this.produtos.map(e => console.log(`${e.nome}: ${e.quantidade} unidades`))
  }
}

const estoque1 = new Estoque()

estoque1.cadastrar("Notebook", 10)
estoque1.cadastrar("Mouse", 50)
estoque1.cadastrar("Teclado", 30)

estoque1.exibir()

console.log("--- Entrada de produtos ---")
estoque1.entrada("Notebook", 5)
estoque1.entrada("Mouse", 20)

estoque1.exibir()

console.log("--- Saída de produtos ---")
estoque1.saida("Teclado", 10)
estoque1.saida("Notebook", 8)

estoque1.exibir()

console.log("--- Tentativas inválidas ---")
estoque1.cadastrar("Mouse", 100)
estoque1.saida("Monitor", 1)
estoque1.saida("Notebook", 100)
