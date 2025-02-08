import { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What types of furniture do you offer?',
      answer:
        'We offer a wide range of contemporary furniture including sofas, chairs, tables, beds, storage solutions, and outdoor furniture. Our collection is designed to suit modern aesthetics and functional needs.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to select countries. Additional charges may apply.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We accept returns within 30 days of purchase for a full refund, provided the items are unused and in their original packaging.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and financing options through Affirm. All transactions are secure and encrypted.',
    },
  ];

  return (
    <div id='faq' className="max-w-4xl mx-auto p-5 mb-16">
      <h1 className="text-lg font-medium text-gray-800 text-center mb-6 ">We have got the answers to your questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg p-4 duration-200"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className=" text-base font-normal ">{`${String(index + 1).padStart(2, '0')} ${faq.question}`}</h2>
              <span className="text-xl">{activeIndex === index ? '↑' : '↓'}</span>
            </div>
            {activeIndex === index && (
              <p className="mt-3 font-light text-sm text-gray-700 border-b p-5">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
