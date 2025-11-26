function validateDateString(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const parsedDate = new Date(dateString);
  return !isNaN(parsedDate.getTime());
}

module.exports = validateDateString;
