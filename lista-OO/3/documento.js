class Documento {
  constructor(titulo){
    this.titulo = titulo
    this.conteudo = ""
    this._historico = []
  }

  editar(novoConteudo){
    this._historico.push(this.conteudo)

    this.conteudo = novoConteudo
  }

  desfazer(){
    if(this._historico.length===0){
      console.log("Nada para desfazer")
      return
    }

    this.conteudo = this._historico.pop()
  }

  exibir(){
    console.log(`[Relatório] Conteúdo atual: ${this.conteudo}`)
  }
}

const doc = new Documento("Meu Documento")

doc.editar("Primeira edição")
console.log("✓ Primeira edição feita")

doc.editar("Segunda edição")
console.log("✓ Segunda edição feita")

doc.editar("Terceira edição")
console.log("✓ Terceira edição feita")

doc.exibir()

console.log("\n--- Desfazendo duas edições ---")
doc.desfazer()
console.log("✓ Primeira ação desfeita")

doc.desfazer()
console.log("✓ Segunda ação desfeita")

console.log("\n--- Exibindo resultado final ---")
doc.exibir()
