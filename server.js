const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./app/configs/db.config");
const mongoose = require('mongoose');

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {

        console.error(err)
        return
    };
    require('./app/routes/user.route')(app);
    // set port, listen for requests
    const PORT = process.env.PORT || 3800;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}
)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
