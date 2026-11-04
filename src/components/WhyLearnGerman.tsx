import React from 'react';
import { Briefcase, GraduationCap, Cpu, Compass } from 'lucide-react';

export const WhyLearnGerman: React.FC = () => {
  const reasons = [
    {
      icon: <Briefcase className="w-6 h-6 text-neutral-900" />,
      title: '解鎖頂尖職涯',
      description:
        '德國為歐洲最大經濟體，許多知名跨國企業皆來自德語區。掌握德語能讓你在國際職場中脫穎而出，獲得更多高薪與海外工作機會。',
      stats: '歐洲第一大經濟體・高薪工作機會',
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-neutral-900" />,
      title: '享有優質教育',
      description:
        '德語區（德國、奧地利、瑞士）擁有世界頂尖的大學與研究機構，且許多公立大學提供免費或極低學費的高等教育，是留學的最佳選擇。',
      stats: '公立大學免學費・學術研究殿堂',
    },
    {
      icon: <Cpu className="w-6 h-6 text-neutral-900" />,
      title: '掌握前沿科技與學術',
      description:
        '德語是全球學術界與科技研發的重要語言之一。懂德語能讓你直接閱讀第一手文獻，站在創新與專業的最前端。',
      stats: '工藝與專利大國・學術一線第一手文獻',
    },
    {
      icon: <Compass className="w-6 h-6 text-neutral-900" />,
      title: '深度體驗歐洲文化',
      description:
        '從哲學、音樂到文學，德語區孕育了無數文化巨擘。學習德語能讓你不再只是旁觀者，而是能深度探索歐洲豐富的歷史與生活方式。',
      stats: '康德、歌德、貝多芬・深邃歐洲靈魂',
    },
  ];

  return (
    <section id="why-german" className="py-20 sm:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title matching Screenshot 4 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            id="why-learn-german-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight"
          >
            為什麼要學習德語？
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            德語不只是一門外語，更是通往歐洲頂尖學術、高階職涯與世界級工業的鑰匙。
          </p>
        </div>

        {/* 4 Reasons Grid matching Screenshot 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {reason.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-5 tracking-tight">
                  {reason.title}
                </h3>
                <p className="mt-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/70 flex items-center text-xs text-neutral-500 font-medium">
                <span>{reason.stats}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
