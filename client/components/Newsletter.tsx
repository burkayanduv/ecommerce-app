import { Send } from '@material-ui/icons';

const Newsletter = () => (
  <div className="newsletter-container">
    <h1>Newsletter</h1>
    <p>Get timely updates from your favorite products.</p>
    <div className="newsletter-inputContainer">
      <input type="text" placeholder="Your email" />
      <button type="button">
        <Send />
      </button>
    </div>
  </div>
);

export default Newsletter;
