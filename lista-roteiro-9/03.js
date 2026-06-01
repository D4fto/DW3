class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function criarProduto(dados) {
    if (!dados.nome) {
        throw new ValidationError("O nome do produto é obrigatório");
    }

    if (typeof dados.preco !== "number" || dados.preco <= 0) {
        throw new ValidationError("O preço deve ser um número maior que zero");
    }

    if (
        typeof dados.estoque !== "number" ||
        !Number.isInteger(dados.estoque) ||
        dados.estoque < 0
    ) {
        throw new ValidationError(
            "O estoque deve ser um número inteiro maior ou igual a zero"
        );
    }

    return {
        nome: dados.nome,
        preco: dados.preco,
        estoque: dados.estoque
    };
}

// Testes
const produtos = [
    { nome: "Notebook", preco: 3500, estoque: 10 },
    { preco: 100, estoque: 5 },
    { nome: "Mouse", preco: -50, estoque: 10 },
    { nome: "Teclado", preco: 150, estoque: 1.5 }
];

for (const produto of produtos) {
    try {
        const resultado = criarProduto(produto);
        console.log("Produto criado:", resultado);
    } catch (erro) {
        if (erro instanceof ValidationError) {
            console.log(`Erro de validação: ${erro.message}`);
        } else {
            console.log("Erro inesperado");
        }
    }
}