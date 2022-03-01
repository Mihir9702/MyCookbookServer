import mongoose from 'mongoose'
import MONGO_URI from './consts'
// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const Mongoose = () => {

  mongoose
    .connect(MONGO_URI)
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(e => console.error('Error connecting to mongo: ', e))

}

export default Mongoose