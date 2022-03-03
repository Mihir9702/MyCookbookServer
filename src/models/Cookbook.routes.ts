import { Schema, model, Types } from 'mongoose'

interface CookbookSchema {
  owner: Types.ObjectId,
  recipes: Types.ObjectId[]
}

const cookBookSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  },
  recipes: [{
    type: Types.ObjectId,
    ref: 'Recipe'
  }]
})

const Cookbook = model<CookbookSchema>('Cookbook', cookBookSchema)

export default Cookbook