import { useState } from "react";
import { AuthService } from "@/services";
import { auth } from "../../firebase";

export const useAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await AuthService.signIn({ email, password });
      resetForm();
      console.log(res);
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Credenciais inválidas");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await AuthService.signUp({ email, password });
      resetForm();
      console.log(res);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Erro ao concluir cadastro");
    }
  };

  const handleSendPasswordResetEmail = async () => {
    try {
      const res = await AuthService.passwordResetEmail(email);
      resetForm();
      console.log(res);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error.message || "Erro ao enviar email de recuperação de senha"
      );
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  const handleLogout = async () => {
    try {
      const res = await AuthService.logOut();
      console.log(res);
    } catch (error: any) {
      console.error(error);
    }
  };

  return {
    setEmail,
    setPassword,
    handleLogin,
    errorMessage,
    handleRegister,
    handleSendPasswordResetEmail,
    handleLogout,
    form: {
      email,
      password,
    },
  };
};
