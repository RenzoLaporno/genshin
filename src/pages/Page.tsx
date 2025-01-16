import { useState } from "react";
import Clorinde from "../assets/CLorinde.webp";
import ChangeBannerButton from "../assets/changeBannerButton.png";
import weaponBanner from "../assets/weaponBanner.webp";
import FullscreenPopup from "./components/popup";

const FrontEnd: React.FC = () => {
  const [banner, setBanner] = useState(Clorinde);
  const [open, setOpen] = useState(false);

  const OnClickWeaponBanner = () => {
    setBanner(weaponBanner);
  };

  const OnClickWeaponBanner2 = () => {
    setBanner(Clorinde);
  };

  const onclickopen = () => {
    setOpen(true); // Open the popup
  };

  return (
    <div className="h-screen w-full bg-[url('../assets/background.jpg')] bg-cover bg-center">
      {/* Buttons Container */}
      <div className="justify-center items-center w-full flex scroll-smooth">
        <button className="h-[8%] w-[8%] p-4" onClick={OnClickWeaponBanner2}>
          <img
            src={ChangeBannerButton}
            alt="Centered Image"
            className="object-contain w-full h-full"
          />
        </button>
        <button className="h-[8%] w-[8%] p-4" onClick={OnClickWeaponBanner}>
          <img
            src={ChangeBannerButton}
            alt="Centered Image"
            className="object-contain w-full h-full"
          />
        </button>
        <div className="absolute right-0 flex pr-80 ">
          <span className="flex items-center space-x-1 text-white lg:border-2 border-white/40 lg:text-xl rounded-3xl bg-black/60">
            <img
              src="https://static-genshin.aza.gg/UI/UI_ItemIcon_201.webp"
              alt="Centered Image"
              className="object-contain w-[20%] h-[100%]"
            />
            <span>1600</span>
          </span>
        </div>
      </div>

      {/* Banner Image Container */}
      <div className="flex justify-center items-center h-[80%] w-full">
        <div className="h-[60%] w-[60%] flex justify-center items-center">
          <img src={banner} alt="Centered Image" className="object-contain" />
        </div>
      </div>

      {/* Button to open the popup */}
      <div className="w-full flex justify-end">
        <button className="h-12 w-24" onClick={onclickopen}>
          <img
            src={ChangeBannerButton}
            alt="Centered Image"
            className="object-fill w-full h-full"
          />
        </button>
      </div>

      {/* Conditionally render the popup */}
      <FullscreenPopup isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default FrontEnd;
