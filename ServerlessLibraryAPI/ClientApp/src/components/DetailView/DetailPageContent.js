import React, { Component } from "react";
import ReactMarkdown from "markdown-to-jsx";
import {
  Pivot,
  PivotItem,
  PivotLinkSize,
  ScrollablePane
} from "office-ui-fabric-react/lib/index";
import { getTheme, mergeStyleSets } from "office-ui-fabric-react";
import "./DetailPageContent.scss";
const theme = getTheme();

const classNames = mergeStyleSets({
  wrapper: {
    minHeight: "60vh",
    position: "relative",
    maxHeight: "inherit"
  },
  pane: {
    minHeight: "60vh",
    border: "0px solid " + theme.palette.neutralLight,
    whiteSpace: "pre",
    backgroundColor: "#FBFBFB",
    width: "80%"
  },
  textContent: {
    padding: "15px 10px"
  }
});

class DetailPageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      armTemplateText: "",
      markdownText: "",
      selectedKey: "licence"
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
          .then(response => response.text())
          .then(data => {
            this.setState({ armTemplateText: data });
          });
      } else {
        this.setState({
          armTemplateText: "This sample does not have an arm template"
        });
      }
    }

    if (
      pivotItem.props.itemKey === "overview" &&
      this.state.markdownText === ""
    ) {
      //todo: fetch proper readme file of the sample. Now a fixed url readme is used

      //   let { repository } = this.props;
      //   let readmefileUrl = repository + "/blob/master/README.md";
      //   if (repository.includes("/tree/")) {
      //     readmefileUrl = repository + "/README.md";
      //   }
      //   fetch(readmefileUrl)
      //     .then(response => response.text())
      //     .then(data => {
      //       this.setState({ markdownText: data });
      //     });

      fetch(
        "https://raw.githubusercontent.com/jefking/fl-image-resize/master/README.md"
      )
        .then(response => response.text())
        .then(data => {
          this.setState({ markdownText: data });
        });
    }
  }

  render() {
    const pivotStyles = {
      root: {
        borderBottom: "1px solid rgba(105, 130, 155, 0.25)",
        paddingLeft: "15px",
        width: "80%"
      },
      text: {
        color: " #0058AD",
        fontSize: "14px"
      },
      link: {
        color: "black"
      },
      linkIsSelected: {
        selectors: {
          ":before": {
            color: "#161616",
            boxSizing: "border-box",
            borderBottom: "2px solid #161616"
          }
        }
      }
    };

    return (
      <div>
        <Pivot
          styles={pivotStyles}
          selectedKey={this.state.selectedKey}
          linkSize={PivotLinkSize.large}
          onLinkClick={(item, ev) => this.handleLinkClick(item, ev)}
        >
          <PivotItem headerText="Overview" itemKey="overview">
            <div className="pivot-item-container">
              <h4>Sample details</h4>
              <div className={classNames.wrapper}>
                <ScrollablePane styles={{ root: classNames.pane }}>
                  <ReactMarkdown>{this.state.markdownText}</ReactMarkdown>
                </ScrollablePane>
              </div>
            </div>
          </PivotItem>
          <PivotItem headerText="ARM template" itemKey="armtemplate">
            <div className="pivot-item-container">
              <h4>ARM template</h4>
              <div className={classNames.wrapper}>
                <ScrollablePane styles={{ root: classNames.pane }}>
                  <div className="container-content">
                    {this.state.armTemplateText}
                  </div>
                </ScrollablePane>
              </div>
            </div>
          </PivotItem>
          <PivotItem headerText="Licence" itemKey="licence">
            <div className="pivot-item-container">
              <h4>Licence details</h4>
              <div className={classNames.wrapper}>
                <ScrollablePane styles={{ root: classNames.pane }}>
                  <div className="container-content">
                    Each application is licensed to you by its owner (which may
                    or may not be Microsoft) under the agreement which
                    accompanies the application. Microsoft is not responsible
                    for any non-Microsoft code and does not screen for security,
                    compatibility, or performance. The applications are not
                    supported by any Microsoft support program or service. The
                    applications are provided AS IS without warranty of any kind
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
        </Pivot>
      </div>
    );
  }
}

export default DetailPageContent;
