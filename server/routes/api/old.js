// const express =  require('express')
// import mongoose from 'mongoose';
// const router = express.Router()

// router.get('/', async (req,res) => {
//     try {
//         const pokemon = await loadPokemonCollection()
//         res.send(await pokemon.find({}).toArray())
//      } catch(e) {
//          console.log(e)
//          // res.send(send error status)
//      }

// })

// router.get('/:id', async (req, res) => {
//     try {
        
//         const pokemon = await loadPokemonCollection()
//         res.send(await pokemon.findOne({_id: new mongodb.ObjectID(req.params.id)}))
//      } catch(e) {
//          console.log(e)
//          res.send(e)
//      }
// })

// router.post('/', async (req, res) => {
//     try {
//         const pokemon = await loadPokemonCollection()

//         if(req.body == undefined){
//             res.send(400)
//         }
//         await pokemon.insertOne({
//             name: req.body.name,
//             types: [
//                 {
//                     type: req.body.type, 
//                     url: req.body.url
//                 }
//             ],
//             createdAt: new Date()
//         })
//         res.status(201).send()
//     } catch (error) {
//         console.log(e)
//         // res.send(send error status)
//     }
// })

// router.put('/:id', async (req, res) => {
//     try {
//         console.log( await req.body)
//         const pokemon = await loadPokemonCollection()
//         await pokemon.findOneAndUpdate({_id: new mongodb.ObjectID(req.params.id)}, 
//         {$set: {name: req.body.name,
//             types: [
//                 {
//                     type: req.body.type, 
//                     url: req.body.url
//                 }
//             ]}})
//         res.status(201).send()
        
//     } catch (error) {
//         console.log(e)
//         // res.send(send error status)
//     }
// })

// router.delete('/:id', async (req, res) =>{
//     const pokemon = await loadPokemonCollection()
//     await pokemon.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
//     res.send(200).send()
// })

// router.options("/*", function(req, res, next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     res.send(200);
//   });

// async function loadPokemonCollection() {
//     const client = await mongodb.MongoClient.connect(
//       'mongodb://test:test123@ds123844.mlab.com:23844/pokemon-api',
//       {
//         useNewUrlParser: true
//       }
//     );
  
//     return client.db('pokemon-api').collection('pokemon');
//   }
  
//   module.exports = router;


// const pokemonModel = require('../models/pokemonModel')
// const express = require('express')
// const router = express.Router()


// router.use('/:id', (req, res, next) =>{
//     pokemonModel.findById(req.params.id, (err, pokemon) =>{
//         if(err){
//             res.status(500).send(err)
//         }
//         else if(pokemon){
//             req.pokemon = pokemon
//             next()
//         }
//         else{
//             res.status(404).send('Pokemon not found')
//         }
//     })
// })
// // get

// // EXPRESS CHECK CONTENT TYPE,
// // EXPRESS USING OPTIONS OF DOCENT
// // DOE HATEOAS EN HAAL SELF LINKS WEG UIT MODEL,
// // VOLG DE PLURALSIGHT EN GG HOPELIJK

// router.get('/', (req, res) =>{

    
//     let query = {}

//     query.genre = req.query.description

//     pokemonModel.find(query,{})
//     .then(doc => {
//         res.json(doc)
//     }).catch(err => {
//         res.status(500).json(err)
//     })
// })

// router.get('/:id', (req, res) =>{
//     res.json(req.pokemon)
   
// })

// // create



// router.delete('/:id', (req, res) =>{
//     pokemonModel.findByIdAndDelete({_id: req.params.id})
//     .then(doc => {
//         res.json(doc)
//     }).catch(err => {
//         res.status(500).json(err)
//     })
// })

// // router.put('/:id', (req, res) =>{
// //     pokemonModel.findById({_id: req.params.id}, req.body)
// //     .then(doc => {
// //         console.log(req.body)
// //         res.json(doc)
// //     }).catch(err => {
// //         res.status(500).json(err)
// //     })
// // })

// router.put('/:id', (req, res) =>{
//     pokemonModel.findById(req.params.id)
//     .then(doc => {
//         doc.name = req.body.name
//         doc.description = req.body.description
//         doc.save()
//         res.json(doc)
//     }).catch(err => {
//         res.status(500).json(err)
//     })
// })

// router.patch('/:id',(req, res) =>{
//     if(req.body._id)
//         delete req.body._id
//     for (const key in req.body) {
//         req.pokemon[key] = req.body[key]
//     }

//     req.pokemon.save((err) =>{
//         if(err)
//         res.status(500).send(err)
//         else{
//             res.json(req.pokemon)
//             console.log(req.pokemon)
//         }
//     })
// })



// module.exports = router