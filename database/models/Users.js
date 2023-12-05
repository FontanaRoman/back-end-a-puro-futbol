/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/
module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("Users",{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        lastname : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        rol : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        image : {
            type : DataTypes.STRING,
        },
        registerDate : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        password : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        phone : {
            type : DataTypes.STRING,
            allowNull : false,
        },
    },
    {
        tableName : "users",
        timestamps : false,
    }
)
User.associate = function(models){
    User.hasMany(models.Orders,{
        as : "orders",
        foreignKey: "user_id",
    });
    User.hasMany(models.Favorites,{
        as : "favorites",
        foreignKey : "user_id"
    })
}
return User
}