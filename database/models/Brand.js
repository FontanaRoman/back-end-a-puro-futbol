
module.exports = (sequelize, DataTypes)=>{
    const Brand =  sequelize.define("Brand",{
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
        tableName : "brand",
        timestamps : false,
    }
    )
    Brand.associate = function(models){
        Brand.hasMany(models.Product,{
            as : "product",
            foreignKey : "brand_id",
        });
    };
    return Brand;
}