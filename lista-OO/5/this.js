class TimerErrado {
  constructor(nome) {
    this.nome = nome
    this.segundos = 0
  }

  iniciar() {
    setInterval(function() { //utilização de function para declarar função
      this.segundos++ // this perde a referência, ou seja this.segundos == undefined
      console.log(`${this.nome}: ${this.segundos}s`)
    }, 1000)
  }
}


class Timer {
  constructor(nome) {
    this.nome = nome
    this.segundos = 0
  }

  iniciar() {
    setInterval(() => {
      this.segundos++
      console.log(`${this.nome}: ${this.segundos}s`)
    }, 1000)
  }
}

const t = new Timer('Cronômetro')
t.iniciar()

/* 

1. Qual é o erro e por que ele acontece?
Erro explicado na linha 8 e 9: Na classe TimerErrado, a função anônima convencional (function) cria seu próprio contexto 'this', 
que não se refere à instância da classe. Assim, this.nome e this.segundos tornam-se undefined, causando 'undefined: NaN'.
O erro acontece porque 'function' cria seu próprio 'this', enquanto arrow function herda o 'this' do escopo externo.

2. Corrija o código usando arrow function.
CORRIGIDO: Na classe Timer, usamos arrow function () => { }, que herda o 'this' do escopo externo (a instância da classe).
Assim this.nome e this.segundos funcionam corretamente.

3. O que muda no comportamento do `this` ao usar uma arrow function?
Com arrow function, o 'this' é lexicamente vinculado (herdado do escopo externo), mantendo a referência à instância da classe.
Com function convencional, o 'this' é dinamicamente vinculado (cria seu próprio contexto), perdendo a referência à instância.

*/
