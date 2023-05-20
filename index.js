const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

// midlewares  
app.use(cors())
app.use(express.json())

const v = process.env.DB_USER;
console.log(v);

//mongodb 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nfkbd0s.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyCollections= client.db("toyCarLand").collection('toys');
    const categoryCollection= client.db("toyCarLand").collection('categories')

    app.get('/toys', async(req,res)=>{
      const result = await toyCollections.find().toArray();
      res.send(result)
    })



    // load toys by subCategory name 
    app.get('/category-toys', async(req,res)=>{
      console.log(req.query.subCategory);
      let query={}
      if(req.query.subCategory)
      {
        query ={subCategory: req.query.subCategory}
      }
      const result =await toyCollections.find(query).toArray()
      res.send(result)
    })

    //categories load
    app.get('/categories',async(req,res)=>{
      const result = await categoryCollection.find().toArray()
      res.send(result)
    })

    app.get('/toy/:id',async(req,res)=>{
      const id= req.params.id;
      const query = {_id: new ObjectId(id)}
      const result= await toyCollections.findOne(query)
      res.send(result)
    })

    //post data or add car
    app.post('/addCar',async(req,res)=>{
      const user = req.body;
      const result = await toyCollections.insertOne(user)
      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//mongodb 



app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/alam', (req, res) => {
  res.send('Alam Hossain!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})