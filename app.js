require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//Config JSON
app.use(express.json())

//Moduls
const User = require('./models/User')


// Rota Aberta - Publica
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API' })
})

//Rota Privada
app.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id

    //Checando se usuario existe
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }

    res.status(200).json({ user })

})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso Negado!' })
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch(error) {
        res.status(400).json({msg: "Token Inválido!"})
    }
}

// Registro de Usuario
app.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    //Validação
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório' })
    }
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatório' })
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senha não são iguais!' })
    }

    //Checando se o usuario já existe
    const userExist = await User.findOne({ email: email })

    if (userExist) {
        return res.status(422).json({ msg: 'Email já existe, utilize outro!' })
    }

    //Create PASS
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create User
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {

        await user.save()

        res.status(201).json({ msg: 'Usuario Criado com sucesso!' })

    } catch (error) {
        console.log(error)

        res
            .status(500)
            .json({ msg: 'Acontenceu um erro no servidor' })

    }
})

//Login de Usuario
app.post("/auth/login", async (req, res) => {

    const { email, password } = req.body


    //Validações
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatório' })
    }

    //Checar se o usuario existe
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({ msg: 'Usúario não encontrado!' })
    }

    //Checar se a senha existe
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida!' })
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })
    } catch (err) {
        console.log(err)

        res
            .status(500)
            .json({ msg: 'Acontenceu um erro no servidor' })
    }
})

//Credencial Usuario
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS



mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.evhgk8s.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000)
        console.log("Conectou ao Banco")
    }).catch((err) => console.log(err))

