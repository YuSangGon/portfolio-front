import "../style/Projects.css";
import { projectList } from "../data/ProjectList";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Projects() {
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const nearestIndex = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;

    const sRect = scroller.getBoundingClientRect();
    const sCenter = sRect.left + sRect.width / 2;

    let bestIdx = 0;
    let bestDist = Infinity;

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const dist = Math.abs(sCenter - c);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });

    return bestIdx;
  };

  // 카드 중앙 정렬 스크롤
  const scrollToIndex = (idx, behavior = "smooth") => {
    const scroller = scrollerRef.current;
    const el = cardRefs.current[idx];
    if (!scroller || !el) return;

    const sRect = scroller.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();

    const sCenter = sRect.left + sRect.width / 2;
    const eCenter = eRect.left + eRect.width / 2;

    const delta = eCenter - sCenter;

    scroller.scrollTo({
      left: scroller.scrollLeft + delta,
      behavior,
    });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setActiveIndex(nearestIndex());
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    const init = requestAnimationFrame(() => {
      setActiveIndex(0);
      scrollToIndex(0, "auto");
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(init);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, []);

  // 스크롤 중 중앙에 가장 가까운 카드를 active로
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let t = null;

    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const idx = nearestIndex();
        scrollToIndex(idx);
      }, 120);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, []);

  // useEffect(() => {
  //   const scroller = scrollerRef.current;
  //   if (!scroller) return;

  //   const onWheel = (e) => {
  //     // shift 없이도 자연스럽게 가로 이동
  //     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
  //       scroller.scrollLeft += e.deltaY;
  //       e.preventDefault();
  //     }
  //   };

  //   scroller.addEventListener("wheel", onWheel, { passive: false });
  //   return () => scroller.removeEventListener("wheel", onWheel);
  // }, []);

  // useEffect(() => {
  //     if (activeIndex >= filtered.length) setActiveIndex(0);
  //     // 토글 때 ref 배열도 초기화
  //     cardRefs.current = [];
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filtered.length]);

  return (
    <div className="project">
      <div className="projectHeader">
        <div className="projectTitle">Projects</div>
      </div>

      <section className="p2">
        <div className="p2Rail" ref={scrollerRef}>
          {projectList.map((project, idx) => (
            <button
              key={project.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={`p2Card ${idx === activeIndex ? "active" : ""}`}
              onClick={() => scrollToIndex(idx)}
              type="button"
            >
              <div className="p2Name">{project.name}</div>
              <div className="p2Kind">{project.kind}</div>

              <div className="p2Detail">
                <div className="p2Period">
                  <span>{project.startDate}</span>
                  <span>{project.endDate}</span>
                </div>

                <div className="p2Stack">
                  <div className="p2StackItem">
                    <strong>Front:</strong> {project.front}
                  </div>
                  <div className="p2StackItem">
                    <strong>Back:</strong> {project.back}
                  </div>
                </div>

                <div className="p2Des">
                  {project.description.map((desc, descIndex) => (
                    <div key={descIndex} className="p2DesItem">
                      {desc}
                    </div>
                  ))}
                </div>

                <div className="p2Actions">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p2ActionBtn p2ActionBtn--ghost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Code
                    </a>
                  ) : null}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p2ActionBtn p2ActionBtn--primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
