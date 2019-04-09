import React, { Component } from "react";
import ReactMarkdown from "markdown-to-jsx";
import { connect } from "react-redux";
import { libraryService } from "../../services";
import {
  IconButton,
  Label,
  PrimaryButton,
  Link,
  Pivot,
  PivotItem,
  PivotLinkSize,
  ScrollablePane
} from "office-ui-fabric-react/lib/index";
import { samplesReceived } from "../../actions/FilterChangeActions";
import MetricBar from "../MetricBar/MetricBar";
import { getTheme, mergeStyleSets } from "office-ui-fabric-react";
import "./DetailView.css";
const theme = getTheme();
const classNames = mergeStyleSets({
  wrapper: {
    minHeight: "60vh",
    position: "relative",
    maxHeight: "inherit"
  },
  pane: {
    minHeight: "60vh",
    border: "1px solid " + theme.palette.neutralLight,
    whiteSpace: "pre"
  },
  sticky: {
    color: theme.palette.neutralDark,
    padding: "5px 20px 5px 10px",
    fontSize: "13px",
    borderTop: "1px solid " + theme.palette.black,
    borderBottom: "1px solid " + theme.palette.black
  },
  textContent: {
    padding: "15px 10px"
  }
});

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: {},
      armTemplateText: "",
      markdownText: "",
      selectedKey: "licence"
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.getVScodeLink = this.getVScodeLink.bind(this);
  }

  handleBackButtonClick() {
    this.props.history.goBack();
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    var currentItem;
    if (this.props.samples.length > 0) {
      currentItem = this.props.samples.filter(s => s.title === id)[0];
      this.setState({ sample: currentItem });
      this.setState({ repository: currentItem.repository });
    } else {
      libraryService
        .getAllSamples()
        .then(samples => {
          this.props.samplesReceived(samples);
          currentItem = samples.filter(s => s.title === id)[0];
          this.setState({ sample: currentItem });
        })
        .catch(error => console.log(error));
    }
  }
  handleLinkClick(pivotItem, ev) {
    this.setState({
      selectedKey: pivotItem.props.itemKey
    });

    if (
      pivotItem.props.itemKey === "armtemplate" &&
      this.state.armTemplateText === ""
    ) {
      if (this.state.sample.template) {
        fetch(this.state.sample.template)
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
      // if ( this.state.sample.repository.includes("/tree/")){
      //   readmefileUrl = this.state.sample.repository +"/README.md";
      // }
      // else{
      //   readmefileUrl = this.state.sample.repository +"/blob/master/README.md";
      // }

      fetch(
        "https://raw.githubusercontent.com/jefking/fn-http-queue-sb/master/README.md"
      )
        .then(response => response.text())
        .then(data => {
          this.setState({ markdownText: data });
        });
    }
  }

  handleDeployClick() {
    var url =
      "https://portal.azure.com/#create/Microsoft.Template/uri/" +
      encodeURIComponent(this.state.sample.template);
    window.open(url);
  }

  getVScodeLink() {
    return (
      "vscode://vscode.git/clone?url=" +
      encodeURIComponent(this.state.sample.repository)
    );
  }
  render() {
    let styles = {
      margin: "20px",
      width: "250px",
      height: "250px",
      backgroundColor: "yellow"
    };

    return (
      <div className="detailpagecontainer">
        <div className="detailpagetitle">
          <div>
            <IconButton
              iconProps={{ iconName: "Back" }}
              title="Like"
              ariaLabel="Like"
              onClick={() => this.handleBackButtonClick()}
            />
          </div>
          <div className="title1">
            <span>{this.state.sample.title}</span>
          </div>
        </div>
        <MetricBar
          numlikes="0"
          repository={this.state.sample.repository}
          downloads={this.state.sample.totaldownloads}
        />
        <p className="sampledescription">{this.state.sample.description}</p>
        <div className="tabcontainer">
          <Pivot
            selectedKey={this.state.selectedKey}
            linkSize={PivotLinkSize.large}
            onLinkClick={(item, ev) => this.handleLinkClick(item, ev)}
          >
            <PivotItem headerText="Overview" itemKey="overview">
              <div className="pivotitemcontainer">
                <hr />
                <Label>Sample details</Label>
                <div className={classNames.wrapper}>
                  <ScrollablePane styles={{ root: classNames.pane }}>
                    <ReactMarkdown>{this.state.markdownText}</ReactMarkdown>
                  </ScrollablePane>
                </div>
              </div>
            </PivotItem>
            <PivotItem headerText="ARM template" itemKey="armtemplate">
              <div className="pivotitemcontainer">
                <hr />
                <Label>ARM template </Label>
                <div className={classNames.wrapper}>
                  <ScrollablePane styles={{ root: classNames.pane }}>
                    <div className="content1">{this.state.armTemplateText}</div>
                  </ScrollablePane>
                </div>
              </div>
            </PivotItem>
            <PivotItem headerText="Licence" itemKey="licence">
              <div className="pivotitemcontainer">
                <hr />
                <Label styles={styles}>Licence details</Label>
                <div className={classNames.wrapper}>
                  <ScrollablePane styles={{ root: classNames.pane }}>
                    <div className="content1">
                      Each application is licensed to you by its owner (which
                      may or may not be Microsoft) under the agreement which
                      accompanies the application. Microsoft is not responsible
                      for any non-Microsoft code and does not screen for
                      security, compatibility, or performance. The applications
                      are not supported by any Microsoft support program or
                      service. The applications are provided AS IS without
                      warranty of any kind
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

        {/* Pending styling and telemetry of user actions */}
        <div className="actioncontainer">
          <div className="actionitems">
            <PrimaryButton text="Deploy" onClick={this.handleDeployClick} />
          </div>
          <div className="actionitems">
            <Link href={this.state.sample.repository}>Open in Github</Link>
          </div>

          <div className="actionitems">
            <Link href={this.getVScodeLink()}>Open in vscode</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  samples: state.samples
});

const mapDispatchToProps = {
  samplesReceived
};

const DetailViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);

export default DetailViewContainer;
