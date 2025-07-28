import { Dispatch, SetStateAction } from "react";

export const SendPasswordResetEmailForm = ({
  errorMessage,
  setEmail,
  handleSendPasswordResetEmail,
  email,
  handleCurrentRoute,
}: {
  errorMessage: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSendPasswordResetEmail: () => void;
  email: string;
  handleCurrentRoute: (route: string) => void;
}) => {
  const onLogin = (event: any) => {
    event.preventDefault();
    handleCurrentRoute("login");
  };
  return (
    <div className="p-4">
      <label className="text-sm">Email</label>
      <input
        required
        type="email"
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-4"
        value={email}
      />

      {errorMessage && (
        <p className="text-red-700 text-sm text-center mb-4">{errorMessage}</p>
      )}

      <button
        className="bg-primary rounded w-full me-2 h-8 p-1 mb-2 text-white font-bold"
        type="submit"
        onClick={handleSendPasswordResetEmail}
      >
        Enviar
      </button>
      <button
        className="border-2 rounded w-full me-2 h-8 p-1 mb-3 font-bold"
        onClick={onLogin}
      >
        Voltar
      </button>
    </div>
  );
};
