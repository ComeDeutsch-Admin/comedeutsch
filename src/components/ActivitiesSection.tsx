import React from 'react';
import { Calendar } from 'lucide-react';

export const ActivitiesSection: React.FC = () => {
  const activities = [
    {
      title: '德國留學申請完全攻略講座',
      date: '每雙月線上舉辦',
      tag: '線上講座',
      desc: '由留德學長姐與教務主任線上拆解最新德國大學申請流程、動機信撰寫。',
    },
    {
      title: '每週德語口語咖啡館 (Sprachcafé)',
      date: '每週五晚間 20:00 - 21:00',
      tag: '即時互動',
      desc: '德語外師引導自由主題口說聊天室，無壓力練習生活口語，認識志同道合的德語學伴。',
    },
    {
      title: '檢定衝刺全真模擬考與一對一口試',
      date: '考前一個月密集排程',
      tag: '檢定模考',
      desc: '1:1 還原歌德與德福考場流程，外師當場給予分項評分指標與關鍵失分點警示。',
    },
  ];

  return (
    <section id="activities" className="py-20 sm:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2
            id="activities-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight"
          >
            活動集錦
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((act, index) => (
            <div
              key={index}
              className="bg-[#faf9f6] rounded-2xl p-6 sm:p-7 border border-neutral-200/90 hover:border-neutral-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-neutral-900 text-white">
                    {act.tag}
                  </span>
                  <span className="text-xs font-medium text-neutral-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {act.date}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mt-2">
                  {act.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {act.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
