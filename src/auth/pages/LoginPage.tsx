import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineGoogle } from "react-icons/ai";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({}); // Estado para almacenar los errores de validación

  const { email, password, onInputChange } = useForm({
    email: "hever@gmail.com",
    password: "123456"
  });

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      setErrors({ message: "Todos los campos son obligatorios" });
      return;
    }

    // Si todas las validaciones pasan, puedes enviar los datos al servidor
    console.log("Datos del formulario:", { email, password });
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("Google Sign In");
    dispatch(startGoogleSignIn());
  };

  return (
    <>
      <AuthLayout title="Login">
        
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div className="input-group password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>
          {errorMessage && <div style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</div>} 
           {errors.message && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.message}</div>}
          <div className="btn-group">
            <button disabled={isAuthenticating} type="submit">Login</button>
            <button disabled={isAuthenticating} onClick={onGoogleSignIn} type="button">
              <AiOutlineGoogle />
              Google
            </button>
          </div>
          <div className="link-group">
            <a href="/auth/register">Create an account</a>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};
