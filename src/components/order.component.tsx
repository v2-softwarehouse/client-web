import { useAuth, useOrder } from "@/hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

export const Order = () => {
  const {
    showForm,
    statusText,
    handleChangeName,
    handleCreateOrder,
    userName,
  } = useOrder();

  const { handleLogin, setEmail, setPassword, errorMessage } = useAuth();

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end items-end">
      <div className="bg-secondary rounded-xl mb-18 h-[500px] w-[300px] w-max-full me-4 flex flex-col">
        <h1 className="text-2xl text-center font-bold p-3">Fazer Pedido</h1>

        <StatusText statusText={statusText} />

        <LoginForm
          errorMessage={errorMessage}
          handleLogin={handleLogin}
          setEmail={setEmail}
          setPassword={setPassword}
        />

        <OrderForm
          showForm={showForm}
          userName={userName}
          handleChangeName={handleChangeName}
          handleCreateOrder={handleCreateOrder}
        />
      </div>
    </div>
  );
};

const StatusText = ({ statusText }: { statusText: string }) => {
  return (
    <div className="flex bg-white h-full flex-col p-2">
      <div className="h-fit w-[200px] p-2 mb-1 bg-secondary rounded">
        <p>
          {statusText ||
            "Olá, Poderia nos informar seu nome para iniciarmos o pedido?"}
        </p>
      </div>
    </div>
  );
};

const OrderForm = ({
  showForm,
  userName,
  handleChangeName,
  handleCreateOrder,
}: {
  showForm: boolean;
  userName: string;
  handleChangeName: (value: string) => void;
  handleCreateOrder: (event: any) => void;
}) => {
  return (
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
  );
};

const LoginForm = ({
  errorMessage,
  setEmail,
  setPassword,
  handleLogin,
}: {
  errorMessage: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleLogin: () => void;
}) => {
  return (
    <div className="mt-auto  p-4">
      <input
        required
        type="email"
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-2"
      />

      <input
        required
        type="password"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
        className="bg-white rounded w-full me-2 h-8 p-1 mb-2"
      />

      <p>{errorMessage}</p>

      <button type="submit" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
};
