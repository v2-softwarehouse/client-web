import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { LoginRequest, UserRequest } from "@/@types";

export class AuthService {
  static auth = auth;

  static signInAnonymously = async () => {
    try {
      await signInAnonymously(auth);
      console.log("Login anônimo realizado com sucesso.");
    } catch (error: any) {
      console.error("Erro no login anônimo:", error.message);
      throw error;
    }
  };

  static signIn = async (params: LoginRequest) => {
    try {
      AuthService.logOut();
      return await signInWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );
    } catch (error: any) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  };

  static signUp = async (params: UserRequest) => {
    try {
      AuthService.logOut();
      return await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );
    } catch (error: any) {
      console.error("Erro ao fazer cadastro:", error.message);
      throw error;
    }
  };

  static passwordResetEmail = async (email: string) => {
    try {
      AuthService.logOut();
      return await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error(
        "Erro ao enviar email de recuperação de senha:",
        error.message
      );
      throw error;
    }
  };

  static logOut = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
    } catch (error: any) {
      console.error("Erro ao fazer logout:", error.message);
      throw error;
    }
  };
}
