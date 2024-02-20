const mongoose = require('mongoose')

const connect = async () => {
  try {
      mongoose.set('strictQuery', false)
      const conn = await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
       console.log( `connected To Mongodb database:, ${conn.connection.host}`)
       
      
        
  } catch (error) {
    console.log(`ERROR in Mongodb: ${error.message}`);
    
  }
}

module.exports = connect