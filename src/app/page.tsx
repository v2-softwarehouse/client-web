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
    <div className="p-4 h-dvh">
      <Stores />

      {isModalVisible && <Order />}

      <OrderFloatButton
        isModalVisible={isModalVisible}
        handleInitOrder={handleInitOrder}
      />

      <div className="h-18"></div>
    </div>
  );
}
