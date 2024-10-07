const connectDB = require('./config/database');

async function testConnection() {
  try {
    await connectDB();
    console.log('La connexion à la base de données a réussi !');
    // Fermez la connexion après le test
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
    process.exit(1);
  }
}

testConnection();
