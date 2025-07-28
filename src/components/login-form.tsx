import { LoginRequest } from "@/@types";
import { Dispatch, SetStateAction } from "react";

export const LoginForm = ({
  errorMessage,
  setEmail,
  setPassword,
  handleLogin,
  form,
  handleCurrentRoute,
}: {
  form: LoginRequest;
  errorMessage: string;
  handleLogin: () => void;
  handleCurrentRoute: (route: string) => void;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  const onRegister = (event: any) => {
    event.preventDefault();
    handleCurrentRoute("register");
  };

  const onPasswordReset = (event: any) => {
    event.preventDefault();
    handleCurrentRoute("send_password_reset_email");
  };

  const onLogin = (event: any) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <form className="p-4">
      <label className="text-sm">Email</label>
      <input
        required
        type="email"
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-2"
        value={form.email}
      />

      <label className="text-sm">Password</label>
      <input
        required
        type="password"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-4"
        value={form.password}
      />

      {errorMessage && (
        <p className="text-red-700 text-sm text-center mb-4">{errorMessage}</p>
      )}

      <button
        className="bg-primary rounded w-full me-2 h-8 p-1 mb-3 text-white font-bold"
        type="submit"
        onClick={onLogin}
      >
        Entrar
      </button>

      <p className="text-sm mb-2 text-center">
        {`Ainda não possui conta? `}
        <a href="" onClick={onRegister} className="font-bold">
          {`Crie uma.`}
        </a>
      </p>

      <p className="text-sm text-center">
        {`Esqueceu sua senha? `}
        <a href="" onClick={onPasswordReset} className="font-bold">
          {`Recadastre.`}
        </a>
      </p>
    </form>
  );
};
