// STEP-1 : IMPORT MONGOOSE PACKAGE
require("dotenv").config();
const mongoose = require('mongoose');

// Database Connection URL
//Mongoose is an Object Document Mapper (ODM)
const url = process.env.MONGO_URI;

// STEP-2 : ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
// err is callback function Parameter. ARROW OPERATOR.
// JSON.stringify convert Object to String. 2 means Indentation of Two space Character 
mongoose.connect(url)
    .then(async () => {
        console.log('NODEJS TO MongoDB Connection ESTABLISH.....');

    })
    .catch(err => {
        console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2));
        process.exit();
    });
    
// STEP-3 : EXPORT MODULE mongoose because we need it in other JS file
module.exports = mongoose;