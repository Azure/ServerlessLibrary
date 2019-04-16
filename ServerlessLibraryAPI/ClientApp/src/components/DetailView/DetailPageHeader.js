import React, { Component } from "react";
import PageHeaderWithBackButton from "../shared/PageHeaderWithBackButton";
import MetricBar from "../MetricBar/MetricBar";

class DetailPageHeader extends Component {
  render() {
    let {
      title,
      repository,
      template,
      totaldownloads,
      description,
      numlikes
    } = this.props;
    return (
      <div>
        <PageHeaderWithBackButton title={title}>
          <MetricBar
            numlikes={numlikes}
            repository={repository}
            template ={template}
            downloads={totaldownloads}
          />
          <p>{description}</p>
        </PageHeaderWithBackButton>
      </div>
    );
  }
}

export default DetailPageHeader;
