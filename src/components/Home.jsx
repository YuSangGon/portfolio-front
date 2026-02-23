import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

export function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1 className="heroTitle">
          I'm <span className="signature heroName">Sanggon Yu</span>
          <br />
          <span className="javaAccent" style={{ paddingLeft: "10px" }}>
            Java
          </span>{" "}
          & <span className="javaAccent">Spring</span> web developer
          <br />
          with basic front-end skills
        </h1>
      </div>
      <div className="homeFooter">
        <button>
          <a
            href="https://drive.google.com/file/d/1bic7jCbxPGdfjo1c54AMCH49lTABdns_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Curriculum Vitae <FontAwesomeIcon icon={faAnglesRight} />
          </a>
        </button>
        <button>
          <a
            href="https://drive.google.com/file/d/1-l5-ZOR9UB7W2vuZ9CE97wt1pJ-6r_Rc/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cover Letter <FontAwesomeIcon icon={faAnglesRight} />
          </a>
        </button>
      </div>
      <div className="scrollDownIcon">
        <div className="scrollIndicator">
          <div className="scrollCircle">
            <svg viewBox="0 0 200 200" className="circleText">
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100
                                     m -75, 0
                                     a 75,75 0 1,1 150,0
                                     a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text>
                <textPath href="#circlePath">
                  If you'd like further information, please scroll down •
                </textPath>
              </text>
            </svg>

            <div className="scrollIcon">
              <div className="mouse">
                <div className="wheel"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
