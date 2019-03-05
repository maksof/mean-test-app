module.exports = function(sequelize,DataType){
	return sequelize.define('tbl_user',{

		id : {
			type : DataType.DOUBLE,
			allownull : true,
			primaryKey : true
		},
		first_name : {
			type : DataType.STRING,
			allownull : true
        },
        last_name : {
        	type : DataType.STRING,
        	allownull : true
        },
        password : {
        	type : DataType.STRING,
        	allownull : true
        },
        gender : {
        	type : DataType.STRING,
        	allownull : true
        },
        age : {
        	type : DataType.DOUBLE,
        	allownull : true
        },
        email : {
        	type : DataType.STRING,
        	allownull : true,
        	PrimaryKey : true
        },
        phone : {
            type : DataType.STRING,
            allownull : true
        }, 
        role : {
            type : DataType.STRING,
            allownull : true
        },
        isDeleted : {
            type : DataType.BOOLEAN,
            allowNull : false
        },
        registerDate : {
            type : DataType.DATE,
            allowNull : false
        }
    },{ 
        tableName : "tbl_user",
        timestamps: false, 
    });
}