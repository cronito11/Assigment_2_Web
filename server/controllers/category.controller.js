import Category from '../models/categories.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
    const category = new Category(req.body)
    try {
        await category.save()
        return res.status(200).json({
            message: "Successfully Saved!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const list = async (req, res) => {
    try {
        let category = await Category.find().select('name updated created')
        res.json(category)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const categoryByID = async (req, res, next, id) => {
    try {
        let category = await Category.findById(id)
        if (!category)
            return res.status(400).json({
                error: "Category not found"
            })
        req.profile = category
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve category"
        })
    }
}

const categoryByName = async (req, res, next, name) => {
    try {
        let category = await Category.find({name: name})
        if (category.length == 0)
            return res.status(400).json({
                error: "Category not found"
            })
        req.profile = category
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve category"
        })
    }
}

const read = (req, res) => {
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
        let category = req.profile
        category = extend(category, req.body)
        category.updated = Date.now()
        await category.save()
        res.json(category)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res) => {
    try {
        let category = req.profile
        let deletedCategory = await category.deleteOne()
        res.json(deletedCategory)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
export default { create, categoryByID, categoryByName, read, list, remove, update }

