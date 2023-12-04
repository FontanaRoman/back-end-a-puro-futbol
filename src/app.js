
const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const productRoute = require("./routes/product.Routes");


const app = express();

// setting
app.set("view engine", "ejs");

let corsOptions = {
    origin: "*"
};

// middlewares
app.use(session(
    {
        secret : "Shhhh, esto es secreto",
        resave : false,
        saveUninitialized : false,
    }
));
app.use(cookies());
app.use(express.static("public"));
app.use(cors(corsOptions));

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use("/", productRoute);

const port = 3000;

app.listen(port,()=>{
    console.log(`funcionando en el ${port}`)
})