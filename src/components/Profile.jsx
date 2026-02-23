import "../style/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faJava,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export function Profile() {
  const openGithub = () => {
    window.open("https://github.com/yusanggon", "blank");
  };

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/sanggon-yu-1811ba293", "blank");
  };
  return (
    <>
      <div className="meWrapper">
        <div className="meHeader">
          <div className="meName">
            <div className="nameLogo">
              <FontAwesomeIcon icon={faJava} />
            </div>
            <div className="nameText">
              SANGGON
              <br />
              YU
            </div>
          </div>
          <div className="meImg">
            <img id="mePhoto" src="/img/myAiPhoto.png" alt="profile" />
          </div>
        </div>
        <div className="meMain">
          <div className="mePosition">
            <span className="subTitle">Position: </span>
            <br />
            <span className="mainPos">WEB DEVELOPER</span>
          </div>
          <div className="meLocation">
            <span className="subTitle">Staying in: </span>
            <br />
            <span className="mainLoc">London, United Kingdom</span>
          </div>
        </div>
        <div className="meFooter">
          <div className="meFIcon">
            <FontAwesomeIcon icon={faGithub} onClick={openGithub} />
          </div>
          <div className="meFIcon">
            <FontAwesomeIcon icon={faLinkedin} onClick={openLinkedIn} />
          </div>
        </div>
      </div>
    </>
  );
}
