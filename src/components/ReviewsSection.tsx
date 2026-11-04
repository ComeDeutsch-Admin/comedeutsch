import React, { useEffect, useRef, useState } from 'react';

interface ReviewsSectionProps {
  onOpenLineModal?: () => void;
}

// ⬇️ 這裡原本的 IG_POSTS 陣列原樣保留 ⬇️
const IG_POSTS: string[] = [
  /* ...你原本的兩則 Instagram embed HTML... */
];

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

// ===== 可調整 =====
// 要裁掉的底部高度（px）：愛心／留言列 + 「新增留言」列。
// 如果還看得到一點點殘影就加大；如果「到 Instagram 查看更多內容」被切到就調小。
const FOOTER_CROP = 84;
// ==================

const ArrowButton: React.FC<{
  direction: 'prev' | 'next';
  onClick: () => void;
}> = ({ direction, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === 'prev' ? '上一篇' : '下一篇'}
    className="w-10 h-10 rounded-full border border-neutral-300 text-neutral-950 flex items-center justify-center transition-colors hover:bg-neutral-950 hover:text-white hover:border-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === 'prev' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  </button>
);

export const ReviewsSection: React.FC<ReviewsSectionProps> = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  // 載入 / 重新處理 Instagram embed
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//www.instagram.com/embed.js';
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  // 內容放不下（需要捲動）時才顯示箭頭
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const check = () => setCanScroll(el.scrollWidth > el.clientWidth + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener('resize', check);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', check);
    };
  }, []);

  // 每按一次翻一張；到最後一張再按「下一篇」回到第一張，反之亦然
  const flip = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    const step =
      first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;

    let target = el.scrollLeft + dir * step;
    if (dir === 1 && el.scrollLeft >= max - 4) target = 0;
    else if (dir === -1 && el.scrollLeft <= 4) target = max;

    el.scrollTo({ left: Math.max(0, Math.min(max, target)), behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2
            id="reviews-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight"
          >
            來看看學員評價！
          </h2>
        </div>

        {/* 右上角：翻頁箭頭（只有需要捲動時才出現） */}
        <div className={`flex justify-end gap-3 mb-4 h-10 ${canScroll ? '' : 'invisible'}`}>
          <ArrowButton direction="prev" onClick={() => flip(-1)} />
          <ArrowButton direction="next" onClick={() => flip(1)} />
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {IG_POSTS.map((htmlString, index) => (
            // first:ml-auto / last:mr-auto：放得下時自動置中，放不下時正常捲動
            <div
              key={index}
              className="shrink-0 snap-start w-[92%] sm:w-[380px] first:ml-auto last:mr-auto"
            >
              {/* 裁切容器：把 Instagram 底部的互動列藏起來 */}
              <div className="overflow-hidden border-b border-neutral-200">
                <div
                  style={{ marginBottom: -FOOTER_CROP }}
                  dangerouslySetInnerHTML={{ __html: htmlString }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
