import React from "react";

interface FullscreenPopupProps {
  isOpen: boolean;
  onClose: () => void;

}

const FullscreenPopup: React.FC<FullscreenPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 h-[100%] w-[100%] bg-black bg-opacity-50 flex justify-center items-center z-50">
             <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full"
        >
          X
        </button>
      <div className=" w-11/12 h-11/12 rounded-lg flex justify-center items-center p-8 relative">
      
      </div>
    </div>
  );
};

export default FullscreenPopup;
