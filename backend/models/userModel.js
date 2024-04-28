const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    }, 
    {timestamps: true}
)   

userSchema.statics.login = async function (email, password){
    
    if(!email || !password) {
        throw Error("All the fields must be filled")
    }

    const user = await this.findOne( {email} )
    
    if(!user){
        throw Error("User does not exist")
    }

    if(password !== user.password){
        throw Error("Invalid password")
    }

    return user
}

userSchema.statics.register = async function (email, password){
    
    if(!email || !password) {
        throw Error("All the fields must be filled")
    }

    const exists = await this.findOne( {email} )
    
    if(exists){
        throw Error("User already exists")
    }

    const user = await this.create({email, password})

    return user
}


module.exports = mongoose.model("User", userSchema)