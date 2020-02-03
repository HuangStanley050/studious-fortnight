import React from 'react';
import './Contact.scss';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="left-side">
        <h1>Contact us</h1>
        <p>If you've a question about CMCFlow in general, or your mindfulness practice in particular get in touch!
        </p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto eum, commodi temporibus debitis velit, impedit eveniet iste fuga voluptate nam at quod inventore quia, doloribus sunt et beatae corrupti dolor.</p>
        <div className="emails">
          <p>Technical questions — help@cmcflow.com</p>
          <p>Press and media — press@cmcflow.com</p>
          <p>Anything else — info@cmcflow.com</p>
        </div>
      </div>
      <div className="right-side">
        <div className="image"></div>
      </div>
    </div>
  )
}

export default Contact;