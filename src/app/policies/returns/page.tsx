export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8f9f5] py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Return & Refund Policy</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Window</h2>
              <p className="leading-relaxed">
                We accept returns within <strong>7 days</strong> of delivery. Products must be unused, unopened, and in their original packaging.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligible for Return</h2>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>Damaged or defective products</li>
                <li>Wrong product delivered</li>
                <li>Products past expiry date</li>
                <li>Packaging tampered or damaged</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Eligible for Return</h2>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>Opened or used products</li>
                <li>Products without original packaging</li>
                <li>Products damaged due to misuse</li>
                <li>Products returned after 7 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Return</h2>
              <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                <li>Contact our support team within 7 days of delivery</li>
                <li>Provide order number and reason for return</li>
                <li>Send clear photos of the product and packaging</li>
                <li>Our team will verify and approve the return</li>
                <li>Pack the product securely in original packaging</li>
                <li>We'll arrange pickup or provide return address</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Process</h2>
              <p className="leading-relaxed mb-4">
                Once we receive and verify the returned product:
              </p>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>Refund will be initiated within 3-5 business days</li>
                <li>Amount will be credited to original payment method</li>
                <li>Bank processing may take 5-7 business days</li>
                <li>You'll receive confirmation via email and SMS</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchange Policy</h2>
              <p className="leading-relaxed">
                We offer exchanges for damaged or defective products. If you'd like to exchange a product, please contact us within 7 days of delivery. We'll arrange for a replacement to be sent once we receive the returned item.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
              <p className="leading-relaxed">
                You can cancel your order before it's shipped. Once shipped, you'll need to follow the return process. To cancel, go to "My Orders" and click "Cancel Order" or contact our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                For returns, refunds, or exchanges:
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
