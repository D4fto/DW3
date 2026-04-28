class Livro {
  constructor(titulo, autor){
    this.titulo = titulo
    this.autor = autor
    this.disponivel = true
  }

  emprestar(){
    if(!this.disponivel){
      console.log("Livro indisponível")
      return
    }
    this.disponivel = false
  }

  devolver(){
    this.disponivel = true
  }

  exibir(){
    return `${this.titulo} — ${this.autor} — ${this.disponivel?"Disponível":"Indisponível"}`
  }
}

class Biblioteca {
  constructor(nome){
    this.nome = nome
    this.acervo = []
  }

  adicionar(livro){
    this.acervo.push(livro)
  }

  buscar(titulo){
    const livro = this.acervo.find(e => e.titulo.toLowerCase() === titulo.toLowerCase())
    return livro?livro:null
  }

  emprestar(titulo){
    const livro = this.buscar(titulo)

    if(livro === null){
      console.log("Livro não encontrado")
      return
    }

    livro.emprestar()
  }

  devolver(titulo){
    const livro = this.buscar(titulo)

    if(livro === null){
      console.log("Livro não encontrado")
      return
    }

    livro.devolver()
  }

  exibirAcervo(){
    this.acervo.map(e => console.log(e.exibir()))
  }
}

const biblioteca = new Biblioteca("Biblioteca Municipal")

const livro1 = new Livro("1984", "George Orwell")
const livro2 = new Livro("O Cortiço", "Aluísio Azevedo")
const livro3 = new Livro("Dom Casmurro", "Machado de Assis")

biblioteca.adicionar(livro1)
biblioteca.adicionar(livro2)
biblioteca.adicionar(livro3)

console.log("=== Acervo inicial ===")
biblioteca.exibirAcervo()

console.log("\n=== Emprestando dois livros ===")
biblioteca.emprestar("1984")
console.log("✓ '1984' emprestado")

biblioteca.emprestar("O Cortiço")
console.log("✓ 'O Cortiço' emprestado")

console.log("\n=== Acervo após empréstimos ===")
biblioteca.exibirAcervo()

console.log("\n=== Devolvendo um livro ===")
biblioteca.devolver("1984")
console.log("✓ '1984' devolvido")

console.log("\n=== Acervo final ===")
biblioteca.exibirAcervo()
