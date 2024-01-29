
const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const path = require('path');

const userRoutes = require("./routes/user.Routes");

const app = express();

app.use(session(
    {
        secret : "Shhhh, esto es secreto",
        resave : false,
        saveUninitialized : false,
    }
));

let corsOptions = {
    origin: "*"
};

app.use(cookies());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// aplicar middleware de rutas
app.use("/user",userRoutes);

const port = 3000;

app.listen(port,()=>{
    console.log(`funcionando en el ${port}`)
})