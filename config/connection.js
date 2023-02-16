const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
// Connect to MongoDB
async function main(){
await mongoose.connect(uri, 
{ useNewUrlParser: true, useUnifiedTopology: true,
    });
}
module.exports = main;
