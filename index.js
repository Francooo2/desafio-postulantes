const express  = require('express')
const app      = express()
const { init } = require('./data')

app.set('port', process.env.PORT || 3000)

app.get('/', async (req, res) => {
    const data = await init()
    res.json(data)
})

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
})