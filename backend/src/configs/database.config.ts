import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/restaurant', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      retryReads: true,
      autoIndex: true,
      maxPoolSize: 10,
      minPoolSize: 5,
      waitQueueTimeoutMS: 5000
    });
    console.log('Connecté à la base de données MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};