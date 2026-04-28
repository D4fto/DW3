export default class ProdutoModel {
  #produtos = [
    {
      id: 1,
      nome: "Notebook",
      preco: 2500
    },
    {
      id: 2,
      nome: "Mouse",
      preco: 120
    },
    {
      id: 3,
      nome: "Cadeira Gamer",
      preco: 800
    },
  ]
  #proximoId = 4

  static validar(dados){
    const erros = []
    if(!dados.nome || dados.nome.trim() === ""){
      erros.push("nome é obrigatório e não pode ser string vazia")
    }
    if(!dados.preco || dados.preco < 0){
      erros.push("preco é obrigatório e deve ser um número maior que 0")
    }

    if(erros.length>0){
      return { valido: false, erros }
    }

    return { valido: true }
  }


  findAll(){
    return this.#produtos
  }

  findById(id){
    return this.#produtos.find(e => e.id === id)
  }

  create(dados){
    const produto = {
      id: this.#proximoId,
      ...dados
    }

    this.#produtos.push(produto)

    this.#proximoId++

    return produto
  }
  
  delete(id){
    const index = this.#produtos.findIndex(e => e.id === id)

    if(index === -1){
      return false
    }

    this.#produtos.splice(index, 1)

    return true
  }
}