import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";

const ChatWindow = ({
  framework,
  messages,
  isTyping,
  node,
  onOptionSelect,
  progress,
  answeredCount,
  totalQuestions
}) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const options = useMemo(() => {
    if (!node || node.type !== "question") return [];
    return node.options || [];
  }, [node]);

  if (!framework) {
    return (
      <div className="chat-window chat-window--empty">
        <p>Select a framework to launch the AI copilot.</p>
      </div>
    );
  }

  return (
    <div className="chat-window" aria-live="polite">
      <div className="chat-window__header">
        <span className="chat-window__indicator" style={{ backgroundColor: framework.color }} />
        <div>
          <h3 className="chat-window__title">{framework.label} • AI Copilot session</h3>
          <p className="chat-window__meta">
            {answeredCount}/{totalQuestions} checks completed · {progress}% progression
          </p>
        </div>
      </div>

      <div className="chat-window__messages" ref={messagesContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message message--${message.from}`}
            role="text"
          >
            {message.text}
          </div>
        ))}
        {isTyping && (
          <div className="message message--bot" role="status">
            Copilot is typing…
          </div>
        )}
      </div>

      {options.length > 0 && (
        <div className="chat-window__options" role="group" aria-label="Chat options">
          {options.map((option) => (
            <button
              key={option.value}
              className="chat-option"
              onClick={() => onOptionSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

ChatWindow.propTypes = {
  framework: PropTypes.shape({
    color: PropTypes.string,
    label: PropTypes.string
  }),
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      from: PropTypes.oneOf(["bot", "user"]),
      text: PropTypes.string
    })
  ).isRequired,
  isTyping: PropTypes.bool,
  node: PropTypes.object,
  onOptionSelect: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  answeredCount: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired
};

export default ChatWindow;
