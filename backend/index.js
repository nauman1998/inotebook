const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo()
const app = express()
const port = 5000
app.use(cors())

app.use(express.json())

// http://localhost:3000/ 
// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})