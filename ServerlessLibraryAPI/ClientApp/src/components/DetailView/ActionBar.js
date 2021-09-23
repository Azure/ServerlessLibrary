import React, { Component } from "react";
import { Icon, Link as FabricLink } from "office-ui-fabric-react";
import { trackEvent } from "../../helpers";
import { libraryService } from "../../services";
import "./ActionBar.scss";

class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.outboundRepoClick = this.outboundRepoClick.bind(this);
    this.outboundDeployClick = this.outboundDeployClick.bind(this);
    this.openInVSCodeClick = this.openInVSCodeClick.bind(this);
    this.trackUserActionEvent = this.trackUserActionEvent.bind(this);
  }

  outboundDeployClick() {
    this.updateDownloadCount(this.props.id);
    this.trackUserActionEvent("/sample/deploy/agree");
  }

  updateDownloadCount(id) {
    libraryService
      .updateDownloadCount(id)
      .then(() => {
        // do nothing
      })
      .catch(() => {
        // do nothing
      });
  }

  getDeployLink(template) {
    return (
      "https://portal.azure.com/#create/Microsoft.Template/uri/" +
      encodeURIComponent(template)
    );
  }

  outboundRepoClick() {
    this.trackUserActionEvent("/sample/source");
  }

  getOpenInVSCodeLink(repository) {
    return "vscode://vscode.git/clone?url=" + encodeURIComponent(repository);
  }

  getOpenInGithubDevLink(repository) {
    if(repository){
      return repository.replace("github\.com", "github\.dev");
    } else {
      return repository
    }
  }

  openInVSCodeClick() {
    this.updateDownloadCount(this.props.id);
    this.trackUserActionEvent("/sample/openinvscode");
  }

  openInGithubDevClick() {
    this.updateDownloadCount(this.props.id);
    this.trackUserActionEvent("/sample/openingithubdev");
  }

  trackUserActionEvent(eventName) {
    let eventData = {
      id: this.props.id,
      repository: this.props.repository,
      template: this.props.template
    };

    trackEvent(eventName, eventData);
  }

  render() {
    const { repository, template } = this.props;

    return (
      <div className="action-container">
        <div className="action-item">
          <FabricLink
            href={this.getOpenInVSCodeLink(repository)}
            disabled={!repository}
            onClick={this.openInVSCodeClick}
          >
            <div className="action-link-wrapper">
              <Icon iconName="Edit" className="fabric-icon-link" />
              <span className="action-link-text">Edit in VS Code</span>
            </div>
          </FabricLink>
        </div>
        <div className="action-item">
          <FabricLink
            href={this.getOpenInGithubDevLink(repository)}
            disabled={!repository}
            onClick={this.openInGithubDevClick}
          >
            <div className="action-link-wrapper">
              <Icon iconName="Edit" className="fabric-icon-link" />
              <span className="action-link-text">Edit in GitHub.dev</span>
            </div>
          </FabricLink>
        </div>
        <div className="action-item">
          <FabricLink
            href={this.getDeployLink(template)}
            disabled={!template}
            target="_blank"
            onClick={this.outboundDeployClick}
          >
            <div className="action-link-wrapper">
              <Icon iconName="Deploy" className="fabric-icon-link" />
              <span className="action-link-text">Deploy</span>
            </div>
          </FabricLink>
        </div>
        <div className="action-item">
          <FabricLink
            href={repository}
            disabled={!repository}
            target="_blank"
            onClick={this.outboundRepoClick}
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