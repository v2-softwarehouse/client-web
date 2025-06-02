"use client";
import { Order, OrderFloatButton, Stores } from "@/components";
import { AuthService } from "@/services";
import { useEffect, useState } from "react";

export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    AuthService.signInAnonymously();
  }, []);

  const handleInitOrder = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-xl">
        <h1 className="text-2xl text-center font-bold p-3">Lojas</h1>

        <Stores />

        {isModalVisible && <Order />}

        <OrderFloatButton
          isModalVisible={isModalVisible}
          handleInitOrder={handleInitOrder}
        />

        <div className="h-18"></div>
      </div>
    </div>
  );
}
