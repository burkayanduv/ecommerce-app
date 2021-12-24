import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { useRouter } from 'next/router';
import { Add, Remove } from '@material-ui/icons';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { IReduxState } from '../shared/interfaces';
import { userRequest } from '../shared/functions/requestMethods';

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY as string;

const CartPage = () => {
  const cart = useSelector((state: IReduxState) => state.cart);
  const [stripeToken, setStripeToken] = useState<Token>();

  const router = useRouter();

  const onToken = (token: Token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken?.id,
          amount: cart.total * 100
        });
        router.push(
          {
            pathname: '/success',
            query: res.data
          },
          '/success'
        );
      } catch (err) {
        console.error(err);
      }
    };
    if (stripeToken && cart.total > 0) {
      makeRequest();
    }
  }, [stripeToken, cart, router]);

  return (
    <div className="cartPage-container">
      <Navbar />
      <Announcement />
      <div className="cartPage-wrapper">
        <h1>YOUR BAG</h1>
        <div className="cartPage-top">
          <button type="button">CONTINUE SHOPPING</button>
          <div className="cartPage-topTexts">
            <span>Shopping Bag (2)</span>
            <span>Your Wishlist (0)</span>
          </div>
          <button
            type="button"
            style={{ border: 'none', backgroundColor: 'black', color: 'white' }}
          >
            CHECKOUT NOW
          </button>
        </div>
        <div className="cartPage-bottom">
          <div className="cartPage-info">
            {cart.products.map((product) => (
              <div key={product._id}>
                <div className="cartPage-product">
                  <div className="cartPage-productDetail">
                    <div className="cartPage-imageContainer">
                      <Image
                        src={product.img}
                        layout="fill"
                        objectFit="contain"
                        alt="product-1"
                      />
                    </div>
                    <div className="cartPage-details">
                      <span>
                        <b>Product:</b> {product.title}
                      </span>
                      <span>
                        <b>ID:</b> {product._id}
                      </span>
                      <div
                        className="cartPage-productColor"
                        style={{ backgroundColor: product.color[0] }}
                      />
                      <span>
                        <b>Size:</b> {product.size[0]}
                      </span>
                    </div>
                  </div>
                  <div className="cartPage-priceDetail">
                    <div className="cartPage-productAmountContainer">
                      <Add />
                      <div className="cartPage-productAmount">
                        {product.quantity}
                      </div>
                      <Remove />
                    </div>
                    <div className="cartPage-productPrice">
                      {product.price * product.quantity}
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="cartPage-summary">
            <h1>ORDER SUMMARY</h1>
            <div className="cartPage-summaryItem">
              <span>Subtotal</span>
              <span>$ {cart.total}</span>
            </div>
            <div className="cartPage-summaryItem">
              <span>Estimated Shipping</span>
              <span>$ 5.90</span>
            </div>
            <div className="cartPage-summaryItem">
              <span>Subtotal</span>
              <span>$ -5.90</span>
            </div>
            <div
              className="cartPage-summaryItem"
              style={{ fontWeight: '500', fontSize: '24px' }}
            >
              <span>Total</span>
              <span>$ {cart.total}</span>
            </div>
            <StripeCheckout
              name="Anduv Shop"
              image="https://avatars.githubusercontent.com/u/57282311?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={STRIPE_KEY}
            >
              <button type="button">CHECKOUT NOW</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
