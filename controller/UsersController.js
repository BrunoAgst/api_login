const User = require('../models/Users');
const findUser = require('../models/FindUser');

class UserController{
    
    async signUp(req, res){
        const data = req.body;
        var user = await User.createUser(data);

        
        if(user == false){
            res.status(400);
            res.json({err: "E-mail já existente"});
            return
        }

        res.status(200);
        res.json({
            id: user.guid,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            ultimo_login: user.ultimo_login,
            token: user.token
        });
    }

    async signIn(req, res){
        var email = req.body.email;
        var senha = req.body.senha;

        var user = await User.loginUser(email, senha);

        if(user === undefined){
            res.status(404);
            res.json({erro: 'Usuário e/ou senha inválidos'});
            return
        }

        if(user === false){
            res.status(401);
            res.json({erro: 'Usuário e/ou senha inválidos'});
            return
        }


        res.status(200);
        res.json(user);

    }

    async findUser(req,res){
        var email = req.loggedUser.email;
        var user = await findUser.findEmail(email);

        let userJson = {
            guid: user.guid,
            nome: user.nome,
            email: user.email,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            ultimo_login: user.ultimo_login,
            telefones: user.telefones
        }
        

        res.status(200);
        res.json({user: userJson});        
    }

}

module.exports = new UserController();