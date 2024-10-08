const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const auth = require('./middleware/auth');

const app = express();

// Connection database Mongo
connectDB();

// Middleware
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blogify',
      version: '1.0.0',
      description: 'API pour la plateforme de blogging Blogify',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: []
    }],
  },
  apis: ['./routes/*.js'], // Chemin vers vos fichiers de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Route pour la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', auth, require('./routes/postRoutes'));
app.use('/api/comments', auth, require('./routes/commentRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
