const express = require('express');
const mongoConnect = require('./config/db'); 
// const User = require('./model/UserModel');
const userRoutes = require('./routes/userRoutes');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3030;
const cors = require('cors');
app.use(express.json());
app.use(cors());




app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


mongoConnect.then(() => {
    console.log("Connected to MongoDB successfully.");
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});


app.get('/aayush',(req, res) =>{
    res.json({
        name: 'Aayush Poudel',
        grade:"Bachelors",
        major: "Computer Science",
        hobbies: ['reading', 'writing','playing guiar','and so on']
    })
})

//routes
app.use('/api',userRoutes)


