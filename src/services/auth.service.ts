import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export class AuthService {
  static errors: Record<string, string> = {
    INVALID_LOGIN_CREDENTIALS: "Credenciais inválidas",
  };

  static signInAnonymously = async () => {
    try {
      await signInAnonymously(auth);
      console.log("Login anônimo realizado com sucesso.");
    } catch (error: any) {
      console.error("Erro no login anônimo:", error.message);
    }
  };

  static signIn = (params: { email: string; password: string }) => {
    return signInWithEmailAndPassword(auth, params.email, params.password);
  };
}
