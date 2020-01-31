import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareDown,
  faCaretSquareUp,
  faWindowRestore,
  faWindowMaximize,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";

const Button = ({ icon, ...props }) => (
  <button className="button" type="button" {...props}>
    <FontAwesomeIcon icon={icon} />
  </button>
);

class TargetMessagesPane extends React.Component {
  state = {
    maximized: false
  };

  handleMaximizeRestore = () => {
    this.setState(prevState => ({ maximized: !prevState.maximized }));
  };

  render() {
    const {
      messages,
      isTop,
      isMaximized,
      onTogglePosition,
      onToggleMaximize,
      onClose
    } = this.props;

    return (
      <div
        className={`target-messages-pane ${
          isTop ? "top" : "bottom"
        } ${isMaximized && "maximized"}`}
      >
        <div className="buttons has-addons are-small">
          <Button
            icon={isTop ? faCaretSquareDown : faCaretSquareUp}
            onClick={onTogglePosition}
          />
          <Button
            icon={isMaximized ? faWindowRestore : faWindowMaximize}
            onClick={onToggleMaximize}
          />
          <Button icon={faWindowClose} onClick={onClose} />
        </div>
        <div className="scrollable-content">
          <ol>
            {messages.map((message, i) => (
              <li key={i}>
                <pre className={message.type === "stderr" ? "error" : ""}>
                  {message.body.join("\n").trim()}
                </pre>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

TargetMessagesPane.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  isTop: PropTypes.bool,
  isMaximized: PropTypes.bool,
  onTogglePosition: PropTypes.func,
  onToggleMaximize: PropTypes.func,
  onClose: PropTypes.func
};

TargetMessagesPane.defaultProps = {
  messages: [],
  isTop: false,
  isMaximized: false,
  onTogglePosition: () => {},
  onToggleMaximize: () => {},
  onClose: () => {}
};

export default TargetMessagesPane;
