'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Orders & Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment gateway.',
  },
  {
    category: 'Orders & Payment',
    question: 'Can I cancel or modify my order?',
    answer: 'Yes, you can cancel your order before it is shipped. Once shipped, you will need to follow our return process. To cancel, go to "My Orders" and click "Cancel Order".',
  },
  {
    category: 'Orders & Payment',
    question: 'Do you offer Cash on Delivery (COD)?',
    answer: 'Currently, we only accept online payments. COD may be available in select locations in the future.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How long does delivery take?',
    answer: 'Delivery typically takes 3-5 business days for metro cities, 5-7 days for other cities, and 7-10 days for remote areas.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within India. International shipping may be available in the future.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'What are the shipping charges?',
    answer: 'Shipping is FREE for orders above ₹500. For orders below ₹500, a shipping charge of ₹50 applies.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can also track your order in the "My Orders" section of your account.',
  },
  {
    category: 'Products',
    question: 'Are your products really organic?',
    answer: 'Yes, all our products are 100% certified organic. We work directly with certified organic farms and ensure strict quality control.',
  },
  {
    category: 'Products',
    question: 'How do you ensure product quality?',
    answer: 'Every batch is tested for purity and quality. We maintain strict quality control standards and work only with certified organic suppliers.',
  },
  {
    category: 'Products',
    question: 'What is the shelf life of your products?',
    answer: 'Shelf life varies by product. All products have expiry dates clearly mentioned on the packaging. We ensure you receive products with adequate shelf life.',
  },
  {
    category: 'Products',
    question: 'Do you offer product samples?',
    answer: 'Currently, we do not offer samples. However, many of our products are available in smaller pack sizes for you to try.',
  },
  {
    category: 'Returns & Refunds',
    question: 'What is your return policy?',
    answer: 'We accept returns within 7 days of delivery for damaged, defective, or wrong products. Products must be unused and in original packaging.',
  },
  {
    category: 'Returns & Refunds',
    question: 'How long does it take to get a refund?',
    answer: 'Refunds are initiated within 3-5 business days after we receive and verify the returned product. Bank processing may take an additional 5-7 business days.',
  },
  {
    category: 'Returns & Refunds',
    question: 'Can I exchange a product?',
    answer: 'Yes, we offer exchanges for damaged or defective products. Contact us within 7 days of delivery to arrange an exchange.',
  },
  {
    category: 'Account & Support',
    question: 'Do I need an account to place an order?',
    answer: 'Yes, you need to create an account to place orders. This helps us provide better service and allows you to track your orders.',
  },
  {
    category: 'Account & Support',
    question: 'How do I reset my password?',
    answer: 'Click on "Sign In" and then "Forgot Password". Follow the instructions sent to your email to reset your password.',
  },
  {
    category: 'Account & Support',
    question: 'How can I contact customer support?',
    answer: 'You can reach us via email at support@organizon.in or call us at +91 XXXXXXXXXX (Mon-Sat, 9 AM - 6 PM IST).',
  },
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f8f9f5] py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-[#2d5016] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#2d5016] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <span className="text-xs font-semibold text-[#2d5016] mb-1 block">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our customer support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#2d5016] hover:bg-[#3d6820] text-white font-semibold px-8 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
