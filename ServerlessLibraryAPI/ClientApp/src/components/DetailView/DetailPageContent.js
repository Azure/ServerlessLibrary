import React, { Component } from "react";
import ReactMarkdown from "markdown-to-jsx";
import {
  Pivot,
  PivotItem,
  PivotLinkSize,
  ScrollablePane
} from "office-ui-fabric-react/lib/index";
import "./DetailPageContent.scss";

class DetailPageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      armTemplateText: "",
      markdownText: "",
      selectedKey: "overview"
    };

    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick(pivotItem, ev) {
    this.setState({
      selectedKey: pivotItem.props.itemKey
    });
    if (
      pivotItem.props.itemKey === "armtemplate" &&
      this.state.armTemplateText === ""
    ) {
      let { template } = this.props;
      if (template) {
        fetch(template)
          .then(response => {
            if (response.ok) {
              return response.text();
            }
            throw new Error("Network response was not ok.");
          })
          .then(data => {
            this.setState({ armTemplateText: data });
          })
          .catch(error =>
            this.setState({ armTemplateText: "Unable to fetch ARM template." })
          );
      } else {
        this.setState({
          armTemplateText: "This sample does not have an arm template."
        });
      }
    }
  }

  componentDidMount() {
    let { repository } = this.props;
    repository = repository.replace(
      "https://github.com",
      "https://raw.githubusercontent.com"
    );

    repository = repository.replace("/tree/", "/");
    let readmefileUrl = repository + "/master/README.md";
    if (repository.includes("/master/")) {
      readmefileUrl = repository + "README.md";
    }

    fetch(readmefileUrl)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Network response was not ok.");
      })
      .then(data => {
        data = data.replace("http://azuredeploy.net/deploybutton.svg", "");
        data = data.replace("http://azuredeploy.net/deploybutton.png", "");
        this.setState({ markdownText: data });
      })
      .catch(error =>
        this.setState({ markdownText: "No readme file available " })
      );
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

    return (
      <div className="detail-page-content">
        <Pivot
          styles={pivotStyles}
          selectedKey={this.state.selectedKey}
          linkSize={PivotLinkSize.large}
          onLinkClick={(item, ev) => this.handleLinkClick(item, ev)}
        >
          <PivotItem headerText="Overview" itemKey="overview">
            <div className="pivot-item-container">
              <div className="scrollablePane-wrapper">
                <ScrollablePane>
                  <ReactMarkdown>{this.state.markdownText}</ReactMarkdown>
                </ScrollablePane>
              </div>
            </div>
          </PivotItem>
          <PivotItem headerText="License" itemKey="license">
            <div className="pivot-item-container">
              <div className="scrollablePane-wrapper">
                <ScrollablePane>
                  <div className="license-content">
                    <p>
                      Each application is licensed to you by its owner (which
                      may or may not be Microsoft) under the agreement which
                      accompanies the application. Microsoft is not responsible
                      for any non-Microsoft code and does not screen for
                      security, compatibility, or performance. The applications
                      are not supported by any Microsoft support program or
                      service. The applications are provided AS IS without
                      warranty of any kind
                    </p>
                    <p>
                      Also, please note that the Function App you've selected
                      was created with Azure Functions 1.x. As such, it might
                      not contain the latest features, but will still work as
                      provided.
                    </p>
                  </div>
                </ScrollablePane>
              </div>
            </div>
          </PivotItem>
          <PivotItem headerText="ARM template" itemKey="armtemplate">
            <div className="pivot-item-container">
              <div className="scrollablePane-wrapper">
                <ScrollablePane>
                  <div className="armtemplate-content">
                    {this.state.armTemplateText}
                  </div>
                </ScrollablePane>
              </div>
            </div>
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}

export default DetailPageContent;
