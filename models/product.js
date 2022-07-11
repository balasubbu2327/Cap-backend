import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    item: {
        type: 'string',
        required: true
    },
    cost: {
        type: 'number',
        required: true
    },
    quantity: {
        type: 'string',
        required: true
    },
    date:{
        type: 'string',
        required: true
    },
    use:{
        type: 'string',
        required: true
    },
    image:{
        type: 'string',
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model("Product", productSchema);


