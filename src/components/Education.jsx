import "../style/education.css";
import { curriculumTimeLine } from "../data/CurriculumList";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const pathD =
  "M 0 20 H 270 A 10 10 0 0 1 280 30 V 70 A 10 10 0 0 1 270 80 H 20 A 10 10 0 0 0 10 90 V 130 A 10 10 0 0 0 20 140 H 289";

export function Education() {
  const svgRef = useRef(null);

  const [activeTerm, setActiveTerm] = useState(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const openFromDot = (term, e) => {
    // 클릭한 "점"의 화면 좌표
    const target = e.currentTarget; // circle
    const r = target.getBoundingClientRect();

    // 점의 중앙 좌표(뷰포트 기준)
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;

    setOrigin({ x, y });
    setActiveTerm(term);
  };

  return (
    <div className="edu">
      <div className="eduHeader">
        <div className="eduTitle">Education</div>
      </div>

      <div className="eduWrapper">
        <div className="eduMain">
          <div className="school">Handong Global University</div>
          <div className="degree">
            Bachelor of Computer Science
            <br />
            <span className="eduPeriod">Mar 2017 - Aug 2023</span>
          </div>

          <div className="timeLineCard">
            <svg
              ref={svgRef}
              viewBox="0 0 300 200"
              className="timeLineSvg"
              role="img"
              aria-label="Education timeLine"
            >
              <path d={pathD} className="timeLinePath" />

              {curriculumTimeLine.map((c) => (
                <g
                  key={c.id}
                  style={{ cursor: "pointer" }}
                  className={`circle-wrapper ${c.id === activeTerm?.id ? "active" : ""}`}
                >
                  <circle cx={c.x} cy={c.y} r={10} className="edu-pulse" />
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={5}
                    className="edu-dot"
                    onClick={(e) => openFromDot(c, e)}
                  />
                  <text
                    x={c.x}
                    y={c.y + 20}
                    textAnchor="middle"
                    className="eduLabel"
                  >
                    {c.term}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* ✅ Dot-origin modal */}
      <Dialog.Root
        open={Boolean(activeTerm)}
        onOpenChange={(open) => {
          if (!open) setActiveTerm(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="eduOverlay" />

          <Dialog.Content
            className="eduModal"
            style={{
              // 모달이 "점"에서 튀어나오는 기준점
              "--ox": `${origin.x}px`,
              "--oy": `${origin.y}px`,
            }}
          >
            <div className="eduModalHeader">
              <div>
                <Dialog.Title className="eduModalTitle">
                  {activeTerm?.term}
                </Dialog.Title>
                <Dialog.Description className="eduModalDesc">
                  {activeTerm?.summary}
                </Dialog.Description>
              </div>

              <Dialog.Close className="eduModalClose" aria-label="Close">
                ✕
              </Dialog.Close>
            </div>

            <div className="eduModalBody">
              <ul className="edu-list">
                {activeTerm?.courses?.map((course, i) => (
                  <li key={i} className="edu-item">
                    <div className="edu-itemTitle">{course.name}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
