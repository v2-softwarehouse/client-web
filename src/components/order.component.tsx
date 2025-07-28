import { useAuth, useOrder } from "@/hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { LoginRequest, UserRequest } from "@/@types";
import { auth } from "../../firebase";

export const Order = () => {
  const {
    showForm,
    userName,
    statusText,
    currentRoute,
    handleChangeName,
    handleCreateOrder,
    handleCurrentRoute,
  } = useOrder();

  const {
    form,
    errorMessage,
    setEmail,
    setPassword,
    handleLogin,
    handleLogout,
    handleRegister,
    handleSendPasswordResetEmail,
  } = useAuth();

  const onLogin = async () => {
    try {
      await handleLogin();
      handleCurrentRoute("order");
    } catch (error) {
      console.error(error);
    }
  };

  const onRegister = async () => {
    try {
      await handleRegister();
      handleCurrentRoute("order");
    } catch (error) {
      console.error(error);
    }
  };

  const onSendPasswordResetEmail = async () => {
    try {
      await handleSendPasswordResetEmail();
      handleCurrentRoute("login");
    } catch (error) {
      console.error(error);
    }
  };

  const onLogout = async (event: any) => {
    try {
      event.preventDefault();
      await handleLogout();
      handleCurrentRoute("login");
    } catch (error) {
      console.error(error);
    }
  };

  const routes: Record<string, { title: string; component: any }> = {
    login: {
      title: "Fazer login",
      component: (
        <LoginForm
          errorMessage={errorMessage}
          onLogin={onLogin}
          setEmail={setEmail}
          setPassword={setPassword}
          form={form}
          handleCurrentRoute={handleCurrentRoute}
        />
      ),
    },
    send_password_reset_email: {
      title: "Recuperar senha",
      component: (
        <SendPasswordResetEmailForm
          handleCurrentRoute={handleCurrentRoute}
          errorMessage={errorMessage}
          handleSendPasswordResetEmail={onSendPasswordResetEmail}
          setEmail={setEmail}
          email={form.email}
        />
      ),
    },
    register: {
      title: "Fazer cadastro",
      component: (
        <RegisterForm
          errorMessage={errorMessage}
          handleRegister={onRegister}
          setEmail={setEmail}
          setPassword={setPassword}
          form={form}
          handleCurrentRoute={handleCurrentRoute}
        />
      ),
    },
    order: {
      title: "Fazer pedido",
      component: (
        <OrderForm
          onLogout={onLogout}
          statusText={statusText}
          showForm={showForm}
          userName={userName}
          handleChangeName={handleChangeName}
          handleCreateOrder={handleCreateOrder}
        />
      ),
    },
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end items-end">
      <div className="bg-secondary rounded-xl mb-18 h-[500px] w-[300px] w-max-full me-4 flex flex-col">
        <h1 className="text-2xl text-center font-bold p-3">
          {routes[currentRoute].title}
        </h1>
        {routes[currentRoute].component}
      </div>
    </div>
  );
};

const OrderForm = ({
  showForm,
  userName,
  statusText,
  handleChangeName,
  handleCreateOrder,
  onLogout,
}: {
  showForm: boolean;
  userName: string;
  statusText: string;
  handleChangeName: (value: string) => void;
  handleCreateOrder: (event: any) => void;
  onLogout: (event: any) => void;
}) => {
  return (
    <>
      <div className="flex bg-white h-full flex-col p-2">
        <p>{`Logado como: ${auth.currentUser?.email}`}</p>
        <a href="" onClick={onLogout}>
          Encerrar sessão?
        </a>

        <div className="h-fit w-[200px] p-2 mb-1 bg-secondary rounded">
          <p>
            {statusText ||
              `Olá, poderia nos informar seu nome para iniciarmos o pedido?`}
          </p>
        </div>
      </div>
      <form className="mt-auto flex p-4">
        <input
          className="bg-white rounded w-full me-2 h-8 p-1"
          type="text"
          required
          disabled={!showForm}
          value={userName}
          placeholder="Digite..."
          onChange={(e) => handleChangeName(e.target.value)}
        />

        <button type="submit" onClick={handleCreateOrder} disabled={!showForm}>
          <FontAwesomeIcon icon={faChevronCircleUp} className="fa-xl" />
        </button>
      </form>
    </>
  );
};

const LoginForm = ({
  errorMessage,
  setEmail,
  setPassword,
  onLogin,
  form,
  handleCurrentRoute,
}: {
  errorMessage: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  onLogin: () => void;
  form: LoginRequest;
  handleCurrentRoute: (route: string) => void;
}) => {
  const onRegister = (event: any) => {
    event.preventDefault();
    handleCurrentRoute("register");
  };

  const onPasswordReset = (event: any) => {
    event.preventDefault();
    handleCurrentRoute("send_password_reset_email");
  };

  return (
    <div className="p-4">
      <input
        required
        type="email"
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-2"
        value={form.email}
      />

      <input
        required
        type="password"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-2"
        value={form.password}
      />

      <p>{errorMessage}</p>

      <button type="submit" onClick={onLogin}>
        Entrar
      </button>

      <a href="" onClick={onRegister}>
        Cadastrar
      </a>

      <a href="" onClick={onPasswordReset}>
        Esqueci a senha
      </a>
    </div>
  );
};

const RegisterForm = ({
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
      <input
        required
        type="email"
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-2"
        value={form.email}
      />

      <input
        required
        type="password"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-2"
        value={form.password}
      />

      <p>{errorMessage}</p>

      <button onClick={onLogin}>Voltar</button>

      <button type="submit" onClick={onRegister}>
        Concluir
      </button>
    </form>
  );
};

const SendPasswordResetEmailForm = ({
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
      <input
        required
        type="email"
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-2"
        value={email}
      />

      <p>{errorMessage}</p>

      <button onClick={onLogin}>Voltar</button>

      <button type="submit" onClick={handleSendPasswordResetEmail}>
        Enviar
      </button>
    </div>
  );
};
