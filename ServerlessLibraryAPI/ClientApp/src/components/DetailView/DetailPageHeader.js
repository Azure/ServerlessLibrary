import React, { Component } from "react";
import PageHeaderWithBackButton from "../shared/PageHeaderWithBackButton";
import MetricBar from "../MetricBar/MetricBar";

class DetailPageHeader extends Component {
  render() {
    let {
      title,
      repository,
      totaldownloads,
      description,
      numlikes
    } = this.props;
    const headerStyles = {
      marginLeft: "23px"
    };
    return (
      <div style={headerStyles}>
        <PageHeaderWithBackButton title={title}>
          <MetricBar
            numlikes={numlikes}
            repository={repository}
            downloads={totaldownloads}
          />
          <p>{description}</p>
        </PageHeaderWithBackButton>
      </div>
    );
  }
}

export default DetailPageHeader;
