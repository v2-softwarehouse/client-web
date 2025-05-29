import { signInAnonymously } from "firebase/auth";
import { auth } from "../../firebase";

export class AuthService {
  static signInAnonymously = async () => {
    try {
      await signInAnonymously(auth);
      console.log("Login anônimo realizado com sucesso.");
    } catch (error: any) {
      console.error("Erro no login anônimo:", error.message);
    }
  };
}
