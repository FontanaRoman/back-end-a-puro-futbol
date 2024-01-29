const multer = require("multer");
const path = require("path");

const configureMulter = (uploadDestination) => {

  const absoluteRut = `../public/${uploadDestination}`;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, absoluteRut));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    });
    const upload = multer({ storage: storage });
    return upload;
};

module.exports = configureMulter;

// Notas

/*The function was designed to be able to reuse the multer block to process the load,
so by parameter we will pass the folder path if it is for users or products, etc.
EXAMPLE OF USE*/

// const userUpload = configureMulter('users');

// const productUpload = configureMulter('products');

/*
// Utiliza las configuraciones en tus rutas
app.post('/upload/user', userUpload.single('avatar'), (req, res) => {
  // Lógica después de la carga para usuarios
});*/

/*app.post('/upload/product', productUpload.single('productImage'), (req, res) => {
  // Lógica después de la carga para productos
});*/

// With these examples you will understand how the code works