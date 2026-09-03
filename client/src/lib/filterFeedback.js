export function filterFeedback(feedback, query) {
  const keyword = query.trim().toLocaleLowerCase();
  if (!keyword) return feedback;

  return feedback.filter((item) => (
    item.message.toLocaleLowerCase().includes(keyword)
    || item.name.toLocaleLowerCase().includes(keyword)
  ));
}
