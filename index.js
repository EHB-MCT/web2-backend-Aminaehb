const express = require('express') //install package express
const app = express() //express allows to use one var = app + express fun
const port = 3000

//database from mongodb
const {
    MongoClient
} = require("mongodb");
const uri = "mongodb+srv://admin:admin@cluster0.mx0sa.mongodb.net/course_project?retryWrites=true&w=majority";
const client = new MongoClient(uri);

//middelware --> data transfomratie 
const cors = require('cors');
app.use(cors());

//bodyparser = request bodies in a middleware 
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //every body is converted to json

app.use(express.static('public')) //express nees to use these things
// instead of localhost:3000/data =  localhost:3000/info.html

//ROUTE waits for local root= localhost3000 

//GET ROUTE --> call api to do get req
app.get('/', (req, res) => { //waiting for a get request when we enter a url
    console.log('Local root called!') // refresh page to see it being called
    //res.send('Hello Amina!') // req send to server with res
    res.status(300).redirect('/info.html');
})
//Return all images from db
app.get('/images', async (req, res) => {
    //Read the file
    try { //async function (await is used)
        await client.connect(); //connect to the database
        const db = client.db("course_project").collection("images"); //var connect
        const data = await collection.find({}).toArray(); //await to find the file

         //if it succeeds --> send back the file
        console.log(data);
        res.status(200).send(data);

    } catch (error) { //catch an error
        res.status(500).send('File could not be read! Try again later...')
        console.log(error.stack);
    } finally {
        await client.close();
    }

});





//CREATE NEW ROUTE
// POST method route
app.post('/saveData', function (req, res) {
    console.log(req.body) //body paramater of req --> by adding it in postman

    // res.send(`Data received`) //json code from postman --> sended to vsc 
    res.send(`Data received with id: ${req.body.id}`) //code seen on postman

})

app.listen(port, () => { //start server on port & do something when its done
    console.log(`Listening to port at http://localhost:${port}`)
})




//run the server = nodemon index.js
// POSTMan to test the ROUTS



//GET ROUTE --> send data
//app.get('/data', (req, res) => { //waiting for a get request when we enter a url
//let Data = { //object with details
// name: 'Amina',
//  age: 19
// }
// res.send(Data); //send back data --> localhost:3000/data
//})