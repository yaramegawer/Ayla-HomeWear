const Policy = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-20 max-[400px]:px-3">
      <h1 className="text-4xl font-light text-center mb-12 max-sm:text-3xl">Store Policies</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-medium mb-4">Ordering Process</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong>How to Order:</strong> Browse our collection, select your items, choose size and color, 
              then add to cart. Proceed to checkout where you'll provide shipping information and payment details.
            </p>
            <p>
              <strong>Order Confirmation:</strong> You'll receive an email confirmation once your order is placed. 
              We'll send another email when your order ships with tracking information.
            </p>
            <p>
              <strong>Order Processing:</strong> Orders are processed within 1-2 business days. 
              You'll receive tracking information via email once your order ships.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Payment Methods</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>We accept the following payment methods:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Credit/Debit Cards (Visa, Mastercard)</li>
              <li>Cash on Delivery (COD)</li>
              <li>Mobile Wallets</li>
              <li>Bank Transfer</li>
            </ul>
            <p>All transactions are secure and encrypted. Payment is charged when you place your order.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Shipping & Delivery</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong>Shipping Options:</strong> We offer standard shipping (3-5 business days) and express shipping (1-2 business days).
            </p>
            <p>
              <strong>Shipping Costs:</strong> Free shipping on orders over 500 EGP. Standard shipping: 30 EGP, Express shipping: 60 EGP.
            </p>
            <p>
              <strong>Delivery Areas:</strong> We deliver throughout Egypt. Remote areas may have longer delivery times.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Returns & Exchanges</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong>Return Policy:</strong> You can return items within 14 days of delivery. Items must be unused, 
              with original tags and packaging.
            </p>
            <p>
              <strong>Exchange Policy:</strong> Exchanges are allowed within 14 days for different sizes or colors, 
              subject to availability.
            </p>
            <p>
              <strong>Non-returnable Items:</strong> Sale items, underwear, and personalized products cannot be returned.
            </p>
            <p>
              <strong>Return Process:</strong> Contact our customer service to initiate a return. 
              Refunds are processed within 5-7 business days after we receive the returned items.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Product Information</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong>Sizing:</strong> Please refer to our size guide for accurate measurements. 
              If you're between sizes, we recommend sizing up.
            </p>
            <p>
              <strong>Product Availability:</strong> All items shown are subject to availability. 
              We reserve the right to cancel orders if items become unavailable.
            </p>
            <p>
              <strong>Product Photos:</strong> We strive to display product colors accurately, 
              but colors may appear differently due to monitor settings.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Customer Service</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong>Support Hours:</strong> Saturday - Thursday, 10 AM - 8 PM
            </p>
            <p>
              <strong>Contact Methods:</strong> Email us at support@elmawardy.com or call +20 123 456 7890
            </p>
            <p>
              <strong>Response Time:</strong> We respond to emails within 24 hours during business days.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Terms & Conditions</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              By placing an order with ElMawardy Store, you agree to these terms and conditions. 
              We reserve the right to update these policies at any time.
            </p>
            <p>
              <strong>Price Changes:</strong> Prices are subject to change without notice. 
              You'll be charged the price at the time of your order.
            </p>
            <p>
              <strong>Order Cancellation:</strong> You can cancel your order within 2 hours of placing it. 
              After that, orders enter processing and cannot be cancelled.
            </p>
          </div>
        </section>

        <section className="pt-8 border-t">
          <p className="text-sm text-gray-500 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Policy;
