const formatMoney = (number) => {
  return number.toFixed(2).replace('.', ',')
}

export default formatMoney;