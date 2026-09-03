import { useEffect, useRef, useState } from "react";
import { submitFeedback } from "../api";

const MAX_MESSAGE_LENGTH = 500;

export function CitizenPage({ user }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [shouldFocusForm, setShouldFocusForm] = useState(false);
  const confirmationRef = useRef(null);
  const feedbackRef = useRef(null);

  useEffect(() => {
    if (submitted) {
      confirmationRef.current?.focus();
    } else if (shouldFocusForm) {
      feedbackRef.current?.focus();
      setShouldFocusForm(false);
    }
  }, [shouldFocusForm, submitted]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!message.trim()) {
      setError("Please enter feedback.");
      return;
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      setError(`Feedback must be ${MAX_MESSAGE_LENGTH} characters or fewer.`);
      return;
    }
    try {
      const response = await submitFeedback({ nric: user.nric, name: user.name, message });
      setReference(response.feedback.reference);
      setSubmitted(true);
      setMessage("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function handleSubmitAnother() {
    setSubmitted(false);
    setError("");
    setShouldFocusForm(true);
  }

  return (
    <main className="page-shell">
      <div className="page-heading">
        <div className="eyebrow">Public feedback</div>
        <h1>What would you like us to know?</h1>
        <p>Tell us about an issue, an idea, or a positive experience in your community.</p>
      </div>
      <section className="form-card">
        {submitted ? (
          <div className="submission-confirmation" ref={confirmationRef} tabIndex="-1" role="status" aria-live="polite">
            <div className="success-banner">
              Thank you. Your feedback has been received. Your submission reference is <strong>{reference}</strong>.
            </div>
            <p className="muted">Would you like to share another piece of feedback?</p>
            <button className="primary-button" type="button" onClick={handleSubmitAnother}>Submit another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="feedback-message">Your feedback</label>
            <textarea
              id="feedback-message"
              ref={feedbackRef}
              rows="7"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setMessage(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              placeholder="Share your feedback here..."
              aria-describedby="feedback-character-count feedback-guidance"
              aria-invalid={Boolean(error)}
              aria-errormessage={error ? "feedback-error" : undefined}
            />
            <p id="feedback-character-count" className="character-count" aria-live="polite">
              {message.length} / {MAX_MESSAGE_LENGTH} characters
            </p>
            <div className="form-footer">
              <span id="feedback-guidance" className="muted">Please do not include sensitive personal information.</span>
              <button className="primary-button" type="submit">Submit feedback</button>
            </div>
            {error && <p id="feedback-error" className="error-message" role="alert">{error}</p>}
          </form>
        )}
      </section>
    </main>
  );
}
