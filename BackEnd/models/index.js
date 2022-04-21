require("dotenv").config();
const path = require("path");
const Sequelize = require("sequelize");
const fs = require("fs");

const db = {};

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST, 
        dialect: "sql", 
        port: process.env.DB_PORT 
    })

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === ".js")
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users    = require("./user.js")(sequelize, Sequelize)
db.messages = require("./message.js")(sequelize, Sequelize)
db.comments = require("./comment.js")(sequelize, Sequelize)

db.messages .belongsTo(db.users) //belongsTo association 0 à N et 0 à 1

db.comments .belongsTo(db.users)
            .belongsTo(db.messages)
            .hasOne(db.comments); //Configure une relation où ce type d'entité a une référence qui pointe vers une seule instance de l'autre type dans la relation. (Type / STRING ... STRING seul ... STRING / STRING)

db.users    
        .hasMany(db.messages) // pareil que hasOne sauf que ca configure les relations 1 vers 0 ou N 
        .hasMany(db.comments)

module.exports = db