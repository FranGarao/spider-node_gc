import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT || 1234;

//Import routes
import userRoute from './routes/users.routes.js';
import customerRoute from './routes/customer.routes.js';
import jobRoute from './routes/job.routes.js';
import invoiceRoute from './routes/invoice.routes.js';

// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// app.use(express.static(__dirname + '/public'));

app.use(express.json());

//routes
const apiRouter = express.Router();

apiRouter.use('/invoices', invoiceRoute);
apiRouter.use('/api/users', userRoute);
apiRouter.use('/api/customer', customerRoute);
apiRouter.use('/api/jobs', jobRoute);

app.use('/api', apiRouter);




app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});