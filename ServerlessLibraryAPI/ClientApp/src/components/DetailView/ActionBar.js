import React, { Component } from "react";
import { Icon, Link as FabricLink } from "office-ui-fabric-react";
import "./ActionBar.scss";
import { commonLinkStyles } from "../shared/Link.styles";

class ActionBar extends Component {
  getDeployLink(template) {
    return (
      "https://portal.azure.com/#create/Microsoft.Template/uri/" +
      encodeURIComponent(template)
    );
  }

  getOpenInVSCodeLink(repository) {
    return "vscode://vscode.git/clone?url=" + encodeURIComponent(repository);
  }

  render() {
    let { repository, template } = this.props;
    let deployDisabled = false;
    if (!template) {
      deployDisabled = true;
    }

    return (
      <div className="action-container">
        <div className="action-item">
          <FabricLink
            styles={commonLinkStyles}
            href={this.getDeployLink(template)}
            disabled={deployDisabled}
            target="_blank"
          >
            <div className="action-link-wrapper">
              <Icon iconName="Deploy" className="fabric-icon-link" />
              <span className="action-link-text">Deploy</span>
            </div>
          </FabricLink>
        </div>
        <div className="action-item">
          <FabricLink
            styles={commonLinkStyles}
            href={this.getOpenInVSCodeLink(repository)}
          >
            <div className="action-link-wrapper">
              <Icon iconName="Edit" className="fabric-icon-link" />
              <span className="action-link-text">Edit in VS Code</span>
            </div>
          </FabricLink>
        </div>
        <div className="action-item">
          <FabricLink
            styles={commonLinkStyles}
            href={repository}
            target="_blank"
          >
            <div className="action-link-wrapper">
              <Icon iconName="GitHub-12px" className="fabric-icon-link" />
              <span className="action-link-text">Open in Github</span>
            </div>
          </FabricLink>
        </div>
      </div>
    );
  }
}

export default ActionBar;
