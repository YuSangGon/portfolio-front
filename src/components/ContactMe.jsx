import "../style/contactMe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function ContactMe() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!email.trim() || !message.trim()) {
      alert("Please enter your email and message.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          title: title.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.ok) {
        alert("Message sent 🚀");
        // 폼 리셋
        setEmail("");
        setTitle("");
        setMessage("");
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      alert("Failed to send: " + (err?.message || String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      <div className="cHeader">
        <div className="cTitle">CONTACT ME</div>
      </div>
      <div className="cSubHeader">
        <div className="cSubTitle">
          Don't hesitate to contact me if you'd like further information!
        </div>
      </div>

      <div className="cBody">
        <div className="cLeft">
          <form className="contactForm" onSubmit={handleSubmit}>
            <div className="formRow">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="title"
              />
            </div>

            <div className="formRow">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="formRow">
              <textarea
                placeholder="Your message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="sendBtn">
              SUBMIT
            </button>
          </form>
        </div>

        <div className="cRight">
          <div className="statusBox">
            <div className="boxTitle">Current Status</div>
            <div className="statusLine">
              <span className="statusDot green"></span>
              Available for opportunities
            </div>
          </div>

          <div className="quickBox">
            <div className="boxTitle">Quick Contact</div>
            <div className="quickList">
              <div>📧 yusang5159@email.com</div>
              <div>📍 London, UK</div>
              <div>⏱ Usually reply within 24 hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
