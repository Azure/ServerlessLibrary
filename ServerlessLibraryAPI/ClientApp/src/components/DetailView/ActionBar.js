import React, { Component } from "react";
import {
  Icon,
  DefaultButton,
  PrimaryButton,
  Link as FabricLink
} from "office-ui-fabric-react";
import { registerIcons } from "office-ui-fabric-react";
import { ReactComponent as GithubIconSvg } from "../../assets/github.svg";
import * as commonStyles from "../shared/Button.styles";
import "./ActionBar.scss";

registerIcons({
  icons: {
    "github-svg": <GithubIconSvg className="svg" />
  }
});
class ActionBar extends Component {
  constructor(props) {
    super(props);

    this.onVSCodeClick = this.onVSCodeClick.bind(this);
    this.onDeployClick = this.onDeployClick.bind(this);
  }

  onDeployClick() {
    let { template } = this.props;
    var url =
      "https://portal.azure.com/#create/Microsoft.Template/uri/" +
      encodeURIComponent(template);
    console.log("handleDeployClick" + template);
    window.open(url);
  }

  onVSCodeClick() {
    let { repository } = this.props;
    var url = "vscode://vscode.git/clone?url=" + encodeURIComponent(repository);
    window.open(url);
  }

  render() {
    let { repository } = this.props;

    return (
      <div className="action-container">
        <div className="action-item">
          <PrimaryButton
            styles={commonStyles.buttonStyles}
            text="Deploy"
            onClick={this.onDeployClick}
          />
        </div>

        <div className="action-item">
          <DefaultButton
            styles={commonStyles.secondaryButtonStyles}
            text="Open in vscode"
            onClick={this.onVSCodeClick}
          />
        </div>
        <div className="action-item">
          <FabricLink href={repository}>
            <div className="open-in-github-link">
              <Icon iconName="github-svg" className="githubicon" />
              <span className="open-in-github-link-text">Open in Github</span>
            </div>
          </FabricLink>
        </div>
      </div>
    );
  }
}

export default ActionBar;
