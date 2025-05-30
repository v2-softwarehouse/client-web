import { useStores } from "@/hooks";
import { StoreCard } from "./store-card.component";

export const Stores = () => {
  const { stores, loading } = useStores();

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Carregando</p>
        </div>
      ) : stores && stores.length ? (
        stores.map((store, index) => <StoreCard key={index} store={store} />)
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>Nenhuma loja encontrada</p>
        </div>
      )}
    </>
  );
};
