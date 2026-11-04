import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FaqSectionProps {
  onOpenLineModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenLineModal }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight"
          >
            常見問題
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div
                key={index}
                className="border border-neutral-200 rounded-2xl overflow-hidden transition-all bg-neutral-50/50"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-100/60 transition"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                    <span className="font-bold text-base sm:text-lg text-neutral-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-700 leading-relaxed border-t border-neutral-200/60 bg-white">
                    <p className="pt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick FAQ Footer CTA */}
        <div className="mt-12 text-center p-6 bg-[#f0fbf4] rounded-2xl border border-[#d1f2dd] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="font-bold text-neutral-900 text-sm sm:text-base">
              還有疑問嗎？
            </div>
            <p className="text-xs text-neutral-600 mt-0.5">
              歡迎加入官方 LINE，我們會為您解答～
            </p>
          </div>
          <button
            onClick={onOpenLineModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-bold shadow-xs transition shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            我有疑問！
          </button>
        </div>
      </div>
    </section>
  );
};
