import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
import category from './category.controller.js'
//Creation product
const create = async (req, res) => {
    //Get data from body
    const newProduct = new Product(req.body)
    //Check if category exist
    await category.categoryByName(req, res, async() => {
        try {
            //Save data in data base in case that category exist
            await newProduct.save()
            return res.status(200).json({
                message: "Successfully Uploaded!"
            })
        } catch (err) {
            //Return error
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }

    }, newProduct.category);
    
    
}
const list = async (req, res) => {
    try {
        const query = {};
        //Check if exist name and add it to the query
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }
        //send request to data base based in the query.
        let product = await Product.find(query).select('name description price quantity category updated created')
        //showing porducts in the response
        res.json(product)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const productByID = async (req, res, next, id) => {
    try {
        //find element by id in data bas
        let product = await Product.findById(id)
        //If product doesn't exist show message en response
        if (!product)
            return res.status('400').json({
                error: "product not found"
            })
        req.profile = product
        next()
        //Try to catch error in case that happend
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve product"
        })
    }
}
const read = (req, res) => {
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
//Take object info
        let product = req.profile
        //Update data of product
        product = extend(product, req.body)
        //Update date
        product.updated = Date.now()
        //Save in data base
        await product.save()
        res.json(product)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res) => {
    try {
        //Take object from Data base
        let product = req.profile
        //Delete product from data base
        let deletedProduct = await product.deleteOne()
        res.json(deletedProduct)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const deleteAll = async (req, res) => {
    try {
        //Delete all products from data base
        let result = await Product.deleteMany({}); 
        res.status(200).json({
            message: `${result.deletedCount} products deleted successfully.`
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};
export default { create, productByID: productByID, read, list, remove, update, deleteAll}

