const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

//  ENGINE TEMPLATE
app.set('view engine', 'ejs')

// Import Routes
const AddBacFile = require('./routes/admin/addFile')
const getAllData = require('./routes/getData')


app.get('/', (req, res) => {
    res.send("hello")
})

//  USE MIDDLEWARE
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'), )


// ROUTES MIDDLEWARE
app.use('/admin', AddBacFile)
app.use('/api', getAllData)


//  PORT DECLARATION
const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Listenning on port ${port}`)
})