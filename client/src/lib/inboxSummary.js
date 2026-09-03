const statuses = [
  { label: "Total", key: "total" },
  { label: "New", key: "new" },
  { label: "In review", key: "inReview" },
  { label: "Closed", key: "closed" },
];

export function getInboxSummary(feedback) {
  const counts = { total: feedback.length, new: 0, inReview: 0, closed: 0 };

  feedback.forEach(({ status }) => {
    if (status === "New") counts.new += 1;
    if (status === "In review") counts.inReview += 1;
    if (status === "Closed") counts.closed += 1;
  });

  return statuses.map(({ label, key }) => ({ label, count: counts[key] }));
}
