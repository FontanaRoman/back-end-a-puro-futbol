module.exports = (sequelize, DataTypes)=>{
    const Category = sequelize.define("Category",{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    },
    {
        tableName : "category",
        timestamps : false,
    }
    )
    Category.associate = function(models){
        Category.hasMany(models.Product,{
            as : "product",
            foreignKey : "category_id",
        })
    }
    return Category
}