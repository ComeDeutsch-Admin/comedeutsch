import React, { useEffect, useState } from 'react';

// ===== 只需要改這裡 =====
const MEDIUM_USERNAME = 'ComeDeutsch'; // 不用加 @，例如 comedeutsch
const MAX_POSTS = 3; // 最多顯示幾篇
const PROFILE_NAME = 'comedeutsch'; // 卡片左上角顯示的名稱
const PROFILE_AVATAR = '/logo.png'; // 頭像圖片路徑，換成你網站上的 logo
// ========================

const MEDIUM_PROFILE_URL = `https://medium.com/@${MEDIUM_USERNAME}`;
// 如果你的 Medium 是 publication（不是個人帳號），改成 `https://medium.com/feed/publication-name`
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;

interface MediumPost {
  title: string;
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

const parseItem = (item: Rss2JsonItem): MediumPost => {
  const html = item.content || item.description || '';
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // 封面圖：優先用 thumbnail，沒有就抓文章內第一張圖
  const image = item.thumbnail || doc.querySelector('img')?.getAttribute('src') || null;

  // 摘要：取第一段文字，最多 90 字
  const text = (doc.querySelector('p')?.textContent || doc.body.textContent || '').trim();
  const excerpt = text.length > 90 ? `${text.slice(0, 90)}…` : text;

  return {
    title: item.title,
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
  <article className="w-full max-w-[380px] bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col">
    {/* 頂部：頭像 + 名稱（類似 IG 貼文的 header） */}
    <div className="flex items-center gap-3 px-4 py-3">
      <img
        src={PROFILE_AVATAR}
        alt=""
        className="w-10 h-10 rounded-full object-cover border border-neutral-200"
      />
      <div className="leading-tight">
        <p className="text-sm font-semibold text-neutral-950">{PROFILE_NAME}</p>
        <p className="text-xs text-neutral-500">{post.date}</p>
      </div>
    </div>

    {/* 封面圖 */}
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

    {/* 標題 + 摘要 */}
    <div className="px-4 pt-4 pb-3 flex-1">
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
      {post.excerpt && (
        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{post.excerpt}</p>
      )}
    </div>

    {/* 底部連結 */}
    <div className="border-t border-neutral-200 px-4 py-3">
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        到 Medium 閱讀全文
      </a>
    </div>
  </article>
);

const SkeletonCard: React.FC = () => (
  <div className="w-full max-w-[380px] bg-white border border-neutral-200 rounded-sm overflow-hidden animate-pulse">
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-10 h-10 rounded-full bg-neutral-100" />
      <div className="space-y-2">
        <div className="h-3 w-24 bg-neutral-100 rounded" />
        <div className="h-3 w-16 bg-neutral-100 rounded" />
      </div>
    </div>
    <div className="aspect-[4/3] bg-neutral-100" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-3/4 bg-neutral-100 rounded" />
      <div className="h-3 w-full bg-neutral-100 rounded" />
      <div className="h-3 w-2/3 bg-neutral-100 rounded" />
    </div>
  </div>
);

export const MediumSection: React.FC = () => {
  const [posts, setPosts] = useState<MediumPost[] | null>(null);
  const [failed, setFailed] = useState(false);

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

  return (
    <section
      id="articles"
      aria-labelledby="articles-heading"
      className="py-20 sm:py-24 bg-white border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2
            id="articles-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight"
          >
            德語學習文章
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {posts === null && !failed &&
            Array.from({ length: MAX_POSTS }).map((_, i) => <SkeletonCard key={i} />)}

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

        {posts && posts.length > 0 && (
          <p className="mt-10 text-center">
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              到 Medium 查看更多文章
            </a>
          </p>
        )}
      </div>
    </section>
  );
};
