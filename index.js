const express = require('express') //install package express
const app = express() //express allows to use one var = app + express fun
const PORT = process.env.PORT || 3000 //tells us which port can be used in the backend
//console.log(process.env.TEST); //startup server = log a url
//const fs = require('fs/promises') // file server module (give the images /json file back)

const config = require('./config.json'); //connect to the db
//database from mongodb
const {
    MongoClient,
    ObjectId
} = require('mongodb');
require("dotenv").config(); //load a dotenv in our documentation
//const uri = "mongodb+srv://admin:admin@cluster0.mx0sa.mongodb.net/backend?retryWrites=true&w=majority";
const client = new MongoClient(config.finaleUrl)


//middelware --> data transfomratie 
const cors = require('cors');
app.use(cors());

//bodyparser = request bodies in a middleware 
const bodyParser = require('body-parser'); //every body form is converted to json
app.use(bodyParser.json()); 

app.use(express.static('public')) //express nees to use these things like public folder
// instead of localhost:3000/data =  localhost:3000/info.html

//ROUTE waits for local root= localhost3000 

//GET ROUTE --> call api to do get req
app.get('/', (req, res) => { //waiting for a get request when we enter a url
    console.log('Local root called!') // refresh page to see it being called
    //res.send('Hello Amina!') // req send to server with res
    res.status(300).redirect('/info.html');
})

//https://web2-backend-amina.herokuapp.com/photo
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

//https://web2-backend-amina.herokuapp.com/savePhoto
// POST method route --> Save an image
app.post('/savePhoto', async (req, res) => { //http://localhost:3000/savePhoto
    if (!req.body.filename || !req.body.url) {
        res.status(400).send('Bad request: missing filename or url');
        return; //return to the function
    }
    try { //async function (await is used)
        //let data = await fs.readFile('data/photo.json'); //= it worked
        client.connect(async err => {
            const collection = client.db("backend").collection("images");
            //const data = await collection.find({}).toArray();

            const bg = await collection.insertOne({
                filename: req.body.filename,
                url: req.body.url
            });

            client.close();
        });

        let photo = { // Create the new photo object
            _id: req.body._id,
            filename: req.body.filename,
            url: req.body.url,
        }

        //if it succeeds --> send back data
        console.log(photo);
        res.status(200).send(photo);

    } catch (error) { //catch an error
        res.status(500).send('File could not be read! Try again later...')
        console.log(error.stack);
    } finally {
        await client.close();
    }

})
//


app.listen(PORT, () => { //start server on port & do something when its done
    console.log(`Listening to port at http://localhost:${PORT}`)
})



//EXTRA info:
//run the server = nodemon index.js
// POSTMAN to test the ROUTS
//https://web2-backend-amina.herokuapp.com/info.html
//package.json add in script "start" = tell Heruko by default going to run npm start by the command = node index.js

