class FilaAtendimento {
  constructor(){
    this._fila = []
    this.contador = 1
  }

  entrar(nome){
    this._fila.push({
      senha: this.contador,
      nome
    })

    this.contador++

    console.log(`Senha ${this.contador-1} gerada para ${nome}`)
  }

  chamarProximo(){
    if(this._fila.length===0){
      console.log("Fila vazia")
      return
    }

    const proximo = this._fila.shift()

    console.log(`Chamando senha ${proximo.senha} - ${proximo.nome}`)
    return proximo
  }

  tamanho(){
    return this._fila.length
  }
  
}

const fila1 = new FilaAtendimento()

fila1.entrar("João Silva")
fila1.entrar("Maria Santos")
fila1.entrar("Pedro Costa")
fila1.entrar("Ana Oliveira")

console.log(`Tamanho da fila: ${fila1.tamanho()}`)

console.log("--- Atendendo clientes ---")
fila1.chamarProximo()
fila1.chamarProximo()

console.log(`Tamanho da fila: ${fila1.tamanho()}`)

fila1.chamarProximo()
fila1.chamarProximo()

console.log(`Tamanho da fila: ${fila1.tamanho()}`)

console.log("--- Tentativa de chamar com fila vazia ---")
fila1.chamarProximo()
