db.createUser(
    {
        user: "user",
        pwd: "DHBW",
        roles: [
            {
                role: "readWrite",
                db: "Recipes"
            }
        ]
    }
);
db.createCollection("test"); //MongoDB creates the database when you first store data in that database
db.recipe.insertMany([
    {
      name: 'Pad Thai',
      description: 'A classic Thai dish made with stir-fried noodles and veggies.',
      email: 'john@example.com',
      ingredients: ['rice noodles', 'tofu', 'bean sprouts', 'eggs', 'peanuts'],
      category: 'Thai',
      img: Buffer.from(fs.readFileSync('public\img\spanish-food.jpg')),
      contenttype: 'image/jpeg'
    },
    {
      name: 'Taco Salad',
      description: 'A Tex-Mex inspired salad with ground beef, cheese, and tortilla chips.',
      email: 'jane@example.com',
      ingredients: ['ground beef', 'lettuce', 'tomatoes', 'cheese', 'tortilla chips'],
      category: 'Mexican',
      img: Buffer.from(fs.readFileSync('public\img\spanish-food.jpg')),
      contenttype: 'image/jpeg'
    }
  ]);
  console.log("Hey")