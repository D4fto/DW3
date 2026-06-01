async function buscarPedido(id) {
    if (id === undefined || id === null) {
        throw new Error("ID do pedido é obrigatório");
    }

    // Aguarda 1 segundo
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    if (id !== 1) {
        throw new Error("Pedido não encontrado");
    }

    return {
        id: 1,
        total: 150
    };
}

async function executar(id) {
    try {
        const pedido = await buscarPedido(id);
        console.log("Pedido encontrado:", pedido);
    } catch (erro) {
        console.log("Erro:", erro.message);
    }
}

// Testes
executar(1);
executar(99);
executar();