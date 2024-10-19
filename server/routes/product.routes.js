import express from 'express'
import productCtrl from '../controllers/product.controller.js'
const router = express.Router()
//Create routes to '/api/products' in get post and delet 
router.route('/api/products')
	.get(productCtrl.list)
	.post(productCtrl.create)
	.delete(productCtrl.deleteAll)
	//Create routes when send id
router.route('/api/products/:productID')
	.get(productCtrl.read)
	.put(productCtrl.update)
	.delete(productCtrl.remove);
	//Create routes when send param ID
router.param('productID', productCtrl.productByID)
router.route('/api/products')
	.post(productCtrl.create)
	.get(productCtrl.list)
//Create routes when send param ID
router.param('productID', productCtrl.productByID)
router.route('/api/products/:productID')
	.get(productCtrl.read)
	.put(productCtrl.update)
	.delete(productCtrl.remove);


export default router;
