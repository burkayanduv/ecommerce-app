import Image from 'next/image';
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter
} from '@material-ui/icons';

const Footer = () => (
  <div className="footer-container">
    <div className="footer-left">
      <h1>E-STORE</h1>
      <p>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don’t look even slightly believable.
      </p>
      <div className="footer-socialContainer">
        <div
          className="footer-socialIcon"
          style={{ backgroundColor: '#3B5999' }}
        >
          <Facebook />
        </div>
        <div
          className="footer-socialIcon"
          style={{ backgroundColor: '#E4405F' }}
        >
          <Instagram />
        </div>
        <div
          className="footer-socialIcon"
          style={{ backgroundColor: '#55ACEE' }}
        >
          <Twitter />
        </div>
        <div
          className="footer-socialIcon"
          style={{ backgroundColor: '#E60023' }}
        >
          <Pinterest />
        </div>
      </div>
    </div>
    <div className="footer-center">
      <h3 className="footer-title">Useful Links</h3>
      <ul>
        <li>Home</li>
        <li>Cart</li>
        <li>Men Fashion</li>
        <li>Women Fashion</li>
        <li>Accessories</li>
        <li>My Account</li>
        <li>Order Tracking</li>
        <li>Wishlist</li>
        <li>Terms</li>
      </ul>
    </div>
    <div className="footer-right">
      <h3 className="footer-title">Contact</h3>
      <div className="footer-contactItem">
        <Room style={{ marginRight: '10px' }} /> 622 Dixie Path , South
        Tobinchester 98336
      </div>
      <div className="footer-contactItem">
        <Phone style={{ marginRight: '10px' }} /> +1 234 56 78
      </div>
      <div className="footer-contactItem">
        <MailOutline style={{ marginRight: '10px' }} /> contact@lama.dev
      </div>
      <div className="footer-imageContainer">
        <Image
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          layout="fill"
          objectFit="contain"
          alt="payment"
        />
      </div>
    </div>
  </div>
);

export default Footer;
