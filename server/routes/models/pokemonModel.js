// https://dev.to/aurelkurtula/building-a-restful-api-with-express-and-mongodb--3mmh
// BAS CHECKER https://stud.hosted.hr.nl/0944600/
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://test:test123@ds123844.mlab.com:23844/pokemon-api",
  {
    useNewUrlParser: true
  }
);
const Schema = mongoose.Schema;

// const urlSchema = new Schema({
//     self:{
//       href:{
//         type: String
//       }
//     },
//   collection: {
//     href:{
//       type: String
//     }
//   }
// }, { _id: false }) // set id to false

const pokemonModel = new Schema({
  name: { type: String },
  description: { type: String },
  trainer: { type: String, default: "Ash" },
  date: { type: Date, default: new Date() }
  // _links: urlSchema
});
module.exports = mongoose.model("pokemons", pokemonModel);
