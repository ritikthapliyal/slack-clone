const mongoose = require('mongoose')


module.exports = async function connectAndStartServer(app){
    
    try{
        
        await mongoose.connect(process.env.MONGO_CONNECTION_URL)

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port 5000`)
        })

        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(error)
    }
}

