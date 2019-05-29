import React, { Component } from "react";
import ReactMarkdown from "markdown-to-jsx";
import {
  Pivot,
  PivotItem,
  PivotLinkSize,
  ScrollablePane
} from "office-ui-fabric-react/lib/index";
import { githubService } from "../../services";
import "./DetailPageContent.scss";

const defaultLicenseText =
  "Each application is licensed to you by its owner (which may or may not be Microsoft) under the agreement which accompanies the application. Microsoft is not responsible for any non-Microsoft code and does not screen for security, compatibility, or performance. The applications are not supported by any Microsoft support program or service. The applications are provided AS IS without warranty of any kind.";

class DetailPageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      armTemplateText: "",
      markdownText: "",
      licenseText: "",
      selectedKey: "overview"
    };

    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  // This method is used to fetch readme content from repo when valid repository url is received as props
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.repository !== prevProps.repository &&
      prevState.markdownText === ""
    ) {
      let { repository } = this.props;
      githubService
        .getReadMe(repository)
        .then(data => {
          var r = new RegExp(
            "https?://Azuredeploy.net/deploybutton.(png|svg)",
            "ig"
          );
          data = data.replace(r, "");
          this.setState({ markdownText: data });
        })
        .catch(() => {
          // do nothing
        });
    }
  }

  handleLinkClick(pivotItem, ev) {
    const selectedKey = pivotItem.props.itemKey;
    this.setState({ selectedKey });
    if (selectedKey === "armtemplate" && this.state.armTemplateText === "") {
      const { template } = this.props;
      if (template) {
        githubService
          .getArmTemplate(template)
          .then(data =>
            this.setState({
              armTemplateText: data
            })
          )
          .catch(() => {
            // do nothing
          });
      }
    }
    if (selectedKey === "license" && this.state.licenseText === "") {
      const { license, repository } = this.props;
      githubService
        .getLicense(license, repository)
        .then(data =>
          this.setState({
            licenseText: data
          })
        )
        .catch(() => {
          // do nothing
        });
    }
  }

  render() {
    const pivotStyles = {
      root: {
        paddingLeft: "15px"
      },
      text: {
        color: " #0058AD",
        fontSize: "14px"
      }
    };

    const {
      selectedKey,
      markdownText,
      licenseText,
      armTemplateText
    } = this.state;
    return (
      <div className="detail-page-content">
        <Pivot
          styles={pivotStyles}
          selectedKey={selectedKey}
          linkSize={PivotLinkSize.large}
          onLinkClick={(item, ev) => this.handleLinkClick(item, ev)}
        >
          <PivotItem headerText="Overview" itemKey="overview">
            <div className="pivot-item-container">
              <div className="scrollablePane-wrapper">
                <ScrollablePane>
                  <ReactMarkdown>{markdownText}</ReactMarkdown>
                </ScrollablePane>
              </div>
            </div>
          </PivotItem>
          <PivotItem headerText="License" itemKey="license">
            <div className="pivot-item-container">
              <div className="scrollablePane-wrapper">
                <ScrollablePane>
                  <div className="license-content">
                    <p>{defaultLicenseText}</p>
                    {licenseText !== "" && (
                      <p style={{ borderTop: "2px outset" }}>{licenseText}</p>
                    )}
                  </div>
                </ScrollablePane>
              </div>
            </div>
          </PivotItem>
          {this.props.template && (
            <PivotItem headerText="ARM template" itemKey="armtemplate">
              <div className="pivot-item-container">
                <div className="scrollablePane-wrapper">
                  <ScrollablePane>
                    <div className="armtemplate-content">
                      <pre>{armTemplateText}</pre>
                    </div>
                  </ScrollablePane>
                </div>
              </div>
            </PivotItem>
          )}
        </Pivot>
      </div>
    );
  }
}

export default DetailPageContent;
