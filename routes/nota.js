import express from 'express';
const router = express.Router();

import Nota from '../models/nota';

// agregar
router.post('/nueva-nota', async(req, res) => {
    const body = req.body;
    
    try {
        const notaDB = await Nota.create(body);
        res.status(200).json(notaDB);
    } catch(error) {
        
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el servidor unu',
            
            error
        })
    }
});

// obtener una nota
router.get('/nota/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const notaDB = await Nota.findOne({_id});
        res.status(200).json(notaDB);
    } catch(error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el servidor',
            error
        });
    }
});


// todas las notas
router.get('/nota', async (req, res) => {
    try {
        const notasDB = await Nota.find();
        res.status(200).json(notasDB);
    } catch(error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el servidor',
            error
        });
    }
});

// borrar una nota
router.delete('/nota/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const notaDB = await Nota.findByIdAndDelete({_id});
        if(!notaDB) {
            return res.status(400).json({
                mensaje: 'No se encontró la nota',
            });
        }
        res.status(200).json(notaDB);
    } catch(error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el servidor',
            error
        });
    }
});

// actualizar
router.put('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    console.log(req.params);
    try {
        let notaDB = await Nota.findByIdAndUpdate(_id, body);
        notaDB = await Nota.findOne({_id});
        res.status(200).json(notaDB);
    } catch(error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el servidor',
            error
        });
    }
});

// exportación 
module.exports = router;