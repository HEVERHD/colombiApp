import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../services/firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";


export const checkingAuthentication = () => {
    return async (dispatch: any) => {

        dispatch(checkingCredentials());

    }
}


export const startGoogleSignIn = () => {
    return async (dispatch: any) => {

        dispatch(checkingCredentials());

        const result = await singInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result))

    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: any) => {
    return async (dispatch: any) => {

        dispatch(checkingCredentials());

        const result = await registerUserWithEmailPassword({ email, password, displayName });
        if (!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result))

    }

}


export const startLoginWithEmailPassword = ({ email, password }: any) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({ email, password });
        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result));

    }
}


export const startLogout = () => {
    return async (dispatch: any) => {

        await logoutFirebase();

        dispatch(logout({}));

    }
}