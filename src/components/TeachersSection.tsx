import React from 'react';
import { TEACHERS_DATA } from '../data/teachersData';
import { CheckCircle2 } from 'lucide-react';

interface TeachersSectionProps {
  onOpenLineModal: () => void;
}

const GROUPS = ['臺籍教師', '德籍教師'];

export const TeachersSection: React.FC<TeachersSectionProps> = () => {
  return (
    <section id="teachers" className="py-20 sm:py-24 bg-[#faf9f6] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2
            id="teachers-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight"
          >
            專業師資陣容
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            嚴選具備德國教學認證 (DaF) 與頂尖學歷名師，融合母語自然語感與台灣學生痛點教學。
          </p>
        </div>

        {GROUPS.map((group) => {
          const teachers = TEACHERS_DATA.filter((t) => t.group === group);
          if (teachers.length === 0) return null;

          return (
            <div key={group} className="mb-12 last:mb-0">
              <h3 className="text-2xl font-extrabold text-neutral-900 mb-6 pl-3 border-l-4 border-[#e63946]">
                {group}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teachers.map((teacher) => (
                  <div
                    key={teacher.name}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0 bg-neutral-100 border border-neutral-200">
                        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-neutral-400 text-center px-1">
                          {teacher.avatarText}
                        </span>
                        <img
                          src={teacher.avatarUrl}
                          alt={teacher.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="relative w-full h-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-neutral-900">{teacher.name}</h4>
                        <p className="text-xs font-semibold text-neutral-500 mt-0.5">
                          {teacher.title}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-neutral-600">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        資歷認證
                      </span>
                      {teacher.credentials.map((cred, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{cred}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-5 border-t border-neutral-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                        教學風格
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                        {teacher.teachingStyle.map((style, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#e63946] font-bold shrink-0">•</span>
                            <span className="leading-relaxed">{style}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
