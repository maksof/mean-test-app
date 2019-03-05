module.exports = function(sequelize,DataType){
	return sequelize.define('tbl_time_periods',{

		id : {
			type : DataType.DOUBLE,
			allownull : true,
			primaryKey : true
		},
		timePeriod : {
			type : DataType.STRING,
			allownull : true
        },
        isDeleted : {
            type : DataType.BOOLEAN,
            allownull : true
        }
    },{ 
        tableName : "tbl_time_periods",
        timestamps: false, 
    });
}