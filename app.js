const express = require('express');
const app = express();

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json()); // Middleware para parsear JSON en el body de las peticiones

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor express corriendo en el puerto ${PORT}`);
});
