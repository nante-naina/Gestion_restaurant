import { connect } from 'mongoose';

// Définition du type pour les options de connexion
const options = {
  serverSelectionTimeoutMS: 5000
};

export const dbConnect = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('La variable MONGO_URI est manquante');
    }

    await connect(process.env.MONGO_URI, options);

    console.log('Connexion à MongoDB réussie');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
};