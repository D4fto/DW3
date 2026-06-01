function processarPagamento(valor) {
    if (valor <= 0) {
        throw new Error("Valor inválido");
    }

    return "Pagamento aprovado";
}

// Quem chama a função trata o erro
try {
    const resultado = processarPagamento(100);
    console.log(resultado);
} catch (erro) {
    console.log("Erro:", erro.message);
}

try {
    const resultado = processarPagamento(0);
    console.log(resultado);
} catch (erro) {
    console.log("Erro:", erro.message);
}