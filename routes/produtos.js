const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

router.get('/erro-teste', (req, res) => {
    throw new Error('O servidor erro teste');
});

router.get('/', async (req, res, next) => {
    try {
        const categoriaId = req.query.categoriaId || req.query.categoria;
        let query = supabase.from('produtos').select('*').order('id', { ascending: true });

        if (categoriaId) {
            query = query.eq('categoriaId', categoriaId);
        }

        const { data, error } = await query;
        if (error) throw error;

        res.json(data);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const novoProduto = {
            categoriaId: req.body.categoriaId,
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            imagem: req.body.imagem
        };

        const { data, error } = await supabase
            .from('produtos')
            .insert([novoProduto])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const produtoId = parseInt(req.params.id, 10);
        const { data, error } = await supabase
            .from('produtos')
            .update(req.body)
            .eq('id', produtoId)
            .select()
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(data);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const produtoId = parseInt(req.params.id, 10);
        const { error } = await supabase
            .from('produtos')
            .delete()
            .eq('id', produtoId);

        if (error) throw error;
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
