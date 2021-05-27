const message = require('./models')

const SSE = require('express-sse')  //Server side events

exports.middleware = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 
	           'Origin, Content-Type, Accept')
    res.header('Cache-Control', 'no-cache')
    next()
}

const stream = new SSE()

exports.eventStream = (req, res) => {
    console.log('Data...')
    stream.init(req, res)
}

exports.getPubications = async (req, res) => 
    req.send({result : await message.getPublications()})

exports.getPublicationByCity = async (req, res) =>
    res.send({result : await message.getPublicationByCity(req.params.city)})

exports.registrar = async (req, res) =>
    res.send({result: await message.registrar(req.body)}) //POST

exports.login = async (req, res) =>
    res.send({result: await M.login(req.body)}) //POST

