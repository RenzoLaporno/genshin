import React from "react";

interface ButtonProps {
  text: string;
  svgContent: React.ReactNode;
  onClick?: () => void; // Optional event handler with void return type
}

const GradientButton: React.FC<ButtonProps> = ({ text, svgContent, onClick }) => {
  return (
    <div
      className="relative font-medium text-lg tracking-wider rounded-full cursor-pointer bg-gradient-to-r from-purple-600 indigo-800 text-white overflow-hidden group"
      onClick={onClick} // Attach the onClick handler to the div
    >
      <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform">
        {svgContent}
      </svg>
      <span className="relative z-10 inline-flex items-center px-5 py-3 group-hover:text-purple-200 transition-colors">
        {text}
      </span>

      {/* Pseudo-elements using a div */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-black group-before:block group-before:w-[120%] group-before:left-[-10%] group-before:skew-x-[30deg] group-before:transition-transform group-hover:group-before:translate-x-full"></div>
    </div>
  );
};

export default GradientButton;
