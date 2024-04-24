const zod = require( "zod" );


const validateSignUp = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
    
});

const validateSignIn = zod.object({
    username: zod.string().email(),
    password: zod.string()

});

module.exports = {
    validateSignUp,
    validateSignIn
};