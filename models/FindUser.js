const userSchema = require('./UserSchema');

class FindUser{
    async findEmail(email){
        try {
            return await userSchema.findOne({email: email});
            
        } catch (error) {
            return error;
        }
    }
}

module.exports = new FindUser();