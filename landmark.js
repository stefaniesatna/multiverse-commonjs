const sequelize = require("./db")
const { DataTypes, Model } = require("sequelize")

class Landmark extends Model {}

Landmark.init(
    {
        name: DataTypes.STRING
    },
    {
        sequelize,
        modelName: "landmark",
        timestamps: false
    }
)

module.exports = Landmark