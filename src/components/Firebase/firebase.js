import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUEMENT_ID,
};

class Firebase {

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth;
    this.googleAuthProvider = new this.auth.GoogleAuthProvider()
    this.FacebookAuthProvider = new this.auth.FacebookAuthProvider();
    this.auth().useDeviceLanguage();
  }

  signInWithGoogle() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.auth().signInWithPopup(this.googleAuthProvider);
        resolve({
          displayName: result.user.displayName,
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
        });
      } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') {
          reject('Ha ocurrido un error: El usuario ha cerrado la ventana emergente antes de finalizar la operación.');
        } else {
          reject(`Ha ocurrido un error al autenticar al usuario`);
        }
      }
    });
  }

  signInWithFacebook() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.auth().signInWithPopup(this.FacebookAuthProvider);
        resolve({
          displayName: result.user.displayName,
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
        });
      } catch (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.googleAuthProvider.setCustomParameters({ login_hint: error.email });
          const result = await this.auth().signInWithPopup(this.googleAuthProvider);
          result.user.linkWithCredential(error.credential);
          resolve({
            displayName: result.user.displayName,
            email: result.user.email,
            phoneNumber: result.user.phoneNumber,
          });
        } else if (error.code === 'auth/popup-closed-by-user') {
          reject('Ha ocurrido un error: El usuario ha cerrado la ventana emergente antes de finalizar la operación.');
        } else {
          reject(`Ha ocurrido un error al autenticar: ${error}`);
        }
      }
    });
  }

}
export default Firebase;