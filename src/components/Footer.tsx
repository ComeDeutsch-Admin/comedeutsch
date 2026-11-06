import React from 'react';
import { Instagram, Mail } from 'lucide-react';

interface FooterProps {
  onOpenLineModal?: () => void;
}

// 改成你真正的 Medium 專欄網址（要跟 MediumSection.tsx 的帳號一致）
const MEDIUM_URL = 'https://medium.com/@comedeutsch';

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer id="footer" className="bg-white border-t border-neutral-200 pt-14 pb-12 text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row matching Screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Left Column matching Screenshot 5 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src="logo.png" 
                alt="ComeDeutsch Logo" 
                className="w-5 h-5 object-contain shrink-0" 
              />
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-900 font-sans">
                康德德語 ComeDeutsch
              </h3>
            </div>
          </div>

          {/* Middle Column matching Screenshot 5 */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-sm font-bold text-neutral-900 mb-2">Email Us</h4>
            <div className="h-10 flex items-center">
              <span
                className="text-sm sm:text-base text-neutral-700 font-medium inline-flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-neutral-500" />
                comedeutsch@gmail.com
              </span>
            </div>
          </div>

          {/* Right Column matching Screenshot 5 */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-sm font-bold text-neutral-900 mb-2">Follow us</h4>
            <div className="flex items-center justify-center gap-3 h-10">
              <a
                href="https://www.instagram.com/comedeutsch?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-50 transition"
                aria-label="追蹤 Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={MEDIUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-50 transition"
                aria-label="閱讀 Medium 專欄"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright matching Screenshot 5 */}
        <div className="pt-8 border-t border-neutral-100 text-xs text-neutral-500">
          <p id="footer-copyright" className="text-center">
            © Copyright 2026 All rights Reserved.
            <br className="sm:hidden" />{' '}
            Designed by ComeDeutsch
          </p>
        </div>
      </div>
    </footer>
  );
};
