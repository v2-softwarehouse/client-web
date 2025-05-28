import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkymKOrvjC8cobaJM5ghL32-rhBBg-Gas",
  authDomain: "my-snack-cd3cb.firebaseapp.com",
  databaseURL: "https://my-snack-cd3cb-default-rtdb.firebaseio.com",
  projectId: "my-snack-cd3cb",
  storageBucket: "my-snack-cd3cb.appspot.com",
  messagingSenderId: "709071649276",
  appId: "1:709071649276:web:2c69414361ed27790c5a79",
  measurementId: "G-9W2VQ59HFL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

let pedidoKey = null;

signInAnonymously(auth)
  .then(() => {
    console.log("Login anônimo realizado com sucesso.");
  })
  .catch((error) => {
    console.error("Erro no login anônimo:", error.message);
  });

const form = document.getElementById("pedidoForm");
const statusDiv = document.getElementById("statusPedido");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();

  if (!nome) {
    statusDiv.innerText = "Digite seu nome para fazer o pedido.";
    return;
  }

  const pedidosRef = ref(db, "pedidos");
  const novoPedidoRef = push(pedidosRef);

  set(novoPedidoRef, {
    nome,
    status: "aguardando aceite"
  })
    .then(() => {
      pedidoKey = novoPedidoRef.key;
      acompanharStatus(pedidoKey);
      statusDiv.innerText = "Pedido enviado! Aguardando aceite...";
      form.style.display = "none";
    })
    .catch((error) => {
      console.error("Erro ao enviar pedido:", error.message);
      statusDiv.innerText = "Erro ao enviar pedido. Tente novamente.";
    });
});

function acompanharStatus(key) {
  const pedidoStatusRef = ref(db, `pedidos/${key}`);
  onValue(pedidoStatusRef, (snapshot) => {
    const pedido = snapshot.val();
    if (pedido && pedido.status) {
      statusDiv.innerText = `Status do seu pedido: ${pedido.status.toUpperCase()}`;
    }
  });
}