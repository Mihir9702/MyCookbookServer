import { Schema, model, Types } from 'mongoose'

interface CategorySchema {
  title: string,
  image: string,
  description: string,
  recipes: [{
    strMeal: string,
    strMealThumb: string,
    idMeal: string
  }]
}

const categorySchema = new Schema({

  title: String,

  image: String,

  description: String,

  recipes: {
    type: [{}],
    unique: true
  }


})

const Category = model<CategorySchema>('Category', categorySchema)

export default Category