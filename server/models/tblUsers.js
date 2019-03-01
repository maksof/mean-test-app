module.exports = function(sequelize,DataType){
	return sequelize.define('tblUsers',{

		id : {
			type : DataType.DOUBLE,
			allownull : true,
			PrimaryKey : true
		},
		first_name : {
			type : DataType.STRING,
			allownull : true
        },
        last_name : {
        	type : DataType.STRING,
        	allownull : true
        },
        Password : {
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
        	type : DataType.DOUBLE,
        	allownull : true,
        	PrimaryKey : true
        },
         phone : {
            type : DataType.STRING,
            allownull : true,
            PrimaryKey : true
        }, 
         role : {
            type : DataType.DOUBLE,
            allownull : true,
            PrimaryKey : true
        },
        isDeleted : {
            type : DataType.BOOLEAN,
            allowNull : false
        },
        registerDate : {
            type : DataType.DATE,
            allowNull : false
        },
    },{
        	tableName : "administrator"

	});
}