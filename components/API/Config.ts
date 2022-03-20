import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Config = {
    apiKey: process.env.NEXT_PUBLIC_APP_apiKey,
    authDomain: process.env.NEXT_PUBLIC_APP_authDomain,
    databaseURL: process.env.NEXT_PUBLIC_APP_databaseURL,
    projectId: process.env.NEXT_PUBLIC_APP_projectId,
    storageBucket: process.env.NEXT_PUBLIC_APP_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_APP_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_APP_appId
  };

const app = initializeApp(Config);

const db = getFirestore(app);

export { db  };