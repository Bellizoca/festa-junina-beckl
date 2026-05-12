const errorHandler = (err, req, res, next) => {
    console.error(`Erro detectado: ${err.message}`);
    res.status(500).json({
        sucesso: false,
        mensagem: "ocorreu um erro interno no servidor.",
        detalhe:err.message
    });
};

module.exports = errorHandler;

// Códigos de status HTTP mais comuns:
// 200 -> OK (tudo certo)
// 201 -> Created (recurso criado com sucesso)
// 400 -> bad request (cliente enviou dados errados)
// 404 -> Not Found (recurso não encontrado)
// 500 -> internal server error (erro no servidor) 