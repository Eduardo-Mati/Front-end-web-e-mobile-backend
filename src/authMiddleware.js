import jwt from 'jsonwebtoken';

const mid = (req, res, next) => {
    //Verifica se a rota tem autenticação liberada
    const noAuthRoutes = ['/api/user/login', '/api/user/register'];
    if (noAuthRoutes.includes(req.path)){
        return next();
    }else{

        //verificar se o token foi enviado na requisição
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token){
            return res.status(401).json({message: `Token não encontrado`});
        }
        
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err){
                return res.status(403).json({message: `Token inválido`});
            }
            next();
        })

        
    }
}

export default mid;