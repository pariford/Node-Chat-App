const path = require('path');
const express = require('express');
var app = express();
const publicPath = path.join(__dirname, '../public');
//to support the express middleware and connection pooling with the viewa
app.use(express.static(publicPath));
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});