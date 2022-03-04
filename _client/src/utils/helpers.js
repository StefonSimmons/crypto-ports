// eslint-disable-next-line
Number.prototype.roundSum = function (port) {
  if (port?.name === "USD") {
    return `$${this?.toFixed(2)}`
  }
  return this?.toFixed(8)
}