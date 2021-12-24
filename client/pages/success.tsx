import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { userRequest } from '../shared/functions/requestMethods';
import { IReduxState } from '../shared/interfaces';

const SuccessPage = () => {
  const router = useRouter();
  const data = router.query;
  const currentUser = useSelector(
    (state: IReduxState) => state.user.currentUser
  );
  const cart = useSelector((state: IReduxState) => state.cart);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post('/orders/', {
          userId: currentUser?._id,
          products: cart.products.map(
            (item: { _id: string; quantity: number }) => ({
              productId: item._id,
              quantity: item.quantity
            })
          ),
          amount: cart.total,
          address: data?.billing_details && data?.billing_details[0]
        });
        setOrderId(res.data._id);
      } catch (err) {
        console.error(err);
      }
    };
    if (data) {
      createOrder();
    }
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link href="/" passHref>
        <button type="button" style={{ padding: 10, marginTop: 20 }}>
          Go to Homepage
        </button>
      </Link>
    </div>
  );
};

export default SuccessPage;
