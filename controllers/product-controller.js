import mongoose from "mongoose";
import Product from "../models/product";
import User from "../models/User";

export const getAllProducts = async(req,res,next) => {
    let products;
    try {
        products = await Product.find().populate("user");
    } catch (error) {
        return console.log(error);
    }
    if (!products) {
        return res.status(404).json({message: "No Products Found"})
    }
    return res.status(200).json({products})
}

export const addProduct = async(req,res,next) => {
    const {item,cost,quantity,date,use,image,user} = req.body;

    let existingUser;
    try{
        existingUser = await User.findById(user);
    }
    catch (error) {
        return console.log(error);
    }
    if(!existingUser) {
        return res.status(400).json({message:"Unable to find User By this ID"})
    }


    const product = new Product({
        item,cost,quantity,date,use,image,user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await product.save({session});
        existingUser.products.push(product);
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (error) {
        return res.status(500).json({message: error})
    }
    return res.status(200).json({product})
}


export const updateProduct = async(req,res,next) => {
    const {item,cost,quantity,use} = req.body;
    const productId = req.params.id;
    let product;
    try {
        product = await Product.findByIdAndUpdate(productId,{
            item,cost,quantity,use
        })  
    } catch (error) {
        return console.log(error);
    }
    if(!product){
        return res.status(500).json({message:"Unable to Update the product"})
    }
    return res.status(200).json({product})
}


export const getById = async (req,res,next) => {
    const id = req.params.id;
    let product;
    try {
        product = await Product.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!product){
        return res.status(404).json({message:"No Product Found"})
    }
    return res.status(200).json({product})
}


export const deleteProduct = async (req, res,next) => {
    const id = req.params.id;

    let product;
    try {
        product = await Product.findByIdAndRemove(id).populate('user');
        await product.user.products.pull(product);
        await product.user.save();
    } catch (error) {
        return console.log(error);
    }
    if(!product){
        return res.status(500).json({message: 'Unable To Delete'})
    }
    return res.status(200).json({message: 'Successfully deleted'})
}


export const getByUserId = async (req,res,next) => {
    const userId = req.params.id;
    let userProducts;
    try {
        userProducts = await User.findById(userId).populate("products");
    } catch (error) {
        return console.log(error);
    }
    if(!userProducts) {
        return res.status(404).json({message: "No Product found"})
    }
    return res.status(200).json({ user:userProducts})

}