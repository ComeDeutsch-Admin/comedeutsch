import React from 'react';
import { MessageCircle, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenLineModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenLineModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-neutral-100"
    >
      {/* Background Image with soft translucent overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="hero_cover.jpg"
          alt="康德德語學習環境"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[0.95] blur-[1px] scale-105"
        />
        {/* Soft, warm white translucent wash overlay */}
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Big Main Title matching Screenshot 1 */}
        <h1
          id="hero-main-title"
          className="text-[48px] leading-[48px] sm:text-[64px] sm:leading-[64px] md:text-[90px] md:leading-[90px] font-extrabold tracking-tight text-neutral-950 font-sans select-none drop-shadow-xs"
        >
          康德德語
        </h1>

        {/* Goethe Quote verbatim from Screenshot 1 */}
        <p
          id="hero-quote"
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg font-semibold text-neutral-800 tracking-wide font-sans max-w-3xl px-4"
        >
          Wer fremde Sprachen nicht kennt, weiß nichts von seiner eigenen.
        </p>

        {/* Sub-description */}
        <p className="mt-6 text-base sm:text-lg text-neutral-700 max-w-2xl leading-relaxed font-normal">
          專為台灣學習者打造的專業德語線上學院。無論是留學、求職或對德語文化有興趣，透過專屬導師制度，為你量身打造最有效的德語學習路徑。
        </p>

        {/* Main CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-auto">
          <button
            id="hero-line-cta-btn"
            onClick={onOpenLineModal}
            className="w-auto px-7 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049a41] text-white font-bold text-[13px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>歡迎加 LINE 諮詢！</span>
          </button>
        </div>

        {/* Key Trust Signals Bar */}
        <div className="mt-12 sm:mt-14 inline-grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
          <div className="bg-white/85 backdrop-blur-xs border border-neutral-200/80 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span>檢定通過率 96%</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">Goethe & TestDaF 完整題型剖析</p>
          </div>
        
          <div className="bg-white/85 backdrop-blur-xs border border-neutral-200/80 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>雙軌導師制度</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">定期抽查學習進度與客製進度表</p>
          </div>
        
          <div className="bg-white/85 backdrop-blur-xs border border-neutral-200/80 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#06C755] shrink-0" />
              <span>LINE 即時諮詢</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">學習上遇到問題歡迎隨時詢問</p>
          </div>
        </div>
      </div>
    </section>
  );
};
