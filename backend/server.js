// Node packages
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';
// Middlewares
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// DB connection file
import connectDB from './config/db.js';
// API Routes
import usersRoutes from './routes/usersRoutes.js';


// Initialize express server
const app = express();
// Use Json on req body
app.use(express.json());
// Initialize environment variables
dotenv.config();
// Initialize DB connection
connectDB();
// Follow the routes hits
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }
// Routes
app.use('/api/users', usersRoutes);
const __dirname = path.resolve();
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running');
//   });
// }

  app.get('/', (req, res) => {
    res.send('API is running');
  });

// Middlewares
app.use(notFound);
app.use(errorHandler);
// Open port to listen
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    ('Server is running in ' + process.env.NODE_ENV + ' mode on port ' + PORT)
      .yellow.bold
  )
);
