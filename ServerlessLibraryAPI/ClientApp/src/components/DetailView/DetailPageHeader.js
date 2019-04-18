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
      createddate,
      description,
      likes,
      dislikes
    } = this.props;
    return (
      <div>
        <PageHeaderWithBackButton title={title}>
          <MetricBar
            likes={likes}
            dislikes={dislikes}
            author={author}
            id={id}
            downloads={totaldownloads}
            createddate={createddate}
          />
          <p>{description}</p>
        </PageHeaderWithBackButton>
      </div>
    );
  }
}

export default DetailPageHeader;
