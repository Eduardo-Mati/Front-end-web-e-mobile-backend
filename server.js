import dotenv from 'dotenv';
import express from 'express';
import userRouter from './src/routers/user-router.js';
import productRouter from './src/routers/product-router.js';
import mongoose from 'mongoose';
import mid from './src/authMiddleware.js';
import cors from 'cors';

dotenv.config();
const app = express();

//mongodb://localhost:27017/ecommerce
mongoose.connect(process.env.MONGO_URI);
app.use(express.json());
app.use(cors());
app.use(mid);

/*
app.get('/api/user', (req, res) => {
    console.log(req.body);
    res.status(200).json({data: user});
})

app.get('/api/user/:id', (req, res) => {
    console.log(req.params.id);
    const userFound = user.find((e) => e.id === Number(req.params.id));
    if(userFound){
        res.status(200).json({data: userFound});
    } else {
        res.status(404).json({error: 'Usuário não encontrado'});
    }
})

app.post('/api/user', (req, res) => {
    console.log(req.body);
    const url = 'http://127.0.0.1:3000/api/user';
    const dadosParaEnviar = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        id: user.length + 1,
        };
    fetch(url, {
        method: 'POST', // <--- Mudança 1: Especifica o método
        headers: {
            // <--- Mudança 2: Avisa a API que os dados são JSON
            'Content-Type': 'application/json' 
        },
        // <--- Mudança 3: Envia os dados convertidos para string
        body: JSON.stringify(dadosParaEnviar) 
    })
    .then(response => response.json())
    .then(data => {
    console.log('Sucesso! Recurso criado:', data);
    })
    .catch(error => {
    console.error('Erro:', error);
    });
    res.status(201).json({data: `Aqui está o usuário que você pediu para criar: ${req.body.name}`});
})
*/

app.use('/api/user', userRouter)

app.use('/api/product', productRouter)

/*
app.get('/api/product', (req, res) => {
    console.log(req.body);
    res.status(200).json({data: product});
})

app.get('/api/product/:id', (req, res) => {
    console.log(req.params.id);
    const productFound = product.find((item) => item.id === Number(req.params.id));
    if(productFound){
        res.status(200).json({data: productFound});
    } else {
        res.status(404).json({error: 'Produto não encontrado'});
    }
})

app.post('/api/product', (req, res) => {
    console.log(req.body);
    const url = 'http://127.0.0.1:3000/api/product';
    const dadosParaEnviar = {
        name: req.body.name,
        price: req.body.price,
        id: product.length + 1,
        };
    fetch(url, {
        method: 'POST', // <--- Mudança 1: Especifica o método
        headers: {
            // <--- Mudança 2: Avisa a API que os dados são JSON
            'Content-Type': 'application/json' 
        },
        // <--- Mudança 3: Envia os dados convertidos para string
        body: JSON.stringify(dadosParaEnviar) 
    })
    .then(response => response.json())
    .then(data => {
    console.log('Sucesso! Recurso criado:', data);
    })
    .catch(error => {
    console.error('Erro:', error);
    });
    res.status(201).json({data: `Aqui está o usuário que você pediu para criar: ${req.body.name}`});
})
*/




app.listen(process.env.PORT, () => {
    console.log(`O servidor está rodando na porta ${process.env.PORT}`);
});