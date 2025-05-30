"use client";
import { FoodStore } from "@/@types";
import { StoresService } from "@/services";
import { useEffect, useState } from "react";

export const useStores = () => {
  const [stores, setStores] = useState<FoodStore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getStores = async () => {
    try {
      const data = await StoresService.getStores();
      setStores(data.lojas_de_alimentacao);
    } catch (error) {
      console.log(error);
      alert("Erro ao carregar informações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  return {
    stores,
    loading,
  };
};
