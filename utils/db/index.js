import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "gs://pot-utilities.appspot.com/",
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export default { db: admin.firestore(), bucket: admin.storage().bucket() };
