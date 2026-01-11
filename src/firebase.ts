import admin, { type ServiceAccount } from 'firebase-admin';
import 'dotenv/config';

const serviceAccount: ServiceAccount = {
  projectId: process.env['FIREBASE_PROJECT_ID']!,
  privateKey: process.env['FIREBASE_PRIVATE_KEY']!,
  clientEmail: process.env['FIREBASE_CLIENT_EMAIL']!,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth: admin.auth.Auth = admin.auth();
