import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
        minLength:6
    },
    products: [{type: mongoose.Types.ObjectId,ref: "Product" , required: true}]
});
export default mongoose.model("User",userSchema);


