const loggerMiddleware = (req, res, next) => {
    const horaAtual = new Date().toLocaleTimeString();
    console.log(`[${horaAtual}] Requisição recebida: ${req.method} ${req.url}`);
    next();
};

module.exports = loggerMiddleware;

// fluxo: [cliente] -> [middleware] -> [rota] -> [cliente]

// req -> objeto com dados da requisição (o que o cliente enviou)
// res -> objeto para montar a resposta que será enviada ao cliente
// next -> função que chama o próximo middleware ou a rota
// IMPORTANTE!!!: esquecer o next() faz a requisição "travar"!