const express = require('express');
const path = require('path');
require('dotenv').config();

const cors = require('cors');
const { validateName } = require('./validation');
const router = require('./route');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build',  'index.html')));

app.get("/api", (req, res) => {
    res.json({ message: "Search for any github profile" });
});

// app.use(validateName)

app.use('/api/', router)

// All other GET requests not handled before will return our React app
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('../client/build'))
    
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, '../client/build', 'index.html')) // relative path
//     })
// }

if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, (error) => {
    if(error) {
        console.log('Something went wrong...', error)
    } else {
        console.log(`Listening on ${PORT}`)
    }
})