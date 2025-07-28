import { UserRequest } from "@/@types";
import { Dispatch, SetStateAction } from "react";

export const RegisterForm = ({
  errorMessage,
  setEmail,
  setPassword,
  handleRegister,
  form,
  handleCurrentRoute,
}: {
  errorMessage: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleRegister: () => void;
  form: UserRequest;
  handleCurrentRoute: (route: string) => void;
}) => {
  const onRegister = (event: any) => {
    event.preventDefault();
    handleRegister();
  };

  const onLogin = (event: any) => {
    event.preventDefault();
    handleCurrentRoute("login");
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
      <label className="text-sm">Senha</label>
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
        type="submit"
        onClick={onRegister}
        className="bg-primary rounded w-full me-2 h-8 p-1 mb-2 text-white font-bold"
      >
        Concluir
      </button>

      <button
        className="border-2 rounded w-full me-2 h-8 p-1 mb-3 font-bold"
        onClick={onLogin}
      >
        Voltar
      </button>
    </form>
  );
};
