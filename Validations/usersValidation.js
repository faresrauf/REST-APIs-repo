const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const paginationSchema = joi.object({
    page: joi
        .number()
        .integer()
        .min(1)
        .default(1),
    per_page: joi
        .number()
        .integer()
        .min(1)
        .default(4)
});

const idSchema = joi.object({
    id: joi
        .number()
        .integer()
        .min(1)
        .required()
});

const baseSchema = joi.object({
    name: joi
        .string()
        .min(2)
        .max(30),
    job: joi
        .string()
        .min(2)
        .max(30)
        .default('Not working at this moment'),
    password: joiPassword
        .string()
        .min(8)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters(),
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net', 'org']
            }
        })
});

const userSchema = baseSchema.fork(
    ['name', 'job', 'password', 'email'],
    (schema) => schema.required()
);

const updateSchema = baseSchema.fork(
    ['name', 'job', 'password', 'email'],
    (schema) => schema.optional()
);


module.exports = {
    paginationSchema,
    idSchema,
    userSchema,
    updateSchema
}