const mysql = require('mysql')

module.exports.encode = function (str, length) {
  const output = []

  for (var i = str.length; i < length; i++) {
    str += ' '
  }

  str.split('').map(c => {
    output.push((c.charCodeAt(0) / 255))
  })

  return output
}

module.exports.strToArray = function (str) {
  str = str.replace(/[^a-zA-Z' ]/g, "")

  return str.split(' ')
}

module.exports.strToArray = function (str) {
  str = str.replace(/[^a-zA-Z' ]/g, "")

  return str.split(' ')
}

module.exports.escape = (string) => {
  return mysql.escape(string)
}

module.exports.htmlDecode = (string) => {
  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  };

  return string.replace(/([&<>\"'])/g, match => htmlEntities[match]);
}