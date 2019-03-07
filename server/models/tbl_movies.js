module.exports = function(sequelize,DataType){
	return sequelize.define('tbl_movies',{

		id : {
			type : DataType.DOUBLE,
			allownull : true,
			primaryKey : true
		},
		title : {
			type : DataType.STRING,
			allownull : true
        },
        year : {
        	type : DataType.STRING,
        	allownull : true
        },
        director : {
        	type : DataType.STRING,
        	allownull : true
        },
        categoryId : {
        	type : DataType.DOUBLE,
        	allownull : true,
            primaryKey : true
        },
        distribution : {
        	type : DataType.STRING,
        	allownull : true
        },
        description : {
            type : DataType.STRING,
            allownull : true
        },
        photoUrl : {
        	type : DataType.STRING,
        	allownull : true
        },
        isDeleted : {
            type : DataType.BOOLEAN,
            allownull : true
        }, 
        isApproved : {
            type : DataType.BOOLEAN,
            allownull : true
        }
    },{ 
        tableName : "tbl_movies",
        timestamps: false, 
    });
}