const mongoose = require("mongoose");
const { Schema } = require("zod");

mongoose.connect("mongodb+srv://prathammailme09:Bwuack09@cluster0.pakoo3h.mongodb.net/bank")
.then(()=>{
    console.log( "Connected to database" );
})
.catch((error)=>{
    console.log(error)
});

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required : true,
        maxlength : 30,
    },
    firstName:{
        type: String,
        required : true,
        maxlength : 30,
    },
    lastName:{
        type: String,
        maxlength : 30,
    },
    password:{
        type: String,
        required : true,
        maxlength : 30,
        minlength: 8
    }
});


const accountSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const  User = mongoose.model('User',userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports={
    User,
    Account
};