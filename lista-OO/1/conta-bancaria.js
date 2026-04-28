class ContaBancaria{
  constructor(titular, saldo){
    this.titular = titular
    this.saldo = saldo
  }

  depositar(valor){
    this.saldo+=valor
  }

  sacar(valor){
    if(this.saldo-valor<0){
      console.log("Saldo insuficiente")
      return
    }
    this.saldo-=valor
  }

  exibirSaldo(){
    console.log(`Titular: ${this.titular} | Saldo: R$ ${this.saldo.toFixed(2)}`)
  }
}

const conta1 = new ContaBancaria("Anna", 243)

const conta2 = new ContaBancaria("Eduardo", .67)

conta2.exibirSaldo()

conta1.depositar(1536.67)

conta1.exibirSaldo()

conta2.sacar(2000000)

conta2.exibirSaldo()

conta2.depositar(20)

conta2.exibirSaldo()

conta2.sacar(15)

conta2.exibirSaldo()