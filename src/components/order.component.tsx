import { useOrder } from "@/hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";

export const Order = () => {
  const { showForm, statusText, handleChangeName, handleCreateOrder } =
    useOrder();

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end items-end">
      <div className="bg-secondary rounded-xl mb-18 h-[500px] w-[300px] w-max-full me-4 flex flex-col">
        <h1 className="text-2xl text-center font-bold p-3">Fazer Pedido</h1>

        <div className="flex bg-white h-full flex-col p-2">
          <div className="h-fit w-[200px] p-2 mb-1 bg-secondary rounded">
            {statusText ? (
              <p>{statusText}</p>
            ) : (
              <p>
                Olá, Poderia nos informar seu nome para iniciarmos o pedido?
              </p>
            )}
          </div>
        </div>

        <form className="mt-auto flex p-4">
          {/* {showForm ? ( */}
          <>
            <input
              className="bg-white rounded w-full me-2 h-8 p-1"
              type="text"
              required
              disabled={!showForm}
              placeholder="Digite..."
              onChange={(e) => handleChangeName(e.target.value)}
            />

            <button
              type="submit"
              onClick={handleCreateOrder}
              disabled={!showForm}
            >
              <FontAwesomeIcon icon={faChevronCircleUp} className="fa-xl" />
            </button>
          </>
          {/* )} */}
        </form>
      </div>
    </div>
  );
};
