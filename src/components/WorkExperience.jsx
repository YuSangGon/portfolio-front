import "../style/workExperience.css";
import { workList } from "../data/WorkList";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Location } from "../svg/Location";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export function WorkExperience() {
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showWebOnly, setShowWebOnly] = useState(false);

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

  const filtered = useMemo(() => {
    return showWebOnly ? workList.filter((w) => w.isDev) : workList;
  }, [showWebOnly]);

  return (
    <div className="work">
      <div className="workHeader">
        <div className="workTitle">Work Experience</div>
      </div>
      <div className="toggleWrapper">
        <div className="workToggle">
          <span className={showWebOnly ? "" : "active"}>All</span>

          <label className="switch">
            <input
              type="checkbox"
              checked={showWebOnly}
              onChange={() => setShowWebOnly(!showWebOnly)}
            />
            <span className="slider"></span>
          </label>
          <span className={showWebOnly ? "active" : ""}>Web only</span>
        </div>
      </div>
      <section className="wx2">
        <div className="wx2Rail" ref={scrollerRef}>
          {filtered.map((w, idx) => (
            <button
              key={w.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`wx2Card ${idx === activeIndex ? "active" : ""}`}
              onClick={() => scrollToIndex(idx)}
              type="button"
            >
              <div className="wx2Company">{w.name}</div>
              <div className="wx2Role">{w.pos}</div>
              <div className="wx2Loc">
                <FontAwesomeIcon className="locIcon" icon={faLocationDot} />{" "}
                {w.loc}
              </div>
              <div className="wx2Detail">
                <div className="wx2Period">
                  <span>{w.startDate}</span>
                  <span>{w.endDate}</span>
                </div>
                <div className="wx2Des">
                  {w.description.map((d) => {
                    return <div className="wx2DesItem">{d}</div>;
                  })}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
