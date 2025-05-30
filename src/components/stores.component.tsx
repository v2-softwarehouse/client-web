import { useStores } from "@/hooks";
import { StoreCard } from "./store-card.component";

export const Stores = () => {
  const { stores } = useStores();

  return (
    <>
      {stores.map((store, index) => (
        <StoreCard key={index} store={store} />
      ))}
    </>
  );
};
