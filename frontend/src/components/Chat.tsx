import React, { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { createStyles, withStyles } from "@material-ui/core/styles";

const styles = {
  chatBox: {
    border: "1px solid white",
    borderRadius: "10%",
    color: "white",
    width: "50vw",
    height: "50vh"
  }
};

interface Message {
  user: string;
  message: string;
}

interface Props {
  classes: any;
  sendMessage: Function;
  messages: Message[];
}

interface State {
  message: string;
}

class Chat extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: event.currentTarget.value });
  };

  enterPressed = (event: React.KeyboardEvent) => {
    event.preventDefault();
    const code = event.keyCode || event.which;
    if (code === 13) {
      this.props.sendMessage(this.state.message);
      this.setState({ message: "" });
    }
  };

  renderChat = () => {
    const chat = [];
    let count = 0;
    const setUser = (message: Message) => {
      if (message.user) {
        return message.user + ": ";
      } else {
        return "";
      }
    };
    for (const m of this.props.messages) {
      chat.push(
        <span>
          <ListItemText key={count} primary={setUser(m) + m.message} />
          <Divider variant="middle" />
        </span>
      );
      count++;
    }
    return chat;
  };

  render() {
    const { classes } = this.props;

    const chatWindow = (
      <div>
        <TextField
          className={classes.textField}
          label="Send a Message!"
          onChange={this.onChange}
          onKeyUp={this.enterPressed}
          value={this.state.message}
        />
      </div>
    );
    return (
      <div style={styles.chatBox}>
        {chatWindow}
        <Paper style={{ maxHeight: "30vh", overflow: "auto" }}>
          <List aria-label="ChatRoom">{this.renderChat()}</List>
        </Paper>
      </div>
    );
  }
}

const materialUiStyles = createStyles({
  list: {
    color: "white"
  },
  textField: {
    "& input + fieldset": {
      borderColor: "green !important",
      borderWidth: 2
    },
    color: "white"
  }
});

export default withStyles(materialUiStyles)(Chat);
