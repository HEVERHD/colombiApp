import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineGoogle } from "react-icons/ai";
import { AuthLayout } from "../layout/AuthLayout";

import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { RootState } from "../../types";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status, errorMessage } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({ message: "" });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setErrors({ message: "Todos los campos son obligatorios" });
      return;
    }
    dispatch(startLoginWithEmailPassword({ email, password }) as any);
  };

  const onGoogleSignIn = () => {
    console.log("Google Sign In");
    dispatch(startGoogleSignIn() as any);
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</div>}
          {errors.message && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.message}</div>}
          <div className="btn-group">
            <button disabled={status === "checking"} type="submit">Login</button>
            <button disabled={status === "checking"} onClick={onGoogleSignIn} type="button">
              <AiOutlineGoogle />
              Google
            </button>
          </div>
          <div className="link-group">
            <a href="/auth/login#/register">Create an account</a>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login
