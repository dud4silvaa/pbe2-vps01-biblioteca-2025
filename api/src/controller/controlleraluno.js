const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const aluno = await prisma.aluno.create({
            data: req.body
        });
        return res.status(201).json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const alunos = await prisma.aluno.findMany();
    return res.json(alunos);
}

const readOne = async (req, res) => {
    try {
        const aluno = await prisma.aluno.findUnique({
            where: {
                ra: req.params.ra
            },
            include: {
                emprestimos: true 
            }
        });
        return res.json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const ra = req.params.ra; 

        const aluno = await prisma.aluno.update({
            where: {
                ra: String(ra) 
            },
            data: {
                telefone: req.body.telefone
            }
        });
        return res.status(202).json(aluno);
    } catch (error) {
        console.error(error);  
        return res.status(400).json({ error: error.message });
    }
};





const remove = async (req, res) => {
    try {
        await prisma.aluno.delete({
            where: {
                ra: Number(req.params.ra)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove };