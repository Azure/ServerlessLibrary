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
import NotificationDialog from "../shared/NotificationDialog";

const initialState = {
  showForm: false,
  errors: [],
  showErrorDialog: false,
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
    this.onDismissErrorDialog = this.onDismissErrorDialog.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleInputChange(event, newValue) {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: newValue });
  }

  validateForm(sample) {
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

    return errors;
  }

  onLinkClick() {
    this.setState({ showForm: true });
  }

  setErrorState(errors) {
    this.setState({
      errors: errors,
      showErrorDialog: true
    });
  }

  onAddButtonClick() {
    const sample = {
      title: this.state.title,
      description: this.state.description,
      repository: this.state.repository,
      template: this.state.template
    };
    const errors = this.validateForm(sample);
    if (errors.length > 0) {
      this.setErrorState(errors);
      return;
    }

    libraryService
      .submitNewSample(sample)
      .then(
        sample => {
          this.props.sampleSubmittedSuccess(sample);
          this.resetForm();
        },
        error => {
          this.setErrorState(error);
        }
      )
      .catch(error => {
        this.setErrorState(error);
      });
  }

  onDismissErrorDialog() {
    this.setState({ showErrorDialog: false });
  }

  onCancelButtonClick() {
    this.resetForm();
  }

  resetForm() {
    this.setState(initialState);
  }

  render() {
    let { showForm, errors, showErrorDialog } = this.state;
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
            {showErrorDialog && (
              <NotificationDialog
                title="An error occurred!"
                messageList={errors}
                hidden={!showErrorDialog}
                onDismiss={this.onDismissErrorDialog}
              />
            )}
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
