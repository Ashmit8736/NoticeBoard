export function validateNotice(data) {
  const errors = {};

  if (!data.title || !data.title.trim()) {
    errors.title = "Title is required";
  }

  if (!data.body || !data.body.trim()) {
    errors.body = "Body is required";
  }

  const validCategories = ["Exam", "Event", "General"];
  if (!validCategories.includes(data.category)) {
    errors.category = "Invalid category";
  }

  const validPriorities = ["Normal", "Urgent"];
  if (!validPriorities.includes(data.priority)) {
    errors.priority = "Invalid priority";
  }

  if (!data.publishDate || isNaN(new Date(data.publishDate).getTime())) {
    errors.publishDate = "Valid publish date is required";
  }

  return errors;
}