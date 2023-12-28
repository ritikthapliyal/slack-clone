const mongoose = require('mongoose')


module.exports = async function connectAndStartServer(app){
    
    try{
        
        await mongoose.connect('mongodb://127.0.0.1:27017/slack-clone')

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port 5000`)
        })

        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(error)
    }
}

