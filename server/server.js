const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
 
app.use(express.static(publicPath));

app.get('/', function (req, res) {
  res.send('Hello world')
});
 
app.listen(port, () => {
    console.log(`Server is on port ${port}`);    
});