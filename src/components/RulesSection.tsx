import React from 'react';
import { CLASS_RULES } from '../data/faqData';

export const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="py-20 sm:py-24 bg-[#fffdfa] border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2
            id="rules-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight"
          >
            上課規定
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLASS_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <h3 className="font-bold text-base text-neutral-900">{rule.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
