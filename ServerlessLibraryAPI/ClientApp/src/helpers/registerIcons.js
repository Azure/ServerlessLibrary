import React from "react";
import { registerIcons } from "office-ui-fabric-react";
import "./registerIcons.scss";
import { ReactComponent as GithubIconSvg } from "../assets/github.svg";

export default function registerCustomIcons() {
  registerIcons({
    icons: {
      "GitHub-12px": <GithubIconSvg className="icon-12px" />,
      "GitHub-17px": <GithubIconSvg className="icon-17px" />
    }
  });
}
