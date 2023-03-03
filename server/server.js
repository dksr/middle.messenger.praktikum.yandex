const express = require('express') // eslint-disable-line

const app = express()
const PORT = 3000

app.use(express.static(`${__dirname}/../dist/`))

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`) // eslint-disable-line
})
