/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/
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
        state : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        brand_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        category_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        image : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        waist : {
            type : DataTypes.STRING,
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
            foreignKey :"category_id",
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