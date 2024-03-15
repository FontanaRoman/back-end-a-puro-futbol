/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/
module.exports = (sequelize, DataTypes)=>{
    const Orders = sequelize.define("Orders",{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        user_id : {
            type :  DataTypes.INTEGER,
            allowNull : false,
        },
        product_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        date : {
            type : DataTypes.DATE,
            allowNull : false,
        }
    },
    {
        tableName : "orders",
        timestamps : false
    }
    )
    Orders.associate = function(models){
        Orders.belongsTo(models.Users,{
            as : "users",
            foreignKey : "user_id",
        }),
        Orders.belongsTo(models.Product,{
            as : "product",
            foreignKey : "product_id",
        })
    }
    return Orders
}