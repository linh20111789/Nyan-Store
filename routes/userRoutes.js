const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const wishlistController = require('../controllers/wishlistController')
const biddingRouter = require('./biddingRoutes')
const orderRouter = require('./orderRoutes')

const router = express.Router()

// need to find the better logic as a normal user can access orders of another person knowing his/her user._id

// To bidding
router.use('/:userId/bidding', biddingRouter)
router.use('/myBidding', biddingRouter)

// To orders
router.use('/:userId/orders', orderRouter)
router.use('/myOrders', orderRouter)

// On client
router.get('/isLoggedIn', authController.isLoggedIn)
router
    .route('/myWishlist')
    .get(authController.protect, wishlistController.getWishlist)
    .patch(authController.protect, wishlistController.addWishlist)
    .delete(authController.protect, wishlistController.removeWishlist)

// Authentication
router.post('/signUp', authController.signUp)
router.post('/logIn', authController.logIn)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:resetToken', authController.resetPassword)

router.use(authController.protect)
router.patch('/updatePassword', authController.updatePassword)
router.get('/logOut', authController.logOut)

// Me Routes
router.get('/me', userController.getMe, userController.getUser)
router.patch('/updateMe', userController.updateMe)
router.delete('/deleteMe', userController.deleteMe)

// User data routes
router.use(authController.restrictTo('admin'))
router.route('/').get(userController.getAllUsers)
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser)

module.exports = router
