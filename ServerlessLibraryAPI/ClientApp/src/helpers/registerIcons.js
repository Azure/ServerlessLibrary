import React from "react";
import { registerIcons } from "office-ui-fabric-react";
import "./registerIcons.scss";
import { ReactComponent as GithubIconSvg } from "../assets/github.svg";
import { ReactComponent as ContributionSvg } from "../assets/contribution.svg";

export default function registerCustomIcons() {
  registerIcons({
    icons: {
      "GitHub-12px": <GithubIconSvg className="icon-12px" />,
      "GitHub-16px": <GithubIconSvg className="icon-16px" />,
      "contribution-svg": <ContributionSvg className="icon-16px" />
    }
  });
}
