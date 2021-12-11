module.exports.generateColors = function (size) {
  const 
    min = 0,
    max = 255

  let colors = []

  for(let i = 0; i < size; i++) {
    colors.push(`rgba(${Math.random()*(max-min)+min},${(max/size)*i},${max-((max/size)*i)},0.5)`)
  }

  return colors
}