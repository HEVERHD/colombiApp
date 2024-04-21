import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useNavigate } from 'react-router-dom';

interface FormErrors {
  message: string;
}

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = {
    email: "hever@gmail.com",
    password: "123456",
    displayName: "Hever Gelis",
  };

  const [errors, setErrors] = useState<FormErrors | null>(null);

  const { displayName, email, password, onInputChange }: any = useForm({
    ...formData,
    password: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    dispatch<any>(startCreatingUserWithEmailPassword({ email, password, displayName }));
    navigate("/");
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="displayName"> Nombre de usuario</label>
          <input
            placeholder="Nombre completo"
            type="text"
            name="displayName"
            value={displayName}
            onChange={onInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email"> Correo Electrónico</label>
          <input
            placeholder="Correo electrónico"
            type="email"
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password"> Contraseña</label>
          <input
            placeholder="Contraseña de usuario"
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </div>
        {errors && <div style={{ color: 'red' }}>{errors.message}</div>}
        <div className="btn-group">
          <button type="submit">
            Registrarse
          </button>
        </div>
        <div className="link-group">
          <a href="/">
            Ya tienes una cuenta? Inicia sesión aquí
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
