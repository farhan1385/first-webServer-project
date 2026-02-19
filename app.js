const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');


const mongoose = require('mongoose');
const PORT = 3000;

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin", adminRouter);
app.use(shopRouter);

mongoose.connect("mongodb://localhost:27017/Shop")
    .then(result => {
        app.listen(PORT, () => {
            console.log(`listining on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err));