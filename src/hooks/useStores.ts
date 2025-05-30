"use client";
import { FoodStore } from "@/@types";
import { StoresService } from "@/services";
import { useEffect, useState } from "react";

export const useStores = () => {
  const [stores, setStores] = useState<FoodStore[]>([]);

  const getStores = async () => {
    const data = await StoresService.getStores();
    setStores(data.lojas_de_alimentacao);
  };

  useEffect(() => {
    getStores();
  }, []);

  return {
    stores,
  };
};
