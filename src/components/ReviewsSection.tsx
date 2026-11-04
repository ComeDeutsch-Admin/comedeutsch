import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ReviewsSectionProps {
  onOpenLineModal?: () => void;
}

// ===== 要新增評價貼文，只要在這裡加一行 Instagram 貼文網址 =====
const IG_POST_URLS = [
  'https://www.instagram.com/p/DL9tdOfzESJ/',
  'https://www.instagram.com/p/DL-EUQOTOKr/',
];

// 要裁掉的底部高度（px）：愛心／留言列 + 「新增留言」列
// 還看得到殘影就加大；「到 Instagram 查看更多內容」被切到就調小
const FOOTER_CROP = 90;

// 蓋住「到 Instagram 查看更多內容」下方那條分隔線的白色遮罩高度（px）
// 還看得到線就加大；文字被蓋到就調小
const DIVIDER_MASK = 10;
// ================================================================

// 拿掉 Instagram 自帶的邊框、陰影、外距，外框改由 IgCard 自己畫
const buildEmbed = (url: string) =>
  `<blockquote class="instagram-media" data-instgrm-permalink="${url}?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:0; box-shadow:none; margin:0; max-width:100%; min-width:0; padding:0; width:100%;"></blockquote>`;

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

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

// 單張貼文卡片：memo 避免重新渲染時 Instagram 的 iframe 被重置
const IgCard = React.memo(({ html }: { html: string }) => (
  <div className="shrink-0 snap-start w-[calc(100vw-2rem)] sm:w-[380px]">
    {/* 自己畫的完整外框：四邊都有邊線＋圓角，看起來是一張完整的卡片 */}
    <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white">
      {/* 裁切容器：把 Instagram 底部的互動列藏起來 */}
      <div className="overflow-hidden">
        <div
          // 負的 margin 把 Instagram 內建的 1px 邊線推到外框外面，避免雙層邊線
          style={{
            marginTop: -1,
            marginLeft: -1,
            marginRight: -1,
            marginBottom: -FOOTER_CROP,
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {/* 白色遮罩：蓋住底部那條會讓左右邊框「斷掉」的分隔線 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-white"
        style={{ height: DIVIDER_MASK }}
      />
    </div>
  </div>
));

export const ReviewsSection: React.FC<ReviewsSectionProps> = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const posts = useMemo(() => IG_POST_URLS.map(buildEmbed), []);

  // 載入 Instagram embed.js 並處理貼文
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    let script = document.getElementById('instagram-embed-js') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'instagram-embed-js';
      script.async = true;
      script.src = 'https://www.instagram.com/embed.js';
      document.body.appendChild(script);
    }
    const onLoad = () => window.instgrm?.Embeds.process();
    script.addEventListener('load', onLoad);
    return () => script?.removeEventListener('load', onLoad);
  }, []);

  // 內容放不下（需要捲動）時才顯示箭頭
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const check = () => setCanScroll(el.scrollWidth > el.clientWidth + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
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
    const row = el.firstElementChild as HTMLElement | null;
    const first = row?.children[0] as HTMLElement | undefined;
    const second = row?.children[1] as HTMLElement | undefined;
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

        {/* 右上角：翻頁箭頭（只有需要捲動時才出現，但一直佔位避免版面跳動） */}
        <div className={`flex justify-end gap-3 mb-4 h-10 ${canScroll ? '' : 'invisible'}`}>
          <ArrowButton direction="prev" onClick={() => flip(-1)} />
          <ArrowButton direction="next" onClick={() => flip(1)} />
        </div>

        {/* 捲動軌道 */}
        <div
          ref={trackRef}
          className="overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* w-max mx-auto：放得下就置中，放不下就從左邊開始捲動 */}
          <div className="flex gap-4 sm:gap-8 w-max mx-auto">
            {posts.map((html, i) => (
              <IgCard key={IG_POST_URLS[i]} html={html} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
