import axios from 'axios'
import Category from '../models/Catagory.model'
import Recipe from '../models/Recipe.model';

Category
.find()
.then(all => {
  all.map(cat => {
    cat.recipes.map(re => {
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${re.idMeal}`)
      .then(response => {
        response.data.meals.map(recipeInfo => {

          const instructions = recipeInfo.strInstructions.replace(/\r?\n|\r/g, " ")

          Recipe.create({
            title: recipeInfo.strMeal,
            category: recipeInfo.strCategory,
            image: recipeInfo.strMealThumb,
            ingredients: [recipeInfo.strMeasure1, recipeInfo.strIngredient1],
            instructions: instructions
          })
          .then(recipe => {
            console.log(recipe)
          })
          .catch(() => console.log('Recipe Creation error'))

        })
      })
    })
  })
}).catch(e => console.log( { message: 'er' } ))
