import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type OrderFloatButtonProps = {
  isModalVisible: boolean;
  handleInitOrder: () => void;
};

export const OrderFloatButton = ({
  isModalVisible,
  handleInitOrder,
}: OrderFloatButtonProps) => {
  return (
    <div
      className="fixed bottom-4 right-4 bg-primary p-3 rounded-3xl"
      onClick={handleInitOrder}
    >
      {isModalVisible ? (
        <FontAwesomeIcon icon={faTimes} className="text-secondary fa-xl" />
      ) : (
        <p className="font-bold text-secondary">Fazer pedido</p>
      )}
    </div>
  );
};
