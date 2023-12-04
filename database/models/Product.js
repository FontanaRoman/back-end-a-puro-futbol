
module.exports = (sequelize,DataTypes)=>{
    const Product = sequelize.define("Product",{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        waist :{
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        colors : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        state : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        brand_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        categoty_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    },
    {
        tableName : "product",
        timestamps : false,
    }
    )
    Product.associate = function(models){
        Product.belongsTo(models.Category,{
            as : "category",
            foreignKey :"categoty_id",
        }),
        Product.belongsTo(models.Brand,{
            as : "brand",
            foreignKey : "brand_id",
        }),
        Product.hasMany(models.Orders,{
            as : "orders",
            foreignKey : "product_id",
        }),
        Product.hasMany(models.Favorites,{
            as : "Favorites",
            foreignKey : "product_id",
        })
    }
    return Product
}