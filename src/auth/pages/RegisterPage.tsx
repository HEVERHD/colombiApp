import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
 const dispatch =useDispatch()
 const navigate=useNavigate();

  const formData = {
    email: "hever@gmail.com",
    password: "123456",
    displayName: "Hever Gelis",
  };

  const [errors, setErrors] = useState({}); // Estado para almacenar los errores de validación

  const { displayName, email, password, onInputChange, formState } = useForm(formData);

  const onSubmit = (e: any) => {
    e.preventDefault();


    if (!displayName || !email || !password) {
      setErrors({ message: "Todos los campos son obligatorios" });
      return;
    }

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors({ message: "Por favor, introduce un correo electrónico válido" });
      return;
    }


    if (password.length < 6) {
      setErrors({ message: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }
    dispatch(startCreatingUserWithEmailPassword(formState));
    navigate("/");



  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="displayName">Name</label>
          <input
            placeholder="Nombre completo"
            type="text"
            name="displayName"
            value={displayName}
            onChange={onInputChange}
            
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Correo electrónico"
            type="text"
            name="email"
            value={email}
            onChange={onInputChange}
            
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Contraseña de usuario"
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            
          />
        </div>
        {errors.message && <div style={{ color: 'red' }}>{errors.message}</div>}
        <div className="btn-group">
          <button onClick={onSubmit} type="submit">Register</button>
        </div>
        <div className="link-group">
          <a href="/auth/login">
            Ya tienes una cuenta? Inicia sesión aquí
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};
