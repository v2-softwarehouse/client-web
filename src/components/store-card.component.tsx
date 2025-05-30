import { FoodStore } from "@/@types";
import { StoreComboRaw } from "./store-combo-raw.component";

type StoreCardProps = {
  store: FoodStore;
};

export const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <div className="p-4 m-4 rounded-xl  shadow">
      <div className="mb-4">
        <p className="text-xs">
          {store.categoria} | {store.localizacao}
        </p>
        <h2 className="text-3xl mb-1">{store.nome}</h2>
        <p className="text-xs">
          {store.contato.site} | {store.contato.telefone}
        </p>
      </div>

      <p className="text-2xl mb-3">Combos</p>

      {store.pacotes.map((combo, index) => (
        <StoreComboRaw key={index} combo={combo} />
      ))}
    </div>
  );
};
