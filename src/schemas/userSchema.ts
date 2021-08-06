import Joi from "joi";

const userSchema = Joi.object({
    email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    password: Joi.string().trim().min(1).required(),

    confirmPassword: Joi.ref('password')
})

export {userSchema};