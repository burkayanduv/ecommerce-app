import express from 'express';
import authRoute from './auth';
import userRoute from './user';
import productRoute from './product';
import cartRoute from './cart';
import orderRoute from './order';
import stripeRoute from './stripe';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/carts', cartRoute);
router.use('/orders', orderRoute);
router.use('/checkout', stripeRoute);

export default router;
