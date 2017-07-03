module.exports = link => {
  let exp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
  let match = link.href.match(exp);
  return (match && match.length ? { id: match[1] } : {});
};
