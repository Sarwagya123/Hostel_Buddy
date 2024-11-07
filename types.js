const zod = require('zod')

const createApplication = zod.object({
    title: zod.string(),
    description: zod.string()
})

const createUser = zod.object({
    regno: zod.string().min(4).max(10),
    password: zod.string().min(6),
    name: zod.string(),
    email: zod.string().email(),
    roomtype: zod.string(),
    block: zod.string(),
    roomno: zod.string()
})


module.exports = {
    createTodo: createTodo,
    createUser: createUser
}