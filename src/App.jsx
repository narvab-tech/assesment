import { useCallback, useMemo, useRef, useState } from "react";
import HeroSection from "./components/HeroSection.jsx";
import FrameworkSelector from "./components/FrameworkSelector.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import FeaturesSection from "./components/FeaturesSection.jsx";
import HowItWorksSection from "./components/HowItWorksSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import FooterCta from "./components/FooterCta.jsx";
import { frameworks, flows } from "./data/frameworks.js";
import { buildSummary, computeNextScore } from "./utils/score.js";
import "./styles/App.css";

const App = () => {
  const [selectedFrameworkId, setSelectedFrameworkId] = useState(null);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [scoreState, setScoreState] = useState({ total: 0, max: 0, tags: {} });
  const [answers, setAnswers] = useState({});
  const [summary, setSummary] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const messageIdRef = useRef(1);

  const activeFlow = selectedFrameworkId ? flows[selectedFrameworkId] : null;
  const currentNode = activeFlow && currentNodeId ? activeFlow.nodes[currentNodeId] : null;

  const totalQuestions = useMemo(() => {
    if (!activeFlow) return 0;
    return Object.values(activeFlow.nodes).filter(
      (node) => node.type === "question" && node.tag
    ).length;
  }, [activeFlow]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const nextMessageId = useCallback(() => {
    const id = messageIdRef.current;
    messageIdRef.current += 1;
    return id;
  }, []);

  const pushBotMessage = useCallback((text) => {
    setMessages((prev) => [...prev, { id: nextMessageId(), from: "bot", text }]);
  }, [nextMessageId]);

  const resetStateForFramework = useCallback(
    (frameworkId) => {
      const flow = flows[frameworkId];
      if (!flow) return;

      messageIdRef.current = 1;
      setSelectedFrameworkId(frameworkId);
      setCurrentNodeId(flow.startNode);
      setScoreState({ total: 0, max: 0, tags: {} });
      setAnswers({});
      setSummary(null);
      setIsTyping(false);
      setMessages([
        {
          id: nextMessageId(),
          from: "bot",
          text: flow.nodes[flow.startNode].message
        }
      ]);
    },
    [nextMessageId]
  );

  const handleOptionClick = useCallback(
    (option) => {
      if (!currentNode || !activeFlow) return;

      setMessages((prev) => [
        ...prev,
        { id: nextMessageId(), from: "user", text: option.label }
      ]);

      setAnswers((prev) => {
        if (!currentNode.tag) return prev;
        return {
          ...prev,
          [currentNode.tag]: { value: option.value, label: option.label }
        };
      });

      let updatedScore = scoreState;
      if (currentNode.tag && typeof option.scoreImpact === "number") {
        updatedScore = computeNextScore(scoreState, currentNode, option);
        setScoreState(updatedScore);
      }

      const nextId = option.next;
      const nextNode = activeFlow.nodes[nextId];
      if (!nextNode) return;

      setIsTyping(true);
      const capturedScore = updatedScore;

      setTimeout(() => {
        setIsTyping(false);

        if (nextNode.type === "bot") {
          pushBotMessage(nextNode.message);
          setCurrentNodeId(nextId);
          return;
        }

        if (nextNode.type === "question") {
          pushBotMessage(nextNode.message);
          setCurrentNodeId(nextId);
          return;
        }

        if (nextNode.type === "summary") {
          const finalSummary = buildSummary(capturedScore, selectedFrameworkId, frameworks);
          setSummary(finalSummary);
          pushBotMessage(
            `Here’s your ${finalSummary.frameworkLabel} asset readiness score: ${finalSummary.readiness}% – ${finalSummary.levelLabel}.`
          );
          setCurrentNodeId(nextId);
        }
      }, 600);
    },
    [activeFlow, currentNode, nextMessageId, pushBotMessage, scoreState, selectedFrameworkId]
  );

  return (
    <div className="app">
      <HeroSection onPrimaryCta={() => resetStateForFramework(selectedFrameworkId || "soc2")} />

      <FrameworkSelector
        frameworks={frameworks}
        selected={selectedFrameworkId}
        onSelect={(frameworkId) => {
          resetStateForFramework(frameworkId);
        }}
      />

      <section className="engagement">
        <div className="engagement__chat">
          <ChatWindow
            framework={selectedFrameworkId ? frameworks[selectedFrameworkId] : null}
            messages={messages}
            isTyping={isTyping}
            node={currentNode}
            onOptionSelect={handleOptionClick}
            progress={progressPercent}
            answeredCount={answeredCount}
            totalQuestions={totalQuestions}
          />
        </div>
        <SummaryPanel summary={summary} />
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FooterCta />
    </div>
  );
};

export default App;
