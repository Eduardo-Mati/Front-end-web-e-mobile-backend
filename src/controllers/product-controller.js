import productModel from '../models/product-model.js';

const controller = {
    deleteOne: async function (req,res) {
        try {
            await productModel.deleteOne({_id: req.params.id});
            res.status(200).json({message: `Produto excluído com sucesso`});
        } catch (err) {
            res.status(400).json({message: `Não foi possível excluir o produto`});
        }
    },

    getOne: async function (req,res) {
        const result = await productModel.findByID(req.params.id);
        const {__v, _id, ...json} = result.toObject();
        
        res.status(200).json(json);
    },

    updateOne: async function (req,res) {
        try{
            await productModel.updateOne({_id: req.params.id}, req.body, {upsert: true});
            res.status(200).json({message: `Produto ${req.body.name} atualizado com sucesso`});
        } catch (err) {
            res.status(400).json({message: `Não foi possível atualizar o produto ${req.body.name}`});
        }
    },

    getAll: async function (req,res) {
        const result = await productModel.find({}, {__v: false});
        res.status(200).json(result);
    },
    
    create: async function(req,res){
        const result = await productModel.create(req.body);
        const {__v, ...json} = result.toObject();
        res.status(201).json(json);
    }
}

export default controller;
