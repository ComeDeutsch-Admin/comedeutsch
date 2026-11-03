import React, { useEffect, useRef, useState } from 'react';
import { Award, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

const honorsList = [
  {
    student: 'N 同學',
    achievement: 'Goethe-Zertifikat A2 一次高分通過',
    goal: '三個月從零開始快速通過',
  },
  {
    student: 'A 同學',
    achievement: 'Goethe-Zertifikat A1、A2 一次高分通過',
    goal: '遠赴德國參加語言班',
  },
  {
    student: 'L 同學',
    achievement: 'Goethe-Zertifikat A1、A2 一次高分通過',
    goal: '前往德國慕尼黑近郊擔任互惠生 (Aupair)',
  },
  {
    student: 'S 同學',
    achievement: 'Goethe-Zertifikat A2 一次高分通過',
    goal: '申請德國音樂院碩士',
  },
  {
    student: 'Z 同學',
    achievement: 'Goethe-Zertifikat A2 一次高分通過',
    goal: '申請德國音樂院碩士',
  },
  {
    student: 'M 同學',
    achievement: 'Goethe-Zertifikat A2 一次高分通過',
    goal: '申請德國音樂院碩士',
  },
  {
    student: 'W 同學',
    achievement: 'Goethe-Zertifikat B1 高分',
    goal: '前往瑞士音樂院進修',
  },
  {
    student: 'S 同學',
    achievement: 'Goethe-Zertifikat A2 一次高分通過、B1 高分',
    goal: '一年達標B1｜前往德國音樂院就讀最高演奏文憑',
  },
  {
    student: 'N 同學',
    achievement: '高分通過奧地利 B2 同等考試',
    goal: '高分 sehr gut｜留奧地利音樂院碩士',
  },
  {
    student: 'C 同學',
    achievement: 'Goethe-Zertifikat B1 高分',
    goal: '準備德國職業培訓 (Ausbildung) 申請資格',
  },
  {
    student: 'Y 同學',
    achievement: 'Goethe-Zertifikat B2 高分',
    goal: '一個月從 A2 達標 B2｜申請德國音樂院學士',
  },
  {
    student: 'O 同學',
    achievement: 'Goethe-Zertifikat B1 高分通過',
    goal: '遠赴德國參加語言班',
  },
];

const GAP = 24; // 卡片間距(對應 gap-6 = 24px)

export const HonorsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + GAP : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="honors" className="py-20 sm:py-24 bg-[#fff0f0] text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffcdcd] text-[#7a1c1c] text-xs font-bold mb-3">
              <Trophy className="w-3.5 h-3.5" />
              檢定考照與名校金榜
            </div>
            <h2
              id="honors-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
            >
              榮譽榜・成就不凡的德語實力
            </h2>
          </div>
          <p className="text-sm text-neutral-700 max-w-md">
            我們以學員的具體成果為傲。每年輔導數十位同學克服檢定瓶頸，如願踏上德國求學與職場新旅程。
          </p>
        </div>

        {/* 左右切換按鈕 */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            aria-label="上一張"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            className="w-10 h-10 rounded-full bg-white border border-[#ffcdcd] flex items-center justify-center text-neutral-700 hover:bg-[#fff8f8] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="下一張"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            className="w-10 h-10 rounded-full bg-white border border-[#ffcdcd] flex items-center justify-center text-neutral-700 hover:bg-[#fff8f8] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 可左右滑動的卡片列 */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 -mx-1 scroll-pl-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {honorsList.map((honor, idx) => (
            <div
              key={idx}
              data-card
              className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white border border-[#fce9e9] rounded-2xl p-5 sm:p-6 hover:border-[#ffcdcd] shadow-xs hover:shadow-sm transition flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-base text-neutral-900">{honor.student}</h4>
                <Award className="w-5 h-5 text-[#e63946]" />
              </div>
              <div className="p-2.5 rounded-lg bg-[#fff8f8] border border-[#ffcdcd] text-xs font-bold text-[#b51722] leading-snug">
                {honor.achievement}
              </div>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                🎯 {honor.goal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
