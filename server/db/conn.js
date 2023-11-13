const mongoose = require("mongoose")
const DB = "mongodb+srv://harsh:admin1234@cluster0.uukupug.mongodb.net/mernstack?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connect start")).catch((error)=> console.log(error.message))

