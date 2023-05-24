import express from 'express'
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import handlebars from 'express-handlebars'
import productsRouter from './routes/products';
import cartsRouter from './routes/carts';

const PORT = 8080;
const app = express();
app.use(express.json());

// Config de handlebars
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Rutas de vistas
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

// Config de socket.io
io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');
  
  socket.on('newProduct', (product) => {
    pm.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock);
    io.emit('updateProducts', pm.getProducts());
  });

  socket.on('deleteProduct', (productId) => {
    pm.deleteProduct(parseInt(productId));
    io.emit('updateProducts', pm.getProducts());
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor express corriendo en el puerto ${PORT}`);
});
