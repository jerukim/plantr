const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', {logging: false});

const Gardener = db.define('gardners', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
})

const Plot = db.define('plots', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
})

const Vegetable = db.define('vegetables', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATEONLY
})

Plot.belongsTo(Gardener);
Gardener.hasMany(Plot);

module.exports = db;
