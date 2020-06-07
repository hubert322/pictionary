import React from "react";
import { IconContext } from "react-icons";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <p className="FooterText">
        Created by{" "}
        <a
          className="FooterLink"
          href="https://huberthung.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubert Hung
        </a>
      </p>
      <a
        className="FooterLink"
        href="https://github.com/hubert322/pictionary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconContext.Provider value={{ size: "2.2rem" }}>
          <FaGithub />
        </IconContext.Provider>
      </a>
    </div>
  );
}

export default Footer;
