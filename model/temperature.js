let lastValue = 20;

const tempratureData = (Array(24).fill()).map(
  _ => (Math.floor(lastValue = lastValue + Math.random() * 3 -
    1.5))
)
const getTempData = () => { return tempratureData }

module.exports = { getTempData }

