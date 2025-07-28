import { useState } from "react";
import { AuthService } from "@/services";

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

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  return {
    setEmail,
    setPassword,
    handleLogin,
    errorMessage,
  };
};
