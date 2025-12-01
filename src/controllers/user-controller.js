import userModel from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const controller = {
    deleteOne: async function (req,res) {
        try {
            await userModel.deleteOne({cpf: req.params.id});
            res.status(200).json({message: `Usuário ${req.params.id} excluído com sucesso`});
        } catch (err) {
            res.status(400).json({message: `Não foi possível excluir o usuário ${req.params.id}`});
        }
        
    },

    getOne: async function (req,res) {
        try {
            const result = await userModel.findOne({cpf: req.params.id}, {__v: false, _id: false});
            const json = result.toObject();
            res.status(200).json(json);
        } catch (err) {
            res.status(400).json({message: `Não foi possível buscar o usuário ${req.params.id}`});
        }
        
    },

    updateOne: async function (req,res) {
        try{
            await userModel.updateOne({cpf: req.params.id}, req.body, {upsert: true});
            res.status(200).json({message: `Usuário ${req.body.name} atualizado com sucesso`});
        } catch (err) {
            res.status(400).json({message: `Não foi possível atualizar o usuário ${req.body.name}`});   
        }
        
    },

    getAll: async function (req,res) {
        const result = await userModel.find({}, {__v: false, _id: false});
        res.status(200).json(result);
    },

    create: async function(req,res){
        try {
            const user = req.body;
            const passwordEncrypted = await bcrypt.hash(user.password, 10);
            user.password = passwordEncrypted;
            const result = await userModel.create(user);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({message: `Não foi possível criar o usuário ${req.body.name}`, err});
        }

    },

    login: async function (req,res) {
        const result = await userModel.findOne({email: req.body.email}, {__v: false, _id: false});
        if (!result){
            return res.status(400).json({message: `Email não encontrado`});
        }else{
            const user = result?.toObject();
            if (!user){
            return res.status(400).json({message: `Usuário não encontrado`});
            }
            
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match){
                return res.status(400).json({message: `Senha incorreta`});
            }
            const payload = {
                email: user.email,
                cpf: user.cpf
            }

            const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h' });
            res.status(200).json({message: `Login realizado com sucesso`, token});
            
        }
        
    }

}

export default controller;
