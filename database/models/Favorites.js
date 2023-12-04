
module.exports = (sequelize, DataTypes)=>{
    const Favorites = sequelize.define("Favorites",{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        product_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    },
    {
        tableName : "favorites",
        timestamps : false,
    }
    )
    Favorites.associate = function(models){
        Favorites.belongsTo(models.Users,{
            as : "users",
            foreignKey : "user_id",
        }),
        Favorites.belongsTo(models.Product,{
            as : "product",
            foreignKey : "product_id"
        })
    }
    return Favorites
}
