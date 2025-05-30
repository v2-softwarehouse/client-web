"use client";
import { Order, Stores } from "@/components";
import { AuthService } from "@/services";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    AuthService.signInAnonymously();
  }, []);

  const handleOrder = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div className="p-4 pb-20">
      <Stores />

      {isModalVisible && <Order />}

      <div
        className="fixed bottom-4 right-4 bg-primary p-3 rounded-3xl"
        onClick={handleOrder}
      >
        {isModalVisible ? (
          <FontAwesomeIcon icon={faTimes} className="text-secondary fa-xl" />
        ) : (
          <p className="font-bold text-secondary">Fazer pedido</p>
        )}
      </div>
    </div>
  );
}
