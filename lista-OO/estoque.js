class Estoque {
  constructor(){
    this.produtos = []
  }

  cadastrar(nome, quantidade){
    if(this.produtos.findIndex(e => e.nome === nome) !== -1){
      console.log("Produto já cadastrado")
      return
    }
    
    this.produtos.push({
      nome,
      quantidade
    })
  }
  
  entrada(nome, quantidade){
    const index = this.produtos.findIndex(e => e.nome === nome)
    if(index === -1){
      console.log("Produto não encontrado")
      return
    }

    this.produtos[index].quantidade+=quantidade
  }

  // ############## INCOMPLETO ####################


}