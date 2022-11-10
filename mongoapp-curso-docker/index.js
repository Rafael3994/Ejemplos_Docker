import express from 'express'
import mongoose from 'mongoose'

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

// EJEMPLO 1: La forma basica para ejecutar este sistema
/* COMMAND:  
$ docker create -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=nico -e MONGO_INITDB_ROOT_PASSWORD=password mongo
*/
// mongoose.connect('mongodb://nico:password@localhost:27017/miapp?authSource=admin')

// EJEMPLO 2: Utilizando el nombre del contenedor para conectarnos (monguito)
// Primero se crea una image con el nombre miapp:1 del fichero docker file
/* 
$ docker build --tag miapp .
*/
/* COMMAND:  
$ docker create -p 27017:27017 --name monguito --network mired -e MONGO_INITDB_ROOT_USERNAME=nico -e MONGO_INITDB_ROOT_PASSWORD=password mongo
$ docker create -p 3000:3000 --name chanchito --network mired miapp:1
*/
mongoose.connect('mongodb://nico:password@monguito:27017/miapp?authSource=admin')



app.get('/', (_req, res) => {
  console.log('API ROOT');
  return res.send('API ROOT TEST')
})

app.get('/list', async (_req, res) => {
  console.log('listando... chanchitos...')
  const animales = await Animal.find();
  return res.send(animales)
})

app.get('/create', async (_req, res) => {
  console.log('creando...')
  await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' })
  return res.send('ok')
})



app.listen(3000, () => console.log('listening...'))
