import "../style/content.css";
import { Profile } from "./Profile";
import { Education } from "./Education";
import { WorkExperience } from "./WorkExperience";
import { ContactMe } from "./ContactMe";
import { Home } from "./Home";
import { useEffect, useMemo, useRef, useState } from "react";
import { Skills } from "./Skills";

export function Content() {
  const scrollerRef = useRef(null);

  // 섹션 refs
  const homeRef = useRef(null);
  const eduRef = useRef(null);
  const expRef = useRef(null);
  const skillRef = useRef(null);
  const contactRef = useRef(null);
  // const projRef = useRef(null);

  const sections = useMemo(
    () => [
      { key: "home", label: "Home", ref: homeRef },
      { key: "education", label: "Education", ref: eduRef },
      { key: "experience", label: "Experience", ref: expRef },
      { key: "skill", label: "Skills", ref: skillRef },
      { key: "contact", label: "Contact", ref: contactRef },
    ],
    [],
  );

  const [activeKey, setActiveKey] = useState("home");

  // 메뉴 클릭 → 해당 섹션으로 부드럽게 스크롤
  const scrollToSection = (key) => {
    const sec = sections.find((s) => s.key === key);
    if (!sec?.ref?.current) return;

    setActiveKey(sec.key);

    // mainWrapper(스크롤 컨테이너) 안에서 이동
    sec.ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const scrollTop = scroller.scrollTop;
      const containerHeight = scroller.clientHeight;
      const midPoint = scrollTop + containerHeight * 0.4;

      // ✅ 실제 section DOM들 전부 대상으로
      const nodes = scroller.querySelectorAll(".sectionBlock");

      let currentKey = null;

      nodes.forEach((el) => {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (midPoint >= top && midPoint < bottom) {
          // ✅ 여기서 experience로 묶임 (PersonalProject도 experience)
          currentKey = el.dataset.sectionKey;
        }
      });

      if (currentKey) {
        setActiveKey(currentKey);
      }
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 1번

    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="contentMain">
      <div className="leftContent">
        <Profile />
      </div>
      <div className="rightContent">
        <div className="contentHeader">
          {activeKey &&
            sections.map((s) => (
              <div
                key={s.key}
                className={`menuItem ${activeKey === s.key ? "active" : ""}`}
                onClick={() => scrollToSection(s.key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && scrollToSection(s.key)}
              >
                {s.label}
              </div>
            ))}
        </div>
        <div className="mainWrapper" ref={scrollerRef}>
          <section
            ref={homeRef}
            data-section-key="home"
            className="sectionBlock"
          >
            <Home />
          </section>
          <section
            ref={eduRef}
            data-section-key="education"
            className="sectionBlock"
          >
            <Education />
          </section>
          <section
            ref={expRef}
            data-section-key="experience"
            className="sectionBlock"
          >
            <WorkExperience />
          </section>
          {/*<section ref={projRef} data-section-key="experience" className="sectionBlock">*/}
          {/*    <PersonalProject />*/}
          {/*</section>*/}
          <section
            ref={skillRef}
            data-section-key="skill"
            className="sectionBlock"
          >
            <Skills />
          </section>
          <section
            ref={contactRef}
            data-section-key="contact"
            className="sectionBlock"
          >
            <ContactMe />
          </section>
        </div>
      </div>
    </div>
  );
}
