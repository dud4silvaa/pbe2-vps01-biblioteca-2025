const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const calcularMulta = (retirada, devolucao) => {
    const diasEmprestado = Math.ceil((new Date(devolucao) - new Date(retirada)) / (1000 * 60 * 60 * 24));
    return Math.max(0, (diasEmprestado - 3) * 10); 
};

const create = async (req, res) => {
    const { alunoRa, livroId } = req.body;
    try {
        const emprestimo = await prisma.emprestimo.create({
            data: { alunoRa, livroId, devolucao: null },
        });
        res.status(201).json(emprestimo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const read = async (req, res) => {
    try {
        const emprestimos = await prisma.emprestimo.findMany();
        res.json(emprestimos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { devolucao } = req.body;

    try {
        const emprestimo = await prisma.emprestimo.findUnique({ where: { id: Number(id) } });
        if (!emprestimo) return res.status(404).json({ error: "Empréstimo não encontrado" });

        const multa = calcularMulta(emprestimo.retirada, devolucao);
        const emprestimoAtualizado = await prisma.emprestimo.update({
            where: { id: Number(id) },
            data: { devolucao: new Date(devolucao), multa },
        });

        res.status(200).json(emprestimoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.emprestimo.delete({ where: { id: Number(req.params.id) } });
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { create, read, update, remove };