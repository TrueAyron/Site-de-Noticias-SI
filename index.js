const express = require('express')
const app = express()
const fs = require('fs')
const noticias = require('./js/noticias.json')

app.use(express.static("public"))
app.use(express.urlencoded())
app.set('view engine', 'ejs');
app.set('views', './views');

app.post('/user', (req, res) => {
    const cnt = fs.readFileSync('data.json', {
        encoding:'utf8'
    })
    const users = JSON.parse(cnt)
    users.push(req.body)
    fs.writeFileSync('data.json', JSON.stringify(users))
    res.status(200).redirect('/page.html')
})

app.get('/', (req, res) => {
    res.render('index', {'noticias' : noticias})
})

app.get('/descricao', (req, res) => {
    res.render('descricao')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/registro', (req, res) => {
    res.render('registro')
})

app.get("/login", (req, res ) => {
    render.render('login')
})

app.get('/senha', (req, res) => {
    res.render('senha')
})

app.get('/descricao', (req, res) => {
    res.render('descricao')
})

app.post('/login', (req, res) => {
    const cnt = fs.readFileSync('data.json', {
        encoding:'utf8'
    })
    const users = JSON.parse(cnt)
    for(const user of users) {
        if(user.email === req.body.email && user.password === req.body.password) {
            const ul = Buffer.from(JSON.stringify(user)).toString('base64')
            res.header('set-cookie', `user=${ul}; Domain=localhost; Path=/; SameSite=Strict`)
            res.redirect('/page')
        }
    }
    res.redirect('/registro')
})
app.listen(8000)