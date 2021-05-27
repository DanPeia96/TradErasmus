const bodyparser = require('body-parser')
const express =  require('express')
const control = require('./controllers')

const app = express() //API Main object

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(control.middleware) //Done
app.use('/web', express.static('public'))

app.get('/publications', control.getPublications)
app.get('/publications/:city', control.getPublicationsByCity)
app.post('/registro', control.registrar)
app.post('/login', control.login)

const PORT = 8080
app.listen(PORT, _ => console.log(`Servidor web escuchando en puerto ${PORT}`))
