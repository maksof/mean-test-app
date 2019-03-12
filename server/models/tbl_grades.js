module.exports = function(sequelize,DataType){
	return sequelize.define('tbl_grades',{

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
        grade : {
			type : DataType.DOUBLE,
			allownull : true
        },
        date : {
			type : DataType.DATE,
			allownull : true
        }
    },{ 
        tableName : "tbl_grades",
        timestamps: false, 
    });
}