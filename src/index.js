import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 1234;

// Configurar CORS
const corsOptions = {
    origin: 'http://localhost:4200', // Cambia a la URL de tu app Angular en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // Si necesitas enviar cookies o autorizaciones
};

app.use(cors(corsOptions));

//Import routes
import userRoute from './routes/users.routes.js';
import customerRoute from './routes/customer.routes.js';
import jobRoute from './routes/job.routes.js';
import invoiceRoute from './routes/invoice.routes.js';
import saleRoute from './routes/sales.routes.js';

// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// app.use(express.static(__dirname + '/public'));

app.use(express.json());

//routes
const apiRouter = express.Router();

apiRouter.use('/invoice', invoiceRoute);
apiRouter.use('/user', userRoute);
apiRouter.use('/customer', customerRoute);
apiRouter.use('/job', jobRoute);
apiRouter.use('/sale', saleRoute);

app.use('/api', apiRouter);




app.listen(PORT, () => {
    console.log(`Server running in  http://localhost:${PORT}`);
});