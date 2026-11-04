import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyLearnGerman } from './components/WhyLearnGerman';
import { CoursesSection } from './components/CoursesSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { MediumSection } from './components/MediumSection';
import { TeachersSection } from './components/TeachersSection';
import { HonorsSection } from './components/HonorsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { RulesSection } from './components/RulesSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

const SHOW_ACTIVITIES = false; // 之後要顯示活動集錦,改成 true 即可

export default function App() {  
  const handleOpenLineModal = (courseId: string = 'a1') => {
    window.open('https://lin.ee/nPiDcoo', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-900 font-sans selection:bg-[#fcd34d] selection:text-black">
      {/* Navigation Bar */}
      <Navbar onOpenLineModal={() => handleOpenLineModal('a1')} />

      {/* Main Content */}
      <main>
        {/* 1. 首頁 Hero */}
        <HeroSection onOpenLineModal={() => handleOpenLineModal('a1')} />

        {/* 2. 為什麼要學習德語？ */}
        <WhyLearnGerman />

        {/* 3. 在康德德語的學習優勢 */}
        <AdvantagesSection onOpenLineModal={() => handleOpenLineModal('a1')} />

        {/* 4. 程度介紹 */}
        <CoursesSection onSelectCourseForLine={(courseId) => handleOpenLineModal(courseId)} />

        {/* 5. 師資介紹 */}
        <TeachersSection onOpenLineModal={() => handleOpenLineModal('a1')} />

        {/* 6. 學員好評 */}
        <ReviewsSection onOpenLineModal={() => handleOpenLineModal('a1')} />

        {/* 7. 榮譽榜 */}
        <HonorsSection />
        
        {/* 8. Medium專欄 */}
        <MediumSection />

        {/* 9. 活動集錦 */}
        {SHOW_ACTIVITIES && <ActivitiesSection />}

        {/* 10. 上課規定 */}
        <RulesSection />

        {/* 11. 常見問題 */}
        <FaqSection onOpenLineModal={() => handleOpenLineModal('a1')} />
      </main>

      {/* Footer */}
      <Footer onOpenLineModal={() => handleOpenLineModal('a1')} />
    </div>
  );
}
