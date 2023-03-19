import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isClickInside, setIsClickInside] = useState(false);
  const isClickInsideRef = useRef(false);

  function handleModalContentClick() {
    setIsClickInside(true);
    isClickInsideRef.current = true;
    console.log("modal");
    console.log(isClickInside);
  }

  function handleModalContainerClick(event: React.MouseEvent<HTMLDivElement>) {
    if (
      event.target instanceof Element &&
      event.target.hasAttribute("data-stop-propagation")
    ) {
      event.stopPropagation();
    } else if (!isClickInsideRef.current) {
      onClose();
    }
    setIsClickInside(false);
    isClickInsideRef.current = false;
  }

  useEffect(() => {
    console.log(isClickInside);
  }, [isClickInside]);

  return (
    <>
      {isOpen && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleModalContainerClick}
        >
          <div
            className="bg-white w-96 p-6 rounded-lg relative"
            onClick={handleModalContentClick}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
