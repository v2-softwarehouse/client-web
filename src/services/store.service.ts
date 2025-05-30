import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";
import { Store } from "@/@types";

const getStores = httpsCallable<unknown, Store>(
  functions,
  "obterLojasAlimentacao"
);

export class StoresService {
  static getStores = async (): Promise<Store> => {
    const { data } = await getStores();
    return data;
  };
}
