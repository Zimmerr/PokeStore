const formatNumber = (number, digits=2) => {
  return parseFloat(number.toFixed(digits))
}

export default formatNumber;