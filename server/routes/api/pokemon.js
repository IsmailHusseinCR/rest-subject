const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Pokemon = require("../models/pokemonModel");

router.options("/", function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "OPTIONS,POST, GET");
  res.header("Allow", "OPTIONS,POST,GET");
  res.set("Accept", "application/json");
  console.log(123);
  res.sendStatus(200);
});

router.options("/:id", function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET, PUT, DELETE");
  res.header("Allow", "OPTIONS,GET,PUT,DELETE");
  res.set("Accept", "application/json");
  res.sendStatus(200);
  console.log(req.headers);
});

router.get("/", (req, res, next) => {
  const perPage = 10;
  const page = req.params.start || 1;
  const start = parseInt(req.query.start);
  const limit = parseInt(req.query.limit);

  Pokemon.find({})
    .exec()
    .then(pokemons => {
      const response = {
        items: pokemons.map(pokemon => {
          console.log(pokemon.name);
          return {
            name: pokemon.name,
            description: pokemon.description,
            date: pokemon.date,
            trainer: pokemon.trainer,
            _id: pokemon._id,
            _links: {
              self: {
                href: `http://${req.headers.host}/api/pokemon/` + pokemon._id
              },
              collection: {
                href: `http://${req.headers.host}/api/pokemon`
              }
            }
          };
        }),
        _links: {
          self: {
            href: `http://${req.headers.host}/api/pokemon`
          }
        },
        pagination: {
          currentPage: page,
          // currentItems: limit || count,
          // totalPages: maxPage,
          // totalItems: count,
          _links: {
            first: {
              page: 1,
              href: `http://${
                req.headers.host
              }/api/pokemon/?start=1$limit=${limit}`
            }
          }
        }
      };
      if (pokemons.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No entries found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send("Body is empty");
  }

  let model = new Pokemon(req.body);
  model
    .save()
    .then(pokemon => {
      if (!pokemon || pokemon.length === 0) {
        return res.status(500).send(pokemon);
      }
      res.status(201).send(pokemon);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send("Body is empty");
  }
  if (
    !req.body.name.length ||
    !req.body.description.length ||
    !req.body.trainer.length
  ) {
    return res.status(400).send("Field is empty");
  }

  // IF POKEMON.NAME EN ALLE ATTRIBUTEN LEEG ZIJN GEEF ERROR
  const id = req.params.id;
  Pokemon.findById(id, function(err, pokemon) {
    if (err) res.status(500).res.send(err);
    else pokemon.name = req.body.name;
    pokemon.description = req.body.description;
    pokemon.trainer = req.body.trainer;
    pokemon.save();
    res.json(pokemon);
  });
});

// THE ASYNC AWAIT WAY ? I MEAN HOE DOE IK DE .THEN pokemon CALLBACK ?
// router.put("/:id", async (req, res) => {
//     const id = await req.params.id
//     let pokemon = await Pokemon.findById(id)
// })

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Pokemon.findById(id)
    .exec()
    .then(pokemon => {
      if (pokemon) {
        pokemon = pokemon.toJSON();
        pokemon._links = {
          self: {
            href: `http://${req.headers.host}/api/pokemon/` + pokemon._id
          },
          collection: {
            href: `http://${req.headers.host}/api/pokemon`
          }
        };
        res.status(200).json(pokemon);

        // res.status(200).json({
        //     Pokemon: pokemon,
        //     // _links: {
        //     //   self: {
        //     //       href: `http://${req.headers.host}/api/pokemon/` + pokemon._id
        //     //   },
        //     //   collection:{
        //     //     href: `http://${req.headers.host}/api/pokemon`
        //     // }

        //     // }
        // });

        //   pokemon["_links"] = {
        //     self: {
        //         href: `http://${req.headers.host}/api/pokemon/` + pokemon._id
        //     },
        //     collection:{
        //       href: `http://${req.headers.host}/api/pokemon`
        //   }
        // }
        // console.log(typeof pokemon);

        //res.status(200).json(pokemon);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const updater = {};
  for (const ops of req.body) {
    updater[ops.propName] = ops.value;
  }
  Pokemon.update({ _id: id }, { $set: updater })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:id", (req, res) => {
  Pokemon.findByIdAndDelete({ _id: req.params.id })
    .then(pokemon => {
      res.status(204);
      res.json(pokemon);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
