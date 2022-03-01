import { Schema, model } from 'mongoose'

interface RecipeSchema {
  title: string,
  category: string,
  image: string,
  video: string,
  instructions: [string],
  ingredients: [string]
}

const recipeSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },

  category: String,

  image: String,

  video: String,

  instructions: [String],

  ingredients: [String],

})

const Recipe = model<RecipeSchema>('Recipe', recipeSchema)

export default Recipe