import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema(
    {name:{type: String, required: true}},
    {strict: false}
)

const User = mongoose.model('User',userSchema)

export default User;