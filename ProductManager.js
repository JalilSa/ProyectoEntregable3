const fs = require('fs');

fs.writeFileSync('datos.json', '');
class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.readProducts();
    this.lastId = this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) : 0;
  }

  readProducts() {
    try {
      const data = fs.readFileSync(this.path);
      return JSON.parse(data);
    } catch (error) {
      console.log('Error al leer el archivo de productos', error);
      return [];
    }
  }

  writeProducts() {
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync(this.path, data);
    } catch (error) {
      console.log('Error al escribir en el archivo de productos', error);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    if (this.products.some(product => product.code === code)) {
      console.error('Ya existe un producto con ese código');
      return;
    }

    const newProduct = {
      id: ++this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.writeProducts();
    console.log('Producto agregado:', newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.error('Producto no encontrado');
      return;
    }
    return product;
  }

  updateProduct(id, fieldsToUpdate) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.error('Producto no encontrado');
      return;
    }

    const updatedProduct = { ...this.products[productIndex], ...fieldsToUpdate };
    this.products[productIndex] = updatedProduct;
    this.writeProducts();
    console.log('Producto actualizado:', updatedProduct);
  }

  deleteProduct(id) {
    this.products = this.products.filter(product => product.id !== id);
    console.log(`Producto con id ${id} eliminado`);
  }
   }


   ////Pruebas
   const pm = new ProductManager('datos.json');

pm.addProduct('Producto 1', 'Descripción del producto 1', 10.99, 'https://ruta/imagen1.jpg', 'COD1', 100);
pm.addProduct('Producto 2', 'Descripción del producto 2', 123.99, 'https://ruta/imagen2.jpg', 'COD2', 100);
pm.addProduct('Producto 3', 'Descripción del producto 3', 132.99, 'https://ruta/imagen3.jpg', 'COD3', 50);

const products = pm.getProducts();
console.log(products);
const product = pm.getProductById(1);
console.log(product);
pm.updateProduct(1, { title: 'Nuevo título', price: 99.99 });
const product1 = pm.getProductById(1);
console.log(product1);
pm.deleteProduct(2);
const product2 = pm.getProductById(2);
console.log(product2);


module.exports = ProductManager