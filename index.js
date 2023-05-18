const express = require('express')
const cors= require('cors')
require('dotenv').config()
const app = express()
const port =process.env.PORT || 3000

// midlewares 
app.use(cors())
app.use(express.json())

const v= process.env.DB_USER;
console.log(v);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/alam', (req, res) => {
  res.send('Alam Hossain!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})