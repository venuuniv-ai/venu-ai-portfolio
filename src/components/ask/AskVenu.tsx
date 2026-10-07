"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { ArrowUp, Database, Search, Sparkles } from "lucide-react";

type SearchResult = {
  id: string;
  source: "PROFILE" | "EXPERIENCE" | "PROJECT" | "SKILLS";
  title: string;
  content: string;
  score: number;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: SearchResult[];
  generation?: AskResponse["generation"];
};

type AskResponse = {
  query: string;
  answer: string;
  sources: SearchResult[];
  retrieval: string;
  generation: "llm" | "deterministic-fallback" | "blocked";
};

const suggestions = [
  "Where has Venu used RAG?",
  "What is Venu's multimodal AI experience?",
  "Which ML infrastructure tools has Venu used?",
  "Explain Venu's AI engineering trajectory.",
];

export default function AskVenu() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const requestPending = useRef(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTop = container.scrollHeight;
    const frame = window.requestAnimationFrame(() => {
      if (container) container.scrollTop = container.scrollHeight;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, isLoading, error]);

  async function askQuestion(question: string) {
    const cleanedQuestion = question.trim();

    if (!cleanedQuestion || requestPending.current) {
      return;
    }

    requestPending.current = true;
    setError("");
    setQuery("");

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: cleanedQuestion,
      },
    ]);

    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: cleanedQuestion,
        }),
      });

      const data = (await response.json()) as AskResponse & { error?: string };

      if (!response.ok) {
        throw new Error(
          data.answer || data.error || "The portfolio intelligence service could not process the request."
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
          generation: data.generation,
        },
      ]);
    } catch (requestError) {
      console.error("Ask Venu request failed:", requestError);

      setError(
        requestError instanceof Error
          ? requestError.message
          : "The knowledge interface is temporarily unavailable. Please try again."
      );
    } finally {
      requestPending.current = false;
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askQuestion(query);
  }

  return (
    <section className="ask-section" id="ask">
      <div className="ask-shell">
        <motion.div
          className="ask-header"
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="ask-kicker">A CONVERSATION ABOUT THE WORK</div>

          <div className="ask-title-row">
            <h2>Ask about <em>my work.</em></h2>

            <div className="ask-header-meta">
              <span>EXPERIENCE · PROJECTS · TECHNICAL APPROACH</span>

              <strong>
                <span className="ask-status-dot" />
                PORTFOLIO RETRIEVAL
              </strong>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="ask-terminal"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
            delay: 0.08,
          }}
        >
          <div className="ask-terminal-bar">
            <span>ASK VENU</span>

            <strong>
              <Database size={14} aria-hidden="true" />
              ANSWERS WITH SUPPORTING EVIDENCE
            </strong>
          </div>

          <div className="ask-layout">
            <aside className="ask-sidebar">
              <div>
                <div className="ask-sidebar-label">Try a question</div>

                <div className="ask-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <button
                      type="button"
                      key={suggestion}
                      className="ask-suggestion"
                      onClick={() => void askQuestion(suggestion)}
                      disabled={isLoading}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      <p>{suggestion}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ask-knowledge-status">
                <div className="ask-sidebar-label">KNOWLEDGE STATUS</div>

                <p>
                  <span />
                  STRUCTURED PORTFOLIO DATA
                </p>

                <p>
                  <span />
                  INTENT-AWARE RETRIEVAL
                </p>
              </div>
            </aside>

            <div className="ask-conversation">
              <div className="ask-conversation-top">
                <span>Your conversation</span>

                <span>Grounded in portfolio evidence</span>
              </div>

              <div ref={messagesRef} className="ask-messages" role="log" aria-live="polite" aria-busy={isLoading}>
                {messages.length === 0 && !isLoading && (
                  <div className="ask-empty">
                    <Sparkles size={22} aria-hidden="true" />

                    <p>
                      Ask about Venu&apos;s AI engineering experience, projects,
                      architecture decisions, or technical stack.
                    </p>

                    <span>
                      Answers are grounded in retrieved portfolio
                      evidence.
                    </span>
                  </div>
                )}

                {messages.map((message, index) => (
                  <motion.div
                    key={`${message.role}-${index}`}
                    className={`ask-message ${
                      message.role === "user"
                        ? "ask-message-user"
                        : "ask-message-assistant"
                    }`}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <div className="ask-message-label">
                      {message.role === "user" ? "YOU" : "ASK VENU"}
                    </div>

                    {message.generation && (
                      <div className="ask-generation">
                        GENERATION / {message.generation === "deterministic-fallback" ? "FALLBACK" : message.generation === "llm" ? "LLM" : "BLOCKED"}
                      </div>
                    )}

                    <p>{message.role === "user" ? message.content : message.content.replace(/\[SOURCE_\d+\]|\(?\bsource\s+\d+\)?/gi, "").replace(/ +([.,;:])/g, "$1").trim()}</p>

                    {message.sources && message.sources.length > 0 && (
                      <details className="ask-sources-disclosure"><summary>Supporting sources ({message.sources.length})</summary><div className="ask-source-grid">
                        {message.sources.map((source, sourceIndex) => (
                          <div
                            className="ask-source-card"
                            key={`${source.id}-${sourceIndex}`}
                          >
                            <div className="ask-source-top">
                              <span>{source.source}</span>

                              <strong>{source.score.toFixed(3)}</strong>
                            </div>

                            <h4>{source.title}</h4>

                            <p>{source.content}</p>
                          </div>
                        ))}
                      </div></details>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    className="ask-message ask-message-assistant"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                  >
                    <div className="ask-message-label">VENU.OS</div>

                    <p>Searching portfolio evidence...</p>
                  </motion.div>
                )}

                {error && (
                  <div className="ask-message ask-message-assistant">
                    <div className="ask-message-label">SYSTEM</div>

                    <p>{error}</p>
                  </div>
                )}
              </div>

              <form className="ask-input-bar" onSubmit={handleSubmit}>
                <Search size={17} aria-hidden="true" />

                <input
                  id="ask-query"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ask about experience, RAG, multimodal AI, inference..."
                  aria-label="Ask Venu"
                  autoComplete="off"
                  maxLength={500}
                  disabled={isLoading}
                />

                <button
                  type="submit"
                  aria-label="Submit question"
                  disabled={isLoading || !query.trim()}
                >
                  <ArrowUp size={18} aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
