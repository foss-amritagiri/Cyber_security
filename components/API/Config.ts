import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Config = {
  apiKey: process.env.NEXT_PUBLIC_APP_apiKey,
  authDomain: process.env.NEXT_PUBLIC_APP_authDomain,
  projectId: "cyber-762",
  storageBucket: "cyber-762.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_APP_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_APP_appId,
  measurementId: "G-N6R3ZDCHBV"
};




const app = initializeApp(Config);

const db = getFirestore(app);

export { db  };