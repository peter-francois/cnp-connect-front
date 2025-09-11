import { XCircleIcon } from "@heroicons/react/24/solid";

interface CloseButtonInterface {
  onClose: () => void;
}

const CloseButton = ({ onClose }: CloseButtonInterface) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Fermer"
      >
        {<XCircleIcon width={30} className="absolute -top-3 -left-3" />}
      </button>
    </>
  );
};

export default CloseButton;
