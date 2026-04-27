class Placar {
  constructor(timeCasa, timeVisitante){
    this.timeCasa = timeCasa
    this.timeVisitante = timeVisitante
    this.golsCasa = 0
    this.golsVisitante = 0
  }

  marcarGol(time){
    if(time.toLowerCase() === this.timeCasa.toLowerCase()){
      this.golsCasa++
      return
    }
    if(time.toLowerCase() === this.timeVisitante.toLowerCase()){
      this.golsVisitante++
      return
    }
    console.log("Time inválido")
  }

  exibir(){
    console.log(`${this.timeCasa} ${this.golsCasa} x ${this.golsVisitante} ${this.timeVisitante}`)
  }

  resultado(){
    if(this.golsCasa===this.golsVisitante){
      console.log("Empate")
      return
    }
    console.log(`Vitória do ${this.golsCasa>this.golsVisitante?this.timeCasa:this.timeVisitante}`)
  }
}

const jogo1 = new Placar("Flamengo", "Vasco")

jogo1.marcarGol("Flamengo")
jogo1.marcarGol("Flamengo")
jogo1.marcarGol("Vasco")

jogo1.exibir()
jogo1.resultado()

console.log("---")

const jogo2 = new Placar("São Paulo", "Corinthians")

jogo2.marcarGol("São Paulo")
jogo2.marcarGol("Corinthians")
jogo2.marcarGol("Corinthianss")

jogo2.exibir()
jogo2.resultado()
