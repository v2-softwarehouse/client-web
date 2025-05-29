import { DataSnapshot, onValue, push, ref, set } from "firebase/database";
import { db } from "../../firebase";

export class OrderService {
  static createOrder = async (name: string) => {
    try {
      const ordersRef = ref(db, "pedidos");
      const newOrderRef = push(ordersRef);

      await set(newOrderRef, {
        nome: name,
        status: "aguardando aceite",
      });

      return newOrderRef.key;
    } catch (error: any) {
      console.error("Erro ao enviar pedido:", error.message);
      throw "Erro ao enviar pedido. Tente novamente.";
    }
  };
  static trackOrder = (
    key: string,
    callback: (snapshot: DataSnapshot) => void
  ) => {
    const orderStatusRef = ref(db, `pedidos/${key}`);
    onValue(orderStatusRef, callback);
  };
}
