const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

const pm = new ProductManager('datos.json');

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await pm.getProducts(limit);
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error al obtener los productos' });
  }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await pm.getProductById(id);
    if (!product) {
      res.status(404).send({ error: 'Producto no encontrado' });
    } else {
      res.send(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error al obtener el producto' });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
