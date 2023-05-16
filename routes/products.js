const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager');

const pm = new ProductManager('productos.json');

router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await pm.getProducts(limit);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await pm.getProductById(parseInt(req.params.pid));
    if (!product) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el producto');
  }
});

router.post('/', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  pm.addProduct(title, description, price, thumbnail, code, stock);
  res.status(201).send('Producto agregado');
});

router.put('/:pid', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  pm.updateProduct(parseInt(req.params.pid), { title, description, price, thumbnail, code, stock });
  res.send('Producto actualizado');
});

router.delete('/:pid', (req, res) => {
  pm.deleteProduct(parseInt(req.params.pid));
  res.send('Producto eliminado');
});

module.exports = router;
// Asegúrate de reemplazar 'productos.json' con la ruta correcta a tu archivo JSON de productos.


// Agrega algunos productos
pm.addProduct('Producto 1', 'Descripción del producto 1', 10.99, 'https://ruta/imagen1.jpg', 'COD1', 100);
pm.addProduct('Producto 2', 'Descripción del producto 2', 123.99, 'https://ruta/imagen2.jpg', 'COD2', 100);
pm.addProduct('Producto 3', 'Descripción del producto 3', 132.99, 'https://ruta/imagen3.jpg', 'COD3', 50);

// Muestra todos los productos
console.log(pm.getProducts());

// Muestra un producto específico
console.log(pm.getProductById(1));

// Actualiza un producto
pm.updateProduct(1, { title: 'Nuevo título', price: 99.99 });
console.log(pm.getProductById(1));

// Elimina un producto
pm.deleteProduct(2);
console.log(pm.getProducts());
