import React, { Component } from "react";
import {
  Link,
  TextField,
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react";

import { libraryService } from "../../services";

const initialState = {
  showForm: false,
  error: "",
  title: "",
  description: "",
  repository: "",
  template: ""
};

class AddContribution extends Component {
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
        error => this.setState({ error })
      )
      .then(this.resetForm())
      .catch(error => console.log(error));
  }

  onCancelButtonClick() {
    this.resetForm();
  }

  resetForm() {
    this.setState(initialState);
  }

  render() {
    const { showForm, error } = this.state;
    return (
      <div>
        <Link onClick={this.onLinkClick}>Add new contribution</Link>
        {error && error !== "" && (
          <div>Submission failed! Details: {error}</div>
        )}
        {showForm && (
          <div>
            <div>
              <TextField
                label="Title"
                required={true}
                placeholder="Enter your custom title"
                value={this.state.title}
                onChange={this.onTitleChange}
              />
              <TextField
                label="Description"
                required={true}
                placeholder="Enter a brief description"
                value={this.state.description}
                onChange={this.onDescriptionChange}
              />
              <TextField
                label="URL"
                required={true}
                placeholder="Enter GitHub URL"
                value={this.state.repository}
                onChange={this.onRepositoryChange}
              />
              <TextField
                label="ARM template link"
                placeholder="Enter ARM template link"
                value={this.state.template}
                onChange={this.onTemplateChange}
              />
            </div>
            <div>
              <PrimaryButton text="Add" onClick={this.onAddButtonClick} />
              <DefaultButton text="Cancel" onClick={this.onCancelButtonClick} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AddContribution;
