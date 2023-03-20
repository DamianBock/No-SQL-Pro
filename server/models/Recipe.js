const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['Thai', 'Amerikanisch', 'Chinesisch', 'Mexican', 'Indian'],
    required: 'This field is required.'
  },
  img:
  {
  type: Buffer,
  required: 'This field is required.'
  }, 
  contenttype: {
    type: String,
    required: 'This field is required.'
  }
});

recipeSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('Recipe', recipeSchema);