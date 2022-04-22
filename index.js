// Se importa Express y la función definida en data.js 
const express  = require('express')
const { init } = require('./data')

// Se instancia una aplicación de Express
const app      = express()

// Se define un puerto para la aplicación
app.set('port', process.env.PORT || 3000)

// Se disponibiliza la ruta raiz del servidor de Express, que ejecuta init() y responde la información en JSON
app.get('/', async (req, res) => {
    const data = await init()
    res.json(data)
})

// La aplicación escucha en el puerto asignado
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
})