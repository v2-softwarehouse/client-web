"use client";
import { Order, Stores } from "@/components";
import { AuthService } from "@/services";
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
    <>
      <Stores />

      {isModalVisible && (
        <div className="fixed inset-0 bg-secondary m-6 p-4 rounded-2xl mb-18 shadow-xl">
          <Order />
        </div>
      )}

      <div
        className="fixed bottom-4 right-4 bg-primary p-3 rounded-3xl"
        onClick={handleOrder}
      >
        <p className="font-bold text-secondary">Fazer pedido</p>
      </div>
    </>
  );
}
