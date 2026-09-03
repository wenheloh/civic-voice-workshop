import { useEffect, useState } from "react";
import { getFeedback } from "../api";
import { getInboxSummary } from "../lib/inboxSummary";
import { filterFeedback } from "../lib/filterFeedback";
import { maskNric } from "../lib/maskNric";

export function AdminPage({ user }) {
  const [feedback, setFeedback] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const summary = getInboxSummary(feedback);

  const filteredFeedback = filterFeedback(feedback, search);

  useEffect(() => {
    getFeedback(user).then((response) => setFeedback(response.feedback)).catch((requestError) => setError(requestError.message));
  }, [user]);

  return (
    <main className="page-shell admin-shell">
      <div className="page-heading">
        <div className="eyebrow">Admin workspace</div>
        <h1>Feedback inbox</h1>
        <p>A simple view of feedback received from members of the public.</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      <section className="inbox-summary" aria-label="Inbox summary">
        {summary.map((item) => (
          <div className="summary-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.count}</strong>
          </div>
        ))}
      </section>
      <section className="feedback-list">
        <div className="list-header"><strong>Latest feedback</strong><span>{filteredFeedback.length} of {feedback.length} items</span></div>
        <label className="feedback-search">
          Search feedback
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search messages or citizen names"
          />
        </label>
        {filteredFeedback.length === 0 && (
          <p className="empty-state">No feedback matches “{search.trim()}”. Try another keyword.</p>
        )}
        {filteredFeedback.map((item) => (
          <article className="feedback-row" key={item.id}>
            <div>
              <div className="feedback-meta">
                {item.name} · {maskNric(item.nric)} · {new Date(item.createdAt).toLocaleDateString()}
              </div>
              <p>{item.message}</p>
            </div>
            <span className="status-pill">{item.status}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
