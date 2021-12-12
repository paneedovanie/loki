const
  fs = require('fs'),
  readline = require('readline')

module.exports.getList = (path) => new Promise((res, rej) => {
  let list = {}

  if (!fs.existsSync(path)) {
    fs.mkdir('storage/cache', { recursive: true }, (err) => {
      if (err) return rej(err);

      fs.writeFileSync(path, "")
    })
    res({})
  } else {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(path)
    });

    lineReader.on('line', (line) => {
      list[line] = true
    });

    lineReader.on('close', async () => {
      res(list)
    });
  }
})

module.exports.query = (sql, options) => new Promise((res, rej) => {
  database.query(sql, options, (err, result) => {
    if (err) rej(err)
    res(result)
  })
})