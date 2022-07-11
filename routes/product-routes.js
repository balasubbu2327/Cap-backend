import express  from "express";
import { addProduct, deleteProduct, getAllProducts, getById, getByUserId, updateProduct } from "../controllers/product-controller";

const productRouter = express.Router();

productRouter.get("/",getAllProducts);
productRouter.post("/add",addProduct);
productRouter.put("/update/:id",updateProduct);
productRouter.get("/:id",getById);
productRouter.delete("/:id",deleteProduct);
productRouter.get("/user/:id",getByUserId);



export default productRouter;
