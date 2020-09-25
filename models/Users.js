const userSchema = require('./UserSchema');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const findUser = require('./FindUser');
const jwtSecret = process.env.JWT_SECRET;


class Users{
    async createUser(data){
        try {

            var email = await findUser.findEmail(data.email);

            if(email !==  null){
                return false;
            }

            const hash = bcrypt.hashSync(data.senha, bcrypt.genSaltSync(10));
            
            let user = {
                guid: uuidv4(),
                nome: data.nome,
                email: data.email,
                senha: hash,
                data_criacao: Date.now(),
                data_atualizacao: Date.now(),
                ultimo_login: Date.now(),
                telefones: data.telefones
            }

            const token = jwt.sign({id: user.guid, email: user.email}, jwtSecret, {expiresIn: 60 * 30});
            
            const userModel = new userSchema(user);
            await userModel.save();

            user.token = token;
            return user
            
        }catch(error) {
            console.log(error);

        }
    }

    

    async loginUser(email, senha){
        try {
                var user = await findUser.findEmail(email);
                
                if(user === null || user === undefined){
                    return undefined;
                }
                var pass = bcrypt.compareSync(senha, user.senha);

                if(pass == false){
                    return false;
                }

                user.ultimo_login = Date.now();
                await user.save();

                user = await findUser.findEmail(email);
                
                const token = jwt.sign({id: user.guid, email: user.email}, jwtSecret, {expiresIn: 60 * 30});
                
                let use = {
                    guid: user.guid,
                    data_criacao: user.data_criacao,
                    data_atualizacao: user.data_atualizacao,
                    ultimo_login: user.ultimo_login,
                    token: token
                }

                return use;
            
        }catch(error) {
            console.log(error);
        }
    }

    

}

module.exports = new Users();