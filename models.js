const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', {
  logging: false
});

const Gardener = db.define('gardners', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
});

const Plot = db.define('plots', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
});

const Vegetable = db.define('vegetables', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATE
});

Plot.belongsTo(Gardener);
Gardener.hasMany(Plot);
Plot.belongsToMany(Vegetable, { through: 'vegetable_plot' });
Vegetable.belongsToMany(Plot, { through: 'vegetable_plot' });
Vegetable.hasMany(Gardener, { as: 'favorite_vegetable' });

const vegetableNames = ['eggplant', 'pepper', 'horse', 'radish', 'dirt'];
const vegetableColors = ['brown', 'brown', 'white', 'white', 'brown'];
const vegetableDates = [
  Date.now(),
  Date.now() - 1000000,
  Date.now(),
  Date.now() + 799999,
  Date.now()
];

(async () => {
  const veggie = await Vegetable.create({
    name: 'eggplant',
    color: 'purple',
    planted_on: Date.now()
  })
})();

// Vegetable.create({
//   name: 'eggplant',
//   color: 'purple',
//   planted_on: Date.now()
// }).then((row) => {
//   db.sync();
// }).catch()

// for (let i = 0; i < 5; i++) {
//   Vegetable.create({
//     name: vegetableNames[i],
//     color: vegetableColors[i],
//     planted_on: vegetableDates[i]
//   })
//     .then()
//     .then()
//     .catch((er) => {
//       console.log(`${vegetableNames[i]} failed!`, er);
//     });
// }

module.exports = db;
