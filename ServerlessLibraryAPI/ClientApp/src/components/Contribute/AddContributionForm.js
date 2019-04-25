import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Icon,
  Link,
  TextField,
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react";

import { libraryService } from "../../services";
import { sampleActions } from "../../actions/sampleActions";
import * as formStyles from "./AddContributionForm.styles";
import * as commonStyles from "../shared/Button.styles";

const initialState = {
  showForm: false,
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
    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
            <div className="contribution-form-fields-container">
              <TextField
                styles={formStyles.textFieldStyles}
                name="title"
                label="Title"
                required={true}
                placeholder="Enter your custom title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
              <TextField
                styles={formStyles.textFieldStyles}
                name="description"
                label="Description"
                required={true}
                placeholder="Enter a brief description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
              <TextField
                styles={formStyles.textFieldStyles}
                name="repository"
                label="URL"
                required={true}
                placeholder="Enter GitHub URL"
                value={this.state.repository}
                onChange={this.handleInputChange}
              />
              <TextField
                styles={formStyles.textFieldStyles}
                name="template"
                label="ARM template link"
                placeholder="Enter ARM template link"
                value={this.state.template}
                onChange={this.handleInputChange}
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
