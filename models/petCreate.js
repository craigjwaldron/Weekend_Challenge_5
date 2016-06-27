var mongoose = require ('mongoose');

var petSchema = mongoose.Schema({
  pet_name: { type: String, required: true, },
  pet_type: { type: String, required: true, },
  pet_age: { type: Number, required: true, }
});

var Pet = mongoose.model('allPets', petSchema );

module.exports = Pet;
