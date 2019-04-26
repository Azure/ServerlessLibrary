import React, { Component } from "react";
import { Dialog } from "office-ui-fabric-react";

class NotificationDialog extends Component {
  render() {
    let { title, subtext, messageList, hidden, onDismiss } = this.props;
    return (
      <div>
        <Dialog
          dialogContentProps={{
            title: title,
            subText: subtext
          }}
          hidden={hidden}
          onDismiss={onDismiss}
        >
          <ul>
            {messageList.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </Dialog>
      </div>
    );
  }
}

export default NotificationDialog;
