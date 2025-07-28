import { OrderService } from "@/services";
import { useState } from "react";
import { auth } from "../../firebase";

export const useOrder = () => {
  const [statusText, setStatusText] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(true);

  const [currentRoute, setCurrentRoute] = useState(
    auth.currentUser ? "order" : "login"
  );

  const handleCurrentRoute = (route: string) => setCurrentRoute(route);

  const handleCreateOrder = async (event: any) => {
    try {
      event.preventDefault();
      if (!userName.trim()) {
        setStatusText("Digite seu nome para fazer o pedido.");
        return;
      }

      const orderKey = await OrderService.createOrder(userName);
      setStatusText("Status do seu pedido: AGUARDANDO ACEITE");

      if (orderKey) {
        setShowForm(false);
        handleTrackOrder(orderKey);
        setUserName("");
      }
    } catch (error: any) {
      setStatusText(error);
    }
  };

  const handleChangeName = (value: string) => {
    setUserName(value);
  };

  const handleTrackOrder = (key: string) => {
    OrderService.trackOrder(key, (snapshot) => {
      const order = snapshot.val();
      if (order && order.status) {
        setStatusText(`Status do seu pedido: ${order.status.toUpperCase()}`);
      }
    });
  };

  return {
    userName,
    statusText,
    showForm,
    handleChangeName,
    handleCreateOrder,
    currentRoute,
    handleCurrentRoute,
  };
};
