//Hello World example from: https://expressjs.com/fr/starter/hello-world.html

const express = require('express') //install package express
const app = express() //express allows to use one var = app + express fun
const port = 3000

//https://docs.mongodb.com/drivers/node/current/quick-start/

app.use(express.static('public')) //express nees to use these things
// instead of localhost:3000/data =  localhost:3000/info.html

//ROUTE waits for local root= localhost3000 

//GET ROUTE --> call api to do get req
app.get('/', (req, res) => { //waiting for a get request when we enter a url
    console.log('Local root called!') // refresh page to see it being called
    //res.send('Hello Amina!') // req send to server with res
})

//GET ROUTE --> send data
app.get('/data', (req, res) => { //waiting for a get request when we enter a url
    let Data = { //object with details
        name: 'Amina',
        age: 19
    }
    res.send(Data); //send back data --> localhost:3000/data
})


//CREATE NEW ROUTE
// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
})

app.listen(port, () => { //start server on port & do something when its done
    console.log(`Example app listening at http://localhost:${port}`)
})




//run the server = nodemon index.js
// POSTMan to test the ROUTS