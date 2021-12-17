//Hello World example from: https://expressjs.com/fr/starter/hello-world.html

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//run the app = node index.js

