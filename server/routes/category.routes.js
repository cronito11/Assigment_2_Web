import express from 'express'
	import categoryCtrl from '../controllers/category.controller.js' 
	const router = express.Router()
//Create routes for categories
	router.route('/api/categories') 
	.get(categoryCtrl.list)
	.post(categoryCtrl.create)
	router.route('/api/categories/:categoryID') 
	.get(categoryCtrl.read)
	.put(categoryCtrl.update) 
	.delete(categoryCtrl.remove)
	router.param('categoryID', categoryCtrl.categoryByID) 
    router.route('/api/categories').post(categoryCtrl.create)
    router.route('/api/categories').get(categoryCtrl.list)
    router.param('categoryID', categoryCtrl.categoryByID)
    router.route('/api/categories/:categoryID').get(categoryCtrl.read)
    router.route('/api/categories/:categoryID').put(categoryCtrl.update)
    router.route('/api/categories/:categoryID').delete(categoryCtrl.remove)


	export default router
