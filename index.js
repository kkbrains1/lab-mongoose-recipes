const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';



// Connection to the database "recipe-app"
mongoose
  .set('useFindAndModify', false)
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log('Cleaned MongoDB recipe-app');

    return Recipe.create({
      title: 'Thai Green Curry',
      level: 'Amateur Chef',
      ingredients: ['red pepper', 'chicken', 'coconut milk', 'thai curry paste', 'fish sauce'],
      cuisine: 'thai',
      dishType: 'main_course',
      //image: 'https://www.asiatourist.org/images/images/geng-kheaw-wan-gai-1.jpg',
      duration: 40,
      creator: 'Geng Kheaw Wan Gai',
      //created: Date.now()
    });

  })
  .then((newRecipe) => {
    console.log(newRecipe.title);

    return Recipe.insertMany(data);
  })
  .then((newRecipes) => {
    console.log(newRecipes);

    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration : 100})
  })
  .then(() => {
    console.log('Great Success! Rigatoni recipe duration was updated');

    return Recipe.deleteOne({title: 'Carrot Cake'});
  })
  .then(() => {
    console.log('Great Success! carrot cake was removed');

    return mongoose.disconnect();
  })
  .then(() => {
    console.log(`Disconnected from the database`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
