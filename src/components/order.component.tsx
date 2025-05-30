import { useOrder } from "@/hooks";

export const Order = () => {
  const { showForm, statusText, handleChangeName, handleCreateOrder } =
    useOrder();

  return (
    <>
      <h1 className="text-4xl font-bold">Fazer Pedido</h1>

      {showForm && (
        <form>
          <label className="font-bold">Seu nome:</label>
          <input
            type="text"
            required
            onChange={(e) => handleChangeName(e.target.value)}
          />
          <button type="submit" onClick={handleCreateOrder}>
            Enviar Pedido
          </button>
        </form>
      )}

      <p>{statusText}</p>
    </>
  );
};
