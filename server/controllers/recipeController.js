require('../models/database');
const fs = require('fs');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const kategorien = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
    const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
    const amerikanisch = await Recipe.find({ 'category': 'Amerikanisch' }).limit(limitNumber);
    const chinesisch = await Recipe.find({ 'category': 'Chinesisch' }).limit(limitNumber);

    const food = { latest, thai, amerikanisch, chinesisch };

    res.render('index', { title: 'Koch Blog - Home', kategorien, food } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

exports.exploreKategorien = async(req, res) => {
  try {
    const limitNumber = 20;
    const kategorien = await Category.find({}).limit(limitNumber);
    res.render('kategorien', { title: 'Koch Blog - Kategorien', kategorien } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

exports.exploreKategorienById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
    res.render('kategorien', { title: 'Koch Blog - Kategorien', categoryById } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 
 
/**
 * GET /recipe/:id
 * Recipe 
*/
exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Koch Blog - Recipe', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Koch Blog - Search', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
  
}

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Koch Blog - Explore Latest', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 



/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Koch Blog - Explore Latest', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Koch Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
  try {
    console.log(req.files.image);
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      img:req.files.image.data,
      contenttype: "image/png"        
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}




// Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();


// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();


/**
 * Dummy Data Example 
*/

async function insertDymmyCategoryData(){
  try {
    await Category.insertMany([
      {
        "name": "Thai",
        "image": "thai-food.jpg"
      },
      {
        "name": "Amerikanisch",
        "image": "amerikanisch-food.jpg"
      }, 
      {
        "name": "Chinesisch",
        "image": "chinesisch-food.jpg"
      },
      {
        "name": "Mexican",
        "image": "mexican-food.jpg"
      }, 
      {
        "name": "Indian",
        "image": "indian-food.jpg"
      },
      {
        "name": "Spanish",
        "image": "spanish-food.jpg"
      }
    ]);
  } catch (error) {
    console.log('err', + error)
  }
}

// insertDymmyCategoryData();


async function generateData(){
  const categories = ['Thai', 'Amerikanisch', 'Chinesisch', 'Mexican', 'Indian'];
const imagePaths = [
  'public/img/spanish-food.jpg',
  'public/img/mexican-food.jpg',
  'public/img/chinese-food.jpg'
];
const recipes = [];
const ingredientsList = [
  'Pasta', 'Reis', 'Tofu', 'Hähnchen', 'Rindfleisch', 'Schweinefleisch', 'Fisch', 'Garnelen',
  'Spinat', 'Brokkoli', 'Karotten', 'Paprika', 'Zwiebeln', 'Knoblauch',
  'Sojasauce', 'Honig', 'Essig', 'Olivenöl', 'Kokosmilch',
  'Salz', 'Pfeffer', 'Zucker', 'Maisstärke',
  'Kartoffeln', 'Tomaten', 'Pilze', 'Koriander', 'Ingwer', 'Currypulver', 'Chili', 'Kreuzkümmel'
];
const descriptionsList = [
  'Ein köstliches und aromatisches Rezept.',
  'Eine gesunde und herzhafte Mahlzeit.',
  'Perfekt für ein Abendessen unter der Woche.',
  'Toll für die Unterhaltung von Gästen.',
  'Ein Familienfavorit, den jeder lieben wird.',
  'Einfach zuzubereiten und voller Geschmack.',
  'Ein zufriedenstellendes und sättigendes Gericht.',
  'Voll von frischen Zutaten und kräftigen Aromen.',
  'Ein klassisches Rezept mit einem modernen Touch.',
  'Eine wohltuende und leckere Mahlzeit.',
  'Ein leichtes und gesundes Gericht.',
  'Einfach und schnell zuzubereiten.',
  'Ideal für Partys und Feiern.',
  'Ein traditionelles Gericht mit regionalen Zutaten.',
  'Geeignet für jeden Anlass und jede Jahreszeit.',
  'Einzigartig und unverwechselbar im Geschmack.',
  'Ein Geheimtipp für alle Feinschmecker.',
  'Ein kreatives Rezept mit überraschenden Aromen.',
  'Ein echter Gaumenschmaus für alle Sinne.',
  'Eine gelungene Kombination aus verschiedenen Geschmacksrichtungen.',
  'Ein echter Klassiker, der nie aus der Mode kommt.',
  'Eine kulinarische Entdeckungsreise für alle Genießer.',
  'Ein einfaches Gericht mit raffiniertem Geschmack.',
  'Ein gesunder Snack für zwischendurch.',
  'Ideal für eine schnelle und leckere Mahlzeit.',
  'Eine süße Versuchung für Naschkatzen.',
  'Ein aromatisches Gericht mit exotischen Zutaten.',
  'Ein Geheimtipp für alle, die es scharf mögen.',
  'Ein Genuss für alle Sinne und Gaumen.'
];
const recipeNames = [
  'Schweinefilet im Karamellmantel mit Ingwer-Soße und Kartoffelpüree',
  'Pikante Gemüsepfanne mit Erdnussbutter, Kokosmilch und Curry',
  'Knusprige Hähnchenschenkel mit Honig-Senf-Glasur und Ofenkartoffeln',
  'Kartoffelgratin mit Lachs, Spinat und Sahne-Soße',
  'Gefüllte Paprikaschoten mit Hackfleisch, Reis und Käse überbacken',
  'Vegetarische Gemüse-Burger mit Guacamole und Tomaten-Salsa',
  'Scharfes Chili con Carne mit Bohnen, Mais und Sour Cream',
  'Käse-Spinat-Suppe mit Hackbällchen und frischem Baguette',
  'Gebratener Reis mit Eiern, Gemüse und knusprigem Speck',
  'Zitronen-Hähnchen mit Thymian-Kartoffeln und gedünstetem Brokkoli',
  'Kartoffel-Gemüse-Gratin mit Gouda und Knoblauch',
  'Kürbisrisotto mit Parmesan und gerösteten Kürbiskernen',
  'Hackbraten im Speckmantel mit Rosmarin-Kartoffeln und Pilzsoße',
  'Hähnchen-Cordon-Bleu mit Karotten-Salat und Kartoffel-Spalten',
  'Spinat-Lachs-Lasagne mit Bechamel-Soße und geriebenem Gouda',
  'Herzhafte Pfannkuchen mit Speck, Zwiebeln und Käse',
  'Penne in Tomaten-Butter-Soße mit gebratenen Garnelen und Rucola',
  'Vegetarischer Nudelauflauf mit Mozzarella, Tomaten und Basilikum',
  'Gemüse-Ratatouille mit Knoblauch-Croutons und Parmesan',
  'Linsen-Eintopf mit Würstchen, Karotten und Sellerie',
  'Zitronen-Kartoffeln mit gebratenem Hähnchen und frischem Rucola',
  'Paprika-Hack-Pfanne mit Feta und Oliven, dazu Baguette',
  'Himbeer-Joghurt-Torte mit Schokoladenboden und Mandel-Verzierung',
  'Schweinebraten mit Kartoffelknödeln, Rotkohl und Soße'
];
for (let i = 1; i <= 30; i++) {
  const name = recipeNames[Math.floor(Math.random() * recipeNames.length)];
  const description = descriptionsList[Math.floor(Math.random() * descriptionsList.length)];
  const email = `user${i}@example.com`;
  const ingredients = [
    ingredientsList[Math.floor(Math.random() * ingredientsList.length)],
    ingredientsList[Math.floor(Math.random() * ingredientsList.length)],
    ingredientsList[Math.floor(Math.random() * ingredientsList.length)]
  ];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const imagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
  const img = Buffer.from(fs.readFileSync(imagePath));
  const contenttype = 'image/jpeg';
  
  recipes.push({
    name,
    description,
    email,
    ingredients,
    category,
    img,
    contenttype
  });
}

  try {
    await Recipe.insertMany(recipes)
    console.log(2);
   }
  catch{}
}
generateData();

