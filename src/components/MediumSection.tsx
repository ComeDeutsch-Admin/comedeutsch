import React, { useEffect, useRef, useState } from 'react';

// ===== 只需要改這裡 =====
const MEDIUM_USERNAME = 'ComeDeutsch'; // 不用加 @，例如 comedeutsch
const MAX_POSTS = 9; // 最多載入幾篇（rss2json 免費版最多 10 篇）
// ========================

const MEDIUM_PROFILE_URL = `https://medium.com/@${MEDIUM_USERNAME}`;
// 如果你的 Medium 是 publication（不是個人帳號），改成 `https://medium.com/feed/publication-name`
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;

// 卡片寬度：手機 1 張（露出下一張一點點）、平板 2 張、桌機 3 張
const CARD_WIDTH =
  'shrink-0 snap-start w-[85%] sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]';
const GAP_PX = 32; // 對應 gap-8

interface MediumPost {
  title: string;
  subtitle: string;
  link: string;
  date: string;
  image: string | null;
  excerpt: string;
}

interface Rss2JsonItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  description?: string;
  content?: string;
}

// Medium 頁面會把「外文標題」和「中文副標」分成兩行；RSS 只給一整串，
// 所以這裡在第一個「空白＋中文」的地方切開（標題開頭就是中文則不切）
const splitTitle = (raw: string): { title: string; subtitle: string } => {
  const t = raw.trim();
  const m = t.match(/^(.*?\S)\s+([\u3400-\u9fff\uff00-\uffef].*)$/);
  if (m && !/[\u3400-\u9fff]/.test(m[1])) return { title: m[1], subtitle: m[2] };
  return { title: t, subtitle: '' };
};

const parseItem = (item: Rss2JsonItem): MediumPost => {
  const html = item.content || item.description || '';
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // 封面圖：優先用 thumbnail，沒有就抓文章內第一張圖
  const image = item.thumbnail || doc.querySelector('img')?.getAttribute('src') || null;

  // 摘要：跳過「親愛的德語玩家：」這類太短或以冒號結尾的開場白，取第一段正式內容
  const paragraphs = Array.from(doc.querySelectorAll('p'))
    .map((p) => (p.textContent || '').trim())
    .filter(Boolean);
  const text =
    paragraphs.find((t) => t.length >= 20 && !/[:：]$/.test(t)) ||
    paragraphs[0] ||
    (doc.body.textContent || '').trim();
  const excerpt = text.length > 100 ? `${text.slice(0, 100)}…` : text;

  const { title, subtitle } = splitTitle(item.title);

  return {
    title,
    subtitle,
    link: item.link.split('?')[0], // 去掉 ?source=rss 追蹤參數
    date: new Date(item.pubDate.replace(' ', 'T') + 'Z').toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image,
    excerpt,
  };
};

const PostCard: React.FC<{ post: MediumPost }> = ({ post }) => (
  <article
    className={`${CARD_WIDTH} bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col`}
  >
    {/* 封面圖（整張可點） */}
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block aspect-[4/3] bg-neutral-100 overflow-hidden"
      tabIndex={-1}
      aria-hidden="true"
    >
      {post.image && (
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      )}
    </a>

    {/* 日期 + 標題 + 摘要 */}
    <div className="px-4 pt-4 pb-5 flex-1">
      <p className="text-xs text-neutral-500 mb-2">{post.date}</p>
      <h3 className="text-lg font-bold text-neutral-950 leading-snug">
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline focus-visible:underline"
        >
          {post.title}
        </a>
      </h3>
      {post.subtitle && (
        <p className="mt-1 text-lg italic text-neutral-800 leading-snug">{post.subtitle}</p>
      )}
      {post.excerpt && (
        <p className="mt-2 text-sm italic text-neutral-500 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      )}
    </div>
  </article>
);

const SkeletonCard: React.FC = () => (
  <div
    className={`${CARD_WIDTH} bg-white border border-neutral-200 rounded-sm overflow-hidden animate-pulse`}
  >
    <div className="aspect-[4/3] bg-neutral-100" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-20 bg-neutral-100 rounded" />
      <div className="h-4 w-3/4 bg-neutral-100 rounded" />
      <div className="h-3 w-full bg-neutral-100 rounded" />
      <div className="h-3 w-2/3 bg-neutral-100 rounded" />
    </div>
  </div>
);

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
      {direction === 'prev' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  </button>
);

export const MediumSection: React.FC = () => {
  const [posts, setPosts] = useState<MediumPost[] | null>(null);
  const [failed, setFailed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error('feed error');
        setPosts((data.items as Rss2JsonItem[]).slice(0, MAX_POSTS).map(parseItem));
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // 每按一次翻一張卡片；到最後一張再按「下一篇」會回到第一張，反之亦然
  const flip = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + GAP_PX : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;

    let target = el.scrollLeft + dir * step;
    if (dir === 1 && el.scrollLeft >= max - 4) target = 0;
    else if (dir === -1 && el.scrollLeft <= 4) target = max;

    el.scrollTo({ left: Math.max(0, Math.min(max, target)), behavior: 'smooth' });
  };

  return (
    <section
      id="articles"
      aria-labelledby="articles-heading"
      className="py-20 sm:py-24 bg-white border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2
            id="articles-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight"
          >
            ComeDeutsch專欄
          </h2>
        </div>

        {/* 右上角：翻頁箭頭 */}
        {!failed && (
          <div className="flex justify-end gap-3 mb-4">
            <ArrowButton direction="prev" onClick={() => flip(-1)} />
            <ArrowButton direction="next" onClick={() => flip(1)} />
          </div>
        )}

        <div
          ref={trackRef}
          className="flex gap-8 overflow-x-auto snap-x [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {posts === null && !failed &&
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

          {posts?.map((post) => <PostCard key={post.link} post={post} />)}
        </div>

        {/* 載入失敗時的備案：至少讓訪客能點到 Medium */}
        {failed && (
          <p className="text-center text-neutral-600">
            文章暫時無法載入，
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              直接到 Medium 閱讀
            </a>
          </p>
        )}
      </div>
    </section>
  );
};
