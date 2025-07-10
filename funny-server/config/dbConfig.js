import mongoose from 'mongoose'

const URI = process.env.URI
mongoose.set('strictQuery', false)

const connectToDb = async ()=>{
    try{
        const {connection} = await mongoose.connect(URI);
        if (connection){
            console.log(`Connected to MongoDB: ${connection.host}`)
        }
    }
    catch(e){
        console.log(e)
        process.exit(1)
    }
}

export default connectToDb;