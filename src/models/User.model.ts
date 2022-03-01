import { Schema, model } from 'mongoose'

interface UserSchema {
  name: string,
  username: string,
  password: string,
  cookbooks?: object[]
}

const userSchema = new Schema({

    name : String,

    username: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8
    },

    cookbooks: [{}]

}, { timestamps: true })

const User = model<UserSchema>("User", userSchema);

export default User