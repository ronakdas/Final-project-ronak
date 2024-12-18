
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from 'firebase/auth'
import  { addDoc, Firestore, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { doc, setDoc, getDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDpzOtIdIKUsysQJE5eEynBJe20Sv2qFjU",
  authDomain: "kahanikhaneki-c7937.firebaseapp.com",
  projectId: "kahanikhaneki-c7937",
  storageBucket: "kahanikhaneki-c7937.firebasestorage.app",
  messagingSenderId: "511318078095",
  appId: "1:511318078095:web:24783d318784f7752f76fa",
  measurementId: "G-6050EKCH8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleprovider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)


export const createUserDocument = async (user, userFirstName, userLastName) => {
   if (!user) return;

   const userRef = doc(db, 'users', user.uid);
   const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
       const { email } = user;

       try {
          await addDoc(userRef, {
              email,
               firstName: userFirstName,
                 lastName: userLastName,
            });

           await updateProfile(auth.currentUser, {
                displayName: userFirstName, // Set the username
            });

            console.log('User document created successfully');
        } catch (error) {
            console.error('Error creating user document:', error);
        }
    }
 };
