//Hello World example from: https://expressjs.com/fr/starter/hello-world.html

const express = require('express') //install package express
const app = express() //express allows to use one var = app + express fun
const port = 3000

//ROOT waits for local root= localhost3000
app.get('/', (req, res) => { //waiting for a get request when we enter a url
    console.log('Local root called!')
  res.send('Hello Amina!')
})

app.listen(port, () => { //start server on port & do something when its done
  console.log(`Example app listening at http://localhost:${port}`)
})
//run the server = nodemon index.js

