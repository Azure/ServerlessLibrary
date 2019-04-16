import React, { Component } from "react";
import PageHeaderWithBackButton from "../shared/PageHeaderWithBackButton";
import MetricBar from "../MetricBar/MetricBar";

class DetailPageHeader extends Component {
  render() {
    let {
      title,
      author,
      id,
      totaldownloads,
      description,
      likes
    } = this.props;
    return (
      <div>
        <PageHeaderWithBackButton title={title}>
          <MetricBar
            likes={likes}
            author={author}
            id={id}
            downloads={totaldownloads}
          />
          <p>{description}</p>
        </PageHeaderWithBackButton>
      </div>
    );
  }
}

export default DetailPageHeader;
