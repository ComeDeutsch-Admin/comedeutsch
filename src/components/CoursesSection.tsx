import React, { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { MessageCircle, RotateCw } from 'lucide-react';

const STUDY_HOURS: Record<string, string> = {
  A1: '96-120 小時',
  A2: '96-150 小時',
  B1: '144-200 小時',
  B2: '300-500 小時',
};

interface CoursesSectionProps {
  onSelectCourseForLine: (courseId: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourseForLine }) => {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="courses" className="py-20 sm:py-24 bg-[#fcfaf7] border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 4 */}
        <div className="mb-14">
          <h2
            id="courses-heading"
            className="text-[32px] leading-[32px] sm:text-[42px] sm:leading-[42px] md:text-[55px] md:leading-[55px] font-black text-neutral-950 tracking-tight"
          >
            程度介紹
          </h2>
        </div>

        {/* 4 Levels Grid matching Screenshot 4 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 perspective-1000">
          {COURSES_DATA.map((course) => {
            const isFlipped = flippedCards[course.id];
            const level = course.title.slice(0, 2).toUpperCase();
            const hours = STUDY_HOURS[level];
            
            return (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                className="relative w-full rounded-2xl cursor-pointer group [perspective:1000px]"
                onClick={() => toggleFlip(course.id)}
              >
                <div
                  className={`grid h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* Front Side */}
                  <div className="[grid-area:1/1] bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-neutral-300/80 flex flex-col justify-between hover:shadow-md transition-shadow duration-200 [backface-visibility:hidden]">
                    <div>
                      {/* Title & Tagline matching Screenshot 4 */}
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                          {course.title} <span className="font-normal text-neutral-400">|</span>{' '}
                          <span className="text-base sm:text-lg font-bold text-neutral-700">
                            {course.tagline}
                          </span>
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:text-neutral-600 transition-colors shrink-0">
                          <RotateCw className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Verbatim Description from Screenshot 4 */}
                      <p className="mt-5 text-[17px] sm:text-[18px] text-neutral-700 leading-relaxed font-sans">
                        {course.description}
                      </p>
                    </div>
                    <div className="mt-6">
                        {hours && (
                          <p className="mb-3 text-sm text-neutral-600">
                            <span className="font-bold text-neutral-900">學習時數：</span>
                            {hours}
                            <span className="text-neutral-400">（依個人學習進度調配）</span>
                          </p>
                        )}
                        <span className="text-[13px] font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full inline-block">點擊看課程細節</span>
                      </div>
                  </div>

                  {/* Back Side */}
                  <div className="[grid-area:1/1] bg-[#f4f4f4] text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-md border border-neutral-200 flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]">
                     <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                          課程重點
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-neutral-700 transition-colors shrink-0">
                          <RotateCw className="w-4 h-4" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <ul className="space-y-3">
                          {course.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700">
                              <span className="text-[#e63946] font-bold shrink-0 mt-0.5">•</span>
                              <span className="leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 pt-4 border-t border-neutral-300 flex flex-col gap-1.5">
                        <div className="text-xs text-neutral-500 flex items-center justify-between">
                          <span>適合對象：</span>
                          <span className="text-neutral-800">{course.targetAudience}</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom 1-on-1 and Fast-Track Banner */}
        <div className="mt-10 bg-[#ffeedb] border border-[#ffdbba] text-neutral-900 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#ffd599] text-neutral-950 text-xs font-extrabold mb-2">
              客製化專案
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              需要一對一家教、德檢衝刺、或留學面試輔導？
            </h3>
            <p className="text-sm text-neutral-700 mt-1 max-w-2xl">
              康德德語提供完全量身定制的一對一專屬家教方案，可自由指定上課時間、進度與師資。
            </p>
          </div>
          <button
            id="banner-line-consult-btn"
            onClick={() => onSelectCourseForLine('custom')}
            className="shrink-0 px-6 py-3 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm flex items-center gap-2 shadow-lg transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            LINE 我要諮詢！
          </button>
        </div>
      </div>
    </section>
  );
};
