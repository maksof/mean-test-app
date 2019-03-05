define({ "api": [
  {
    "type": "get",
    "url": "movies/acceptSuggestedMovie",
    "title": "Accept Suggested Movie API",
    "name": "Accept_Suggested_Movie_API",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "movieId",
            "description": "<p>Movie Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "post",
    "url": "movies/addCategory",
    "title": "Add Category API",
    "name": "Add_Category_API",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "categoryName",
            "description": "<p>Category Name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "post",
    "url": "movies/addMovie",
    "title": "Add Movie API",
    "name": "Add_Movie_API",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "year",
            "description": "<p>Year</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "director",
            "description": "<p>Director Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "distribution",
            "description": "<p>Distribution</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "photoUrl",
            "description": "<p>Photo Url</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "post",
    "url": "movies/addTimePeriod",
    "title": "Add Time Period API",
    "name": "Add_Time_Period_API",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "timePeriod",
            "description": "<p>Time Period</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "movies/deleteCategory",
    "title": "Delete Category API",
    "name": "Delete_Category_API",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "movies/deleteMovie",
    "title": "Delete Movie API",
    "name": "Delete_Movie_API",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "movieId",
            "description": "<p>Movie Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "movies/deleteTimePeriod",
    "title": "Delete Time Period API",
    "name": "Delete_Time_Period_API",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "timePeriodId",
            "description": "<p>Time Period Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "movies/rejectSuggestedMovie",
    "title": "Reject Suggested Movie API",
    "name": "Reject_Suggested_Movie_API",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "movieId",
            "description": "<p>Movie Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "post",
    "url": "movies/suggestMovie",
    "title": "Suggest New Movie API For User",
    "name": "Suggest_New_Movie_API_For_User",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "year",
            "description": "<p>Year</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "director",
            "description": "<p>Director Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "distribution",
            "description": "<p>Distribution</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "photoUrl",
            "description": "<p>Photo Url</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>Is Deleted Key</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "isApproved",
            "description": "<p>Is Approved Key</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "post",
    "url": "movies/updateMovie",
    "title": "Update Movie API",
    "name": "Update_Movie_API",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Movie Id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "year",
            "description": "<p>Year</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "director",
            "description": "<p>Director Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "distribution",
            "description": "<p>Distribution</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "photoUrl",
            "description": "<p>Photo Url</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/movie-controller.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "user/login",
    "title": "Login API",
    "name": "Login_API",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email Address</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/user-controller.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "user/signup",
    "title": "Signup API",
    "name": "Signup_API",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "age",
            "description": "<p>Age</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Message corresponding to request.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/user-controller.js",
    "groupTitle": "User"
  }
] });
