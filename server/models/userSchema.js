const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nome:{
        type: String,
        required:true
    },
    link:{
        type: String,
        required:true
    },
    wpp:{
        type: String,
        required:true
    },
    bio:{
        type: String,
        required:true
    },
    materiaSelecionada:{
        type: String,
        required:true
    },
    custo:{
        type: String,
        required:true
    },
    diasSelecionado:{
        type: String,
        required:true
    },
    horarioEntrada:{
        type: String,
        required:true
    },
    horarioSaida:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    }
})

const users = new mongoose.model("users", userSchema)

module.exports = users;