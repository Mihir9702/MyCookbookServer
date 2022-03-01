import { Schema, model, Types } from 'mongoose'

interface CategorySchema {
  title: string,
  recipes: [string]
}

const categorySchema = new Schema({

  title: String,

  recipes: {
    type: [Types.ObjectId],
    ref: 'Recipe'
  }

})

const Category = model<CategorySchema>('Category', categorySchema)

export default Category