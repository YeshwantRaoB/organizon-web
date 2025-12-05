export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8f9f5] py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Areas</h2>
              <p className="leading-relaxed">
                We currently ship across India. We deliver to all major cities and towns. For remote areas, delivery may take additional time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Charges</h2>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>Orders above ₹500: <strong>FREE Shipping</strong></li>
                <li>Orders below ₹500: ₹50 shipping charge</li>
                <li>Express delivery available at additional cost</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Time</h2>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>Metro cities: 3-5 business days</li>
                <li>Other cities: 5-7 business days</li>
                <li>Remote areas: 7-10 business days</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Delivery times are estimates and may vary based on location and product availability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Tracking</h2>
              <p className="leading-relaxed">
                Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order status in the "My Orders" section of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Packaging</h2>
              <p className="leading-relaxed">
                All products are carefully packaged in eco-friendly materials to ensure they reach you in perfect condition. We use minimal plastic and prioritize sustainable packaging.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Issues</h2>
              <p className="leading-relaxed">
                If you face any issues with delivery or receive a damaged product, please contact us within 24 hours of delivery at support@organizon.in or call +91 XXXXXXXXXX.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                For any shipping-related queries, please reach out to our customer support team:
              </p>
              <ul className="mt-4 space-y-2">
                <li><strong>Email:</strong> support@organizon.in</li>
                <li><strong>Phone:</strong> +91 XXXXXXXXXX</li>
                <li><strong>Hours:</strong> Monday-Saturday, 9 AM - 6 PM IST</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
