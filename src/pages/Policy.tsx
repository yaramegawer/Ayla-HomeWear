const Policy = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-20 max-[400px]:px-3">
      <h1 className="text-4xl font-light text-center mb-12 max-sm:text-3xl">
        Store Policies
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Ordering Process */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Ordering Process</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong>How to Order:</strong> Browse our collection, select your items, choose size and color,
              then add them to your cart. Go to your cart and click <strong>Checkout</strong>. You will need to
              enter your shipping information, contact details, and order details.
            </p>
            <p>
              A deposit is required to proceed. After placing your order, you will be redirected to WhatsApp
              to send a proof of your deposit.
            </p>
            <p>
              Once we confirm your deposit, your order will be confirmed and you will receive a confirmation
              message via WhatsApp.
            </p>
            <p>
              <strong>Order Processing:</strong> Orders are processed within 1–2 business days after deposit confirmation.
            </p>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Payment Methods</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>We accept the following payment methods:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Cash on Delivery (COD)</li>
              <li>Mobile Wallets</li>
            </ul>
          </div>
        </section>

        {/* Shipping */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Shipping & Delivery</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong>Shipping Options:</strong> We offer shipping across Egypt.
            </p>
            <p>
              <strong>Shipping Costs:</strong> Shipping fees vary depending on the governorate,
              starting from 65 EGP.
            </p>
            <p>
              <strong>Delivery Areas:</strong> We deliver throughout Egypt. Remote areas may take longer.
            </p>
          </div>
        </section>

        {/* Returns */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Returns & Exchanges</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              Orders are eligible for inspection upon delivery. Customers may check the items before accepting the order, as long as the courier is present.
              <br />
              Once the order has been received and the courier has left, no returns or exchanges will be accepted.
            </p>
           
          </div>
        </section>

        {/* Product Info */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Product Information</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong>Sizing:</strong> If you are unsure about your size, please contact our moderator.
              If you are between sizes, we recommend choosing the larger size.
            </p>
            <p>
              <strong>Product Availability:</strong> All items are subject to availability.
              We reserve the right to cancel orders if items become unavailable.
            </p>
            <p>
              <strong>Product Photos:</strong> Colors may vary slightly depending on your device.
            </p>
          </div>
        </section>

        {/* Customer Service */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Customer Service</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong>Support Hours:</strong> Available 24/7 throughout the week.
            </p>
            <p>
              <strong>Contact Methods:</strong> Phone: +20 10 92851229 or via our social media platforms.
            </p>
            <p>
              <strong>Response Time:</strong> We typically respond within 1–2 hours.
            </p>
          </div>
        </section>

        {/* Terms */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Terms & Conditions</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              By placing an order with Ayla HomeWear, you agree to these terms and conditions.
              We reserve the right to update these policies at any time.
            </p>
            <p>
              <strong>Price Changes:</strong> Prices may change without notice.
              You will be charged the price at the time of placing your order.
            </p>
            <p>
              <strong>Order Cancellation:</strong> You can cancel your order within 2 hours of placing it.
              After that, or once the deposit is paid, the order cannot be canceled.
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