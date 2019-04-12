import React, { Component } from "react";
import {
  Icon,
  Link,
  TextField,
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react";

import { libraryService } from "../../services";
import * as formStyles from "./AddContributionForm.styles";
import * as commonStyles from "../shared/Button.styles";
import "./Contribute.scss";

const initialState = {
  showForm: true,
  title: "",
  description: "",
  repository: "",
  template: ""
};

class AddContributionForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.onLinkClick = this.onLinkClick.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onRepositoryChange = this.onRepositoryChange.bind(this);
    this.onTemplateChange = this.onTemplateChange.bind(this);
    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
  }

  onLinkClick() {
    this.setState({ showForm: true });
  }

  onTitleChange(event, newValue) {
    this.setState({ title: newValue || "" });
  }

  onDescriptionChange(event, newValue) {
    this.setState({ description: newValue || "" });
  }

  onRepositoryChange(event, newValue) {
    this.setState({ repository: newValue || "" });
  }

  onTemplateChange(event, newValue) {
    this.setState({ template: newValue || "" });
  }

  onAddButtonClick() {
    libraryService
      .submitNewSample(this.state)
      .then(
        item => console.log("submitted item: ", item),
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
            <div>
              <TextField
                styles={formStyles.textFieldStyles}
                label="Title"
                required={true}
                placeholder="Enter your custom title"
                value={this.state.title}
                onChange={this.onTitleChange}
              />
              <TextField
                styles={formStyles.textFieldStyles}
                label="Description"
                required={true}
                placeholder="Enter a brief description"
                value={this.state.description}
                onChange={this.onDescriptionChange}
              />
              <TextField
                styles={formStyles.textFieldStyles}
                label="URL"
                required={true}
                placeholder="Enter GitHub URL"
                value={this.state.repository}
                onChange={this.onRepositoryChange}
              />
              <TextField
                styles={formStyles.textFieldStyles}
                label="ARM template link"
                placeholder="Enter ARM template link"
                value={this.state.template}
                onChange={this.onTemplateChange}
              />
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

export default AddContributionForm;
