import "../style/skills.css";
import "flag-icons/css/flag-icons.min.css";

import { Jenkins } from "../svg/Jenkins";
import { Linux } from "../svg/Linux";
import { Git } from "../svg/Git";
import { Docker } from "../svg/Docker";
import { Aws } from "../svg/Aws";
import { Java } from "../svg/Java";
import { Python } from "../svg/Python";
import { JavaScript } from "../svg/JavaScript";
import { Cplusplus } from "../svg/Cplusplus";
import { Saas } from "../svg/Saas";
import { Html } from "../svg/Html";
import { Thymeleaf } from "../svg/Thymeleaf";
import { React as ReactIcon } from "../svg/React";
import { MongoDB } from "../svg/MongoDB";
import { MySQL } from "../svg/MySQL";
import { NodeJs } from "../svg/NodeJs";
import { Spring } from "../svg/Spring";

const SkillItem = ({ icon, name }) => {
  return (
    <div className="skill-item">
      <div className="skill-iconWrap">{icon}</div>
      <div className="skill-name">{name}</div>
    </div>
  );
};

const SkillRow = ({ category, items }) => {
  return (
    <tr>
      <td className="skill-category">{category}</td>
      <td className="skill-items">
        <div className="skill-itemsInner">
          {items.map((it) => (
            <SkillItem key={it.key ?? it.name} icon={it.icon} name={it.name} />
          ))}
        </div>
      </td>
    </tr>
  );
};

export function Skills() {
  const skillGroups = [
    {
      category: "Back",
      items: [
        { name: "Spring", icon: <Spring /> },
        { name: "Node.js", icon: <NodeJs /> },
        { name: "MySQL", icon: <MySQL /> },
        { name: "MongoDB", icon: <MongoDB /> },
      ],
    },
    {
      category: "Front",
      items: [
        { name: "React", icon: <ReactIcon /> },
        { name: "Thymeleaf", icon: <Thymeleaf /> },
        { name: "HTML", icon: <Html /> },
        { name: "Sass", icon: <Saas /> },
      ],
    },
    {
      category: "Programming Language",
      items: [
        { name: "Java", icon: <Java /> },
        { name: "Python", icon: <Python /> },
        { name: "JavaScript", icon: <JavaScript /> },
        { name: "C++", icon: <Cplusplus /> },
      ],
    },
    {
      category: "DevOps",
      items: [
        { name: "Git", icon: <Git /> },
        { name: "Linux", icon: <Linux /> },
        { name: "Docker", icon: <Docker /> },
        { name: "AWS", icon: <Aws /> },
        { name: "Jenkins", icon: <Jenkins /> },
      ],
    },
    {
      category: "Language",
      items: [
        { key: "kr", name: "Korean", icon: <span className="fi fi-kr" /> },
        { key: "gb", name: "English", icon: <span className="fi fi-gb" /> },
      ],
    },
  ];

  return (
    <div className="skill">
      <div className="skillHeader">
        <div className="skillTitle">Skills</div>
      </div>

      <section className="skill-main">
        <table className="skill-table">
          <tbody>
            {skillGroups.map((g) => (
              <SkillRow
                key={g.category}
                category={g.category}
                items={g.items}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
