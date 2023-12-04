
module.exports = (sequelize, DataTypes)=>{
    const Orders = sequelize.define("Oders",{
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
        }
    },
    {
        tableName : "orders",
        timestamps : false
    }
    )
    Orders.associate = function(models){
        Orders.hasMany(models.Users,{
            as : "users",
            foreignKey : "user_id",
        }),
        Orders.hasMany(models.Product,{
            as : "product",
            foreignKey : "product_id",
        })
    }
    return Orders
}