import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { Fireauth } from './config';



const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

    try {
        
        const result = await signInWithPopup(Fireauth, googleProvider );
        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
        

    } catch (error: any) {
        const errorMessage = error.message;
    
        return {
            ok: false,
            errorMessage,
        }
    }

}


export const registerUserWithEmailPassword = async({ email, password, displayName }:any) => {

    try {
        const resp = await createUserWithEmailAndPassword( Fireauth, email, password );
        const { uid, photoURL } = resp.user;

        if (Fireauth.currentUser) {
            await updateProfile( Fireauth.currentUser, { displayName });
        }

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error: any) {
        return { ok: false, errorMessage: error.message }
    }

}


export const loginWithEmailPassword = async({ email, password }:any) => {

    try {
        const resp = await signInWithEmailAndPassword( Fireauth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error: any) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    return await Fireauth.signOut();
}