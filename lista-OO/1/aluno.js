class Aluno {
  constructor(nome){
    this.nome = nome
    this.notas = []
  }

  adicionarNota(nota){
    this.notas.push(nota)
  }

  calcularMedia(){
    if(this.notas.length===0){
      return 0
    }
    return this.notas.reduce((a,b) => a+b)/this.notas.length
  }
  
  situacao(){
    return this.calcularMedia()>=6?"Aprovado":"Reprovado"
  }

  exibir(){
    console.log(`${this.nome} | Média: ${this.calcularMedia().toFixed(2)} | ${this.situacao()}`)
  }
}

const aluno1 = new Aluno("João Silva")
aluno1.adicionarNota(7)
aluno1.adicionarNota(8)
aluno1.adicionarNota(9)

const aluno2 = new Aluno("Maria Santos")
aluno2.adicionarNota(5)
aluno2.adicionarNota(4)
aluno2.adicionarNota(3)

aluno1.exibir()
aluno2.exibir()

console.log(aluno1.calcularMedia())
console.log(aluno2.calcularMedia())

console.log(aluno1.situacao())
console.log(aluno2.situacao())
