import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ADVANTAGES_DATA } from '../data/advantagesData';
import { GraduationCap, Layers, Sparkles, PhoneCall, ReceiptText, MessageCircle, CheckCircle } from 'lucide-react';

interface AdvantagesSectionProps {
  onOpenLineModal: () => void;
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ onOpenLineModal }) => {
  const [activeTabId, setActiveTabId] = useState(ADVANTAGES_DATA[0].id);

  // 捲動提示：判斷左右兩側是否還有被隱藏的分頁
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollHints = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    updateScrollHints();
    window.addEventListener('resize', updateScrollHints);
    return () => window.removeEventListener('resize', updateScrollHints);
  }, [updateScrollHints]);

  const handleTabClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTabId(id);
    // 點選後把該分頁捲到中間，左右鄰近分頁露出來，暗示可以繼續滑
    e.currentTarget.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const activeTab = ADVANTAGES_DATA.find((tab) => tab.id === activeTabId) || ADVANTAGES_DATA[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5" />;
      case 'ReceiptText':
        return <ReceiptText className="w-5 h-5" />;
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <section id="advantages" className="py-20 sm:py-24 bg-[#fff9eb] border-y border-[#fce9c9]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 2 */}
        <div className="text-center max-w-3xl mx-auto">
          <h2
            id="advantages-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight flex items-center justify-center gap-2"
          >
            為什麼要選擇康德德語？
          </h2>

          <h3 className="text-lg sm:text-xl font-bold text-neutral-800 mt-4 tracking-normal">
            開啟你的德語學習之旅，選擇最懂你的專業夥伴！
          </h3>

          <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
            無論您是為了留學、職涯發展、考取檢定（Goethe / TestDaF / TELC），還是單純對德語文化抱持熱情，我們都能為您打造最有效率、最紮實的學習路徑。
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="relative mt-12">
          <div
            ref={scrollRef}
            onScroll={updateScrollHints}
            className="overflow-x-auto pb-1 scrollbar-none"
          >
            <div className="flex justify-start md:justify-center border-b border-neutral-300 min-w-max">
              {ADVANTAGES_DATA.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    onClick={(e) => handleTabClick(tab.id, e)}
                    className={`relative py-3.5 px-4 sm:px-6 text-sm sm:text-base font-semibold transition-colors duration-150 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'text-neutral-950 font-bold'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <span className={`${isActive ? 'text-neutral-900' : 'text-neutral-400'}`}>
                      {getIcon(tab.iconName)}
                    </span>
                    <span>{tab.title}</span>

                    {/* Active Underline */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-neutral-950 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 左側漸層：左邊還有內容時顯示（顏色需與 section 背景 #fff9eb 一致） */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 bottom-1 w-12 bg-gradient-to-r from-[#fff9eb] to-transparent transition-opacity duration-200 md:hidden ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* 右側漸層：右邊還有內容時顯示 */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute right-0 top-0 bottom-1 w-14 bg-gradient-to-l from-[#fff9eb] to-transparent transition-opacity duration-200 md:hidden ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Tab Content */}
        <div className="mt-10 bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-neutral-200/90 transition-all duration-200 max-w-3xl mx-auto">
          <div className="space-y-6">
            <div>
              {/* 手機：「特色解析」獨立一行、說明文字在下方；桌面：維持單行膠囊 */}
              <div className="inline-flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 px-3 py-1.5 sm:py-1 rounded-2xl sm:rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-2">
                <span className="shrink-0 whitespace-nowrap">特色解析</span>
                <span className="hidden sm:inline" aria-hidden="true">•</span>
                <span className="leading-snug">{activeTab.shortDesc}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                {activeTab.title}
              </h4>
            </div>

            <ul className="space-y-3.5 text-neutral-700 text-base">
              {activeTab.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{point}</span>
                </li>
              ))}
            </ul>

            {activeTab.note && (
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-xs sm:text-sm font-medium">
                💡 {activeTab.note}
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id={`consult-advantage-${activeTab.id}`}
                onClick={onOpenLineModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-bold shadow-xs transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                預約諮詢與了解詳情
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
