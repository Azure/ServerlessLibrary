import React, { Component } from "react";
import {
  Icon,
  Link,
  TextField,
  PrimaryButton,
  DefaultButton,
  Dropdown,
  Dialog
} from "office-ui-fabric-react";

import { libraryService } from "../../services";
import * as commonStyles from "../shared/Button.styles";
import * as Constants from "../shared/Constants";

const initialState = {
  showForm: false,
  title: "",
  description: "",
  repository: "",
  template: "",
  technologies: [],
  language: "",
  solutionareas: [],
  dialogProps: {
    isVisible: false,
    title: "",
    content: {}
  }
};

class ContributionForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.onLinkClick = this.onLinkClick.bind(this);
    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDismissDialog = this.onDismissDialog.bind(this);
    this.validateForm = this.getFormValidationErrors.bind(this);
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

  getFormValidationErrors(sample) {
    let errors = [];
    if (sample.title.length === 0) {
      errors.push("Title cannot be empty");
    }
    if (sample.repository.length === 0) {
      errors.push("Repository URL cannot be empty");
    }
    if (sample.description.length === 0) {
      errors.push("Description cannot be empty");
    }
    if (sample.technologies.length === 0) {
      errors.push("At least one technology must be selected");
    }
    if (sample.language.length === 0) {
      errors.push("Language must be selected");
    }
    if (sample.solutionareas.length === 0) {
      errors.push("At least one solution area must be selected");
    }

    return errors;
  }

  onLinkClick() {
    this.setState({ showForm: true });
  }

  onAddButtonClick() {
    const sample = {
      title: this.state.title,
      description: this.state.description,
      repository: this.state.repository,
      template: this.state.template,
      technologies: this.state.technologies,
      language: this.state.language,
      solutionareas: this.state.solutionareas
    };
    const errors = this.getFormValidationErrors(sample);
    if (errors.length > 0) {
      this.showDialog("An error occurred!", errors);
      return;
    }
    libraryService
      .submitNewSample(sample)
      .then(sample => {
        this.resetForm();
        this.showDialog(
          "Thank you!",
          "Thank you for your contribution! Your sample has been submitted for approval."
        );
      })
      .catch(data => {
        this.showDialog("An error occurred!", data.error);
      });
  }

  showDialog(title, content) {
    const dialogProps = {
      title: title,
      content: content,
      isVisible: true
    };
    this.setState({ dialogProps });
  }

  onDismissDialog() {
    const dialogProps = { ...this.state.dialogProps, isVisible: false };
    this.setState({ dialogProps });
  }

  onCancelButtonClick() {
    this.resetForm();
  }

  resetForm() {
    this.setState(initialState);
  }

  render() {
    let technologiesOptions = Constants.technologies.map(t => ({
      key: t,
      text: t
    }));
    let languageOptions = Constants.languages.map(l => ({ key: l, text: l }));
    languageOptions.push({key:"na", text:"Not applicable"} );
    let solutionAreasOptions = Constants.solutionAreas.map(s => ({
      key: s,
      text: s
    }));
    let { showForm, dialogProps } = this.state;
    return (
      <div className="add-contribution-container">
        <div className="add-contribution-link">
          <Link onClick={this.onLinkClick}>
            <Icon iconName="Edit" style={{ marginRight: "5px" }} />
            Add new contribution
          </Link>
        </div>
        {dialogProps.isVisible && (
          <Dialog
            dialogContentProps={{
              title: dialogProps.title
            }}
            hidden={!dialogProps.isVisible}
            onDismiss={this.onDismissDialog}
          >
            {Array.isArray(dialogProps.content) ? (
              <ul>
                {dialogProps.content.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            ) : (
              <p>{String(dialogProps.content)}</p>
            )}
          </Dialog>
        )}
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
                  label="Language"
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

export default ContributionForm;
