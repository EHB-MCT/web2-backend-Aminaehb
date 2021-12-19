const express = require('express') //install package express
const app = express() //express allows to use one var = app + express fun
const port = process.env.PORT || 3000 //tells us which port can be used in the backend
//console.log(process.env.TEST); //startup server = log a url
const fs = require('fs/promises') // file server module (give the images /json file back)

//database from mongodb
const {
    MongoClient,
    ObjectId
} = require('mongodb');
require("dotenv").config(); //load a dotenv in our documentation
const uri = "mongodb+srv://admin:admin@cluster0.mx0sa.mongodb.net/backend?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



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
app.get('/photo', async (req, res) => { //http://localhost:3000/photo
    //Read the file
    try { //async function (await is used)
        //let data = await fs.readFile('data/photo.json'); //= it worked
        client.connect(async err => {
            const collection = client.db("backend").collection("images");

            const data = await collection.find({}).toArray();

            client.close();
            //if it succeeds --> send back data
            console.log(data);
            res.status(200).send(data);
        });
    } catch (error) { //catch an error
        res.status(500).send('File could not be read! Try again later...')
        console.log(error.stack);
    } finally {
        await client.close();
    }

})


// POST method route --> Save an image
app.post('/savePhoto', async (req, res) => { //http://localhost:3000/savePhoto
    //console.log(req.body) //body paramater of req --> by adding it in postman
    // res.send(`Data received`) //json code from postman --> sended to vsc 
    //res.send(`Data received with id: ${req.body.id}`) //code seen on postman

    if (!req.body.id || !req.body.filename || !req.body.url) {
        res.status(400).send('Bad request: missing filename or url');
        return; //return to the function
    }
    try { //async function (await is used)
        //let data = await fs.readFile('data/photo.json'); //= it worked
        client.connect(async err => {
            const collection = client.db("backend").collection("images");
            //const data = await collection.find({}).toArray();

            const bg = await collection.findOne({
                filename: req.body.filename,
                url: req.body.url
            });
    
            client.close();
        });

        let photo = { // Create the new photo object
            filename: req.body.filename,
            url: req.body.url,
        }

        //if it succeeds --> send back data
        console.log(photo);
        res.status(201).send(photo);

    } catch (error) { //catch an error
        res.status(500).send('File could not be read! Try again later...')
        console.log(error.stack);
    } finally {
        await client.close();
    }


})




app.listen(port, () => { //start server on port & do something when its done
    console.log(`Listening to port at http://localhost:${port}`)
})



//EXTRA info:
//run the server = nodemon index.js
// POSTMAN to test the ROUTS

//GET ROUTE --> send data
//app.get('/data', (req, res) => { //waiting for a get request when we enter a url
//let Data = { //object with details
// name: 'Amina',
//  age: 19
// }
// res.send(Data); //send back data --> localhost:3000/data
//})

//https://web2-backend-amina.herokuapp.com/