import React, { Component } from "react";
import { Icon, Link as FabricLink } from "office-ui-fabric-react";
import { trackEvent } from "../../helpers";
import "./ActionBar.scss";

class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.outboundRepoClick = this.outboundRepoClick.bind(this);
    this.outboundDeployClick = this.outboundDeployClick.bind(this);
    this.openInVSCodeClick = this.openInVSCodeClick.bind(this);
  }

  outboundDeployClick(template) {
    let eventData = this.getDeployClickEventDataToLog(template);
    trackEvent("/sample/deploy/agree", eventData);
  }

  getDeployClickEventDataToLog(template) {
    return {
      template: template
    };
  }

  getDeployLink(template) {
    return (
      "https://portal.azure.com/#create/Microsoft.Template/uri/" +
      encodeURIComponent(template)
    );
  }

  outboundRepoClick(repository, template) {
    let eventData = this.getDeployClickEventDataToLog(repository, template);
    trackEvent("/sample/source", eventData);
  }

  getDeployClickEventDataToLog(repository, template) {
    return {
      repository: repository,
      template: template
    };
  }

  getOpenInVSCodeLink(repository) {
    return "vscode://vscode.git/clone?url=" + encodeURIComponent(repository);
  }

  openInVSCodeClick(repository) {
    let eventData = this.getOpenInVSCodeEventDataToLog(repository);
    trackEvent("/sample/openinvscode", eventData);
  }

  getOpenInVSCodeEventDataToLog(repository) {
    return {
      repository: repository
    };
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
            href={this.getDeployLink(template)}
            disabled={deployDisabled}
            target="_blank"
            onClick={() => this.outboundDeployClick(repository, template)}
          >
            <div className="action-link-wrapper">
              <Icon iconName="Deploy" className="fabric-icon-link" />
              <span className="action-link-text">Deploy</span>
            </div>
          </FabricLink>
        </div>
        <div className="action-item">
          <FabricLink
            href={this.getOpenInVSCodeLink(repository)}
            onClick={() => this.openInVSCodeClick(repository)}
          >
            <div className="action-link-wrapper">
              <Icon iconName="Edit" className="fabric-icon-link" />
              <span className="action-link-text">Edit in VS Code</span>
            </div>
          </FabricLink>
        </div>
        <div className="action-item">
          <FabricLink
            href={repository}
            target="_blank"
            onClick={() => this.outboundRepoClick(repository)}
          >
            <div className="action-link-wrapper">
              <Icon iconName="GitHub-12px" className="githubicon" />
              <span className="action-link-text">Open in Github</span>
            </div>
          </FabricLink>
        </div>
      </div>
    );
  }
}

export default ActionBar;
