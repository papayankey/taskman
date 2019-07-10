module.exports = async function(name) {
  const elems = name.split(" ")[0].split("");
  const first = elems[0].toUpperCase();
  const rest = elems.slice(1);
  return [first, ...rest].join("");
};
