"use client";
import React, { useEffect, useState } from "react";
import { ref, push, set, onValue } from "firebase/database";
import { db, auth } from "../../firebase";
import { signInAnonymously } from "firebase/auth";

let pedidoKey = null;

export default function Home() {
  const [statusText, setStatusText] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(true);

  useEffect(() => setup(), []);

  const setup = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log("Login anônimo realizado com sucesso.");
      })
      .catch((error) => {
        console.error("Erro no login anônimo:", error.message);
      });
  };

  const submit = () => {
    if (!userName.trim()) {
      setStatusText("Digite seu nome para fazer o pedido.");
      return;
    }

    const pedidosRef = ref(db, "pedidos");
    const novoPedidoRef = push(pedidosRef);

    set(novoPedidoRef, {
      nome: userName,
      status: "aguardando aceite",
    })
      .then(() => {
        pedidoKey = novoPedidoRef.key;
        acompanharStatus(pedidoKey);
        setStatusText("Pedido enviado! Aguardando aceite...");
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Erro ao enviar pedido:", error.message);
        setStatusText("Erro ao enviar pedido. Tente novamente.");
      });
  };

  const acompanharStatus = (key: string) => {
    const pedidoStatusRef = ref(db, `pedidos/${key}`);
    onValue(pedidoStatusRef, (snapshot) => {
      const pedido = snapshot.val();
      if (pedido && pedido.status) {
        setStatusText(`Status do seu pedido: ${pedido.status.toUpperCase()}`);
      }
    });
  };

  return (
    <>
      <h1>Fazer Pedido</h1>

      {showForm && (
        <>
          <label>Seu nome:</label>
          <input
            type="text"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit" onClick={submit}>
            Enviar Pedido
          </button>
        </>
      )}

      <p>{statusText}</p>
    </>
  );
}
