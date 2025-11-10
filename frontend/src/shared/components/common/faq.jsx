import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { faqs } from "./faqContent";
import PropTypes from "prop-types";

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="border rounded-xl overflow-hidden transition-all duration-300 bg-white shadow-md">
    <button
      className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-50"
      onClick={onToggle}
    >
      <span className="text-base font-normal">{faq.question}</span>
      {isOpen ? (
        <FaChevronUp className="text-gray-500" />
      ) : (
        <FaChevronDown className="text-gray-500" />
      )}
    </button>
    {isOpen && (
      <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
        {faq.answer}
      </div>
    )}
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl lg:text-3xl font-normal text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}

FAQItem.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
