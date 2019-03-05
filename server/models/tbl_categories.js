module.exports = function(sequelize,DataType){
	return sequelize.define('tbl_categories',{

		id : {
			type : DataType.DOUBLE,
			allownull : true,
			primaryKey : true
		},
		categoryName : {
			type : DataType.STRING,
			allownull : true
        },
        isDeleted : {
            type : DataType.BOOLEAN,
            allownull : true
        }
    },{ 
        tableName : "tbl_categories",
        timestamps: false, 
    });
}