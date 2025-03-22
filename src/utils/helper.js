
export function slugify(str) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

export function formatDecimal(num, decimal = 2) {
  if (!num) return 0;
  let numFloat = parseFloat(num);
  return numFloat.toFixed(decimal);
}

export function formatCurrency(num = 0, currency = "EUR", decimal = 2) {
  if (!currency) currency = "EUR";
  const formatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal
  });
  return formatter.format(num);
}

