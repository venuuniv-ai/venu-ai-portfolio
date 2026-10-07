"use client";

import { FormEvent, useState } from "react";

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
};

type AskResponse = {
  query: string;
  answer: string;
  sources: SearchResult[];
  retrieval: string;
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

  async function askQuestion(question: string) {
    const cleanedQuestion = question.trim();

    if (!cleanedQuestion || isLoading) {
      return;
    }

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

      if (!response.ok) {
        throw new Error(
          "The portfolio intelligence service could not process the request."
        );
      }

      const data = (await response.json()) as AskResponse;

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
        },
      ]);
    } catch (requestError) {
      console.error("Ask Venu request failed:", requestError);

      setError(
        "The knowledge interface is temporarily unavailable. Please try again."
      );
    } finally {
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
          <div className="ask-kicker">05 / PORTFOLIO INTELLIGENCE</div>

          <div className="ask-title-row">
            <h2>ASK VENU.</h2>

            <div className="ask-header-meta">
              <span>PORTFOLIO / RETRIEVAL INTERFACE</span>

              <strong>
                <span className="ask-status-dot" />
                SEMANTIC RETRIEVAL
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
            <span>VENU.OS / KNOWLEDGE INTERFACE</span>

            <strong>
              <Database size={14} />
              VECTOR INDEX READY
            </strong>
          </div>

          <div className="ask-layout">
            <aside className="ask-sidebar">
              <div>
                <div className="ask-sidebar-label">SUGGESTED QUERIES</div>

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
                  EMBEDDING RETRIEVAL
                </p>
              </div>
            </aside>

            <div className="ask-conversation">
              <div className="ask-conversation-top">
                <span>SESSION / PORTFOLIO QUERY</span>

                <span>GROUNDING / SEMANTIC EVIDENCE</span>
              </div>

              <div className="ask-messages">
                {messages.length === 0 && !isLoading && (
                  <div className="ask-empty">
                    <Sparkles size={22} />

                    <p>
                      Ask about Venu&apos;s AI engineering experience, projects,
                      architecture decisions, or technical stack.
                    </p>

                    <span>
                      Answers are grounded in semantically retrieved portfolio
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
                      {message.role === "user" ? "QUERY" : "VENU.OS"}
                    </div>

                    <p>{message.content}</p>

                    {message.sources && message.sources.length > 0 && (
                      <div className="ask-source-grid">
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
                      </div>
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

                    <p>Searching portfolio vector space...</p>
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
                <Search size={17} />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ask about experience, RAG, multimodal AI, inference..."
                  aria-label="Ask Venu"
                  autoComplete="off"
                />

                <button
                  type="submit"
                  aria-label="Submit question"
                  disabled={isLoading || !query.trim()}
                >
                  <ArrowUp size={18} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
