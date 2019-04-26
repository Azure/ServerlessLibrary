import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Icon,
  Link,
  TextField,
  PrimaryButton,
  DefaultButton,
  Dropdown
} from "office-ui-fabric-react";

import { libraryService } from "../../services";
import { sampleActions } from "../../actions/sampleActions";
import * as formStyles from "./AddContributionForm.styles";
import * as commonStyles from "../shared/Button.styles";
import * as Constants from "../shared/Constants"

const initialState = {
  showForm: false,
  title: "",
  description: "",
  repository: "",
  template: "",
  technologies: [],
  language: "",
  solutionareas: []
};

class AddContributionForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.onLinkClick = this.onLinkClick.bind(this);
    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  technologiesOptionsChanged(newValue) {
    let technologies = this.state.technologies;
    if (newValue.selected) {
      technologies.push(newValue.key);
    } else {
      technologies = technologies.filter(t => t !== newValue.key);
    }

    this.setState({ technologies: technologies });
  }

  solutionAreasOptionsChanged(newValue) {
    let solutionAreas = this.state.solutionareas;
    if (newValue.selected) {
      solutionAreas.push(newValue.key);
    } else {
      solutionAreas = solutionAreas.filter(t => t !== newValue.key);
    }

    this.setState({ solutionareas: solutionAreas });
  }

  languageOptionChanged(newValue) {
    this.setState({ language: newValue });
  }

  handleInputChange(event, newValue) {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: newValue });
  }

  onLinkClick() {
    this.setState({ showForm: true });
  }

  onAddButtonClick() {
    libraryService
      .submitNewSample(this.state)
      .then(
        sample => this.props.sampleSubmittedSuccess(sample),
        error => console.log(error) // todo
      )
      .then(this.resetForm())
      .catch(error => console.log(error)); // todo
  }

  onCancelButtonClick() {
    this.resetForm();
  }

  resetForm() {
    this.setState(initialState);
  }

  render() {
    let technologiesOptions = Constants.technologies.map(t => ({ key: t, text: t }));
    let languageOptions = Constants.languages.map(l => ({ key: l, text: l }));
    let solutionAreasOptions = Constants.solutionAreas.map(s => ({ key: s, text: s }));
    const { showForm } = this.state;
    return (
      <div className="add-contribution-container">
        <div className="add-contribution-link">
          <Link onClick={this.onLinkClick}>
            <Icon iconName="Edit" style={{ marginRight: "5px" }} />
            Add new contribution
          </Link>
        </div>
        {showForm && (
          <div className="contribution-form-container">
            <div className="input-container">
              <div className="contribution-form-fields-container">
                <TextField
                  name="title"
                  label="Title"
                  required={true}
                  placeholder="Enter the title of your sample"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                />
                <TextField
                  name="repository"
                  label="URL"
                  required={true}
                  placeholder="Enter the URL of the GitHub repo that hosts your sample "
                  value={this.state.repository}
                  onChange={this.handleInputChange}
                />
                <TextField
                  name="description"
                  label="Description"
                  required={true}
                  resizable={false}
                  rows={4}
                  multiline
                  placeholder="Briefly describe your sample (300 characters maximum)"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="contribution-form-fields-container">
                <Dropdown
                  placeholder="Select which technologies are used by this sample"
                  label="Technologies"
                  onChange={(ev, item) => this.technologiesOptionsChanged(item)}
                  required={true}
                  multiSelect
                  options={technologiesOptions}
                />
                <Dropdown
                  placeholder="Select the language used by the Azure Functions involved"
                  label="Languages"
                  onChange={(ev, item) => this.languageOptionChanged(item.key)}
                  required={true}
                  options={languageOptions}
                />

                <Dropdown
                  placeholder="Select categories for your sample"
                  label="Solution Area"
                  onChange={(ev, item) =>
                    this.solutionAreasOptionsChanged(item)
                  }
                  required={true}
                  multiSelect
                  options={solutionAreasOptions}
                />

                <TextField
                  name="template"
                  label="ARM template URL"
                  placeholder="Enter the URL of the ARM template to use to deploy your sample"
                  value={this.state.template}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="contribution-form-actions-container">
              <PrimaryButton
                styles={commonStyles.buttonStyles}
                text="Add"
                onClick={this.onAddButtonClick}
              />
              <DefaultButton
                styles={commonStyles.secondaryButtonStyles}
                text="Cancel"
                onClick={this.onCancelButtonClick}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  sampleSubmittedSuccess: sampleActions.sampleSubmittedSuccess
};

const AddContributionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContributionForm);

export default AddContributionFormContainer;
