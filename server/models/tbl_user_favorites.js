module.exports = function(sequelize,DataType){
	return sequelize.define('tbl_user_favorites',{

		id : {
			type : DataType.DOUBLE,
			allownull : true,
			primaryKey : true
		},
		userId : {
			type : DataType.DOUBLE,
			allownull : true
        },
        movieId : {
            type : DataType.DOUBLE,
            allownull : true
        },
        date : {
            type : DataType.DATE,
            allownull : true
        }
    },{ 
        tableName : "tbl_user_favorites",
        timestamps: false, 
    });
}