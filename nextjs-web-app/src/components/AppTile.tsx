"use client";

import { motion } from "framer-motion";
import {
  FaBootstrap,
  FaWind,
  FaLeaf,
  FaPalette,
  FaShieldAlt,
  FaCode,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface AppTileProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  isLoading?: boolean;
  theme: "light" | "dark";
}

interface StyleInfo {
  icon: IconType;
  description: string;
  rightIcon: IconType;
  iconColor: string;
}

const styleMap: Record<string, StyleInfo> = {
  "Minimalist Design": {
    icon: FaLeaf,
    description: "Clean and simple design with plenty of white space",
    rightIcon: FaCode,
    iconColor: "#3cb371",
  },
  "Bold & Vibrant": {
    icon: FaPalette,
    description: "Vibrant colors and dramatic effects",
    rightIcon: FaCode,
    iconColor: "#eb7077",
  },
  "Professional Style": {
    icon: FaShieldAlt,
    description: "Clean and structured corporate style",
    rightIcon: FaCode,
    iconColor: "#06c",
  },
  "Playful Theme": {
    icon: FaWind,
    description: "Fun and colorful with whimsical elements",
    rightIcon: FaCode,
    iconColor: "#38bdf8",
  },
  "Futuristic Look": {
    icon: FaBootstrap,
    description: "Sleek and modern with high-tech aesthetics",
    rightIcon: FaCode,
    iconColor: "#7952b3",
  },
};

export default function AppTile({
  title,
  isSelected,
  onClick,
  isLoading,
  theme,
}: AppTileProps) {
  const style = styleMap[title];
  const LeftIcon = style.icon;
  const RightIcon = style.rightIcon;

  const getBgColor = () => {
    if (isSelected) {
      return "bg-[#2563EB] shadow-lg shadow-blue-500/20";
    }
    return theme === "dark"
      ? "bg-gray-800 hover:bg-gray-700"
      : "bg-white hover:bg-gray-50 border border-gray-200";
  };

  return (
    <motion.div
      onClick={onClick}
      className={`relative p-4 rounded-lg cursor-pointer transition-all duration-200 ${getBgColor()}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        boxShadow: isSelected
          ? "0 8px 24px rgba(37, 99, 235, 0.15)"
          : "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <LeftIcon
            className="w-6 h-6"
            style={{ color: isSelected ? '#ffffff' : style.iconColor }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold mb-1 ${
              isSelected
                ? "text-white"
                : theme === "dark"
                ? "text-gray-100"
                : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm ${
              isSelected
                ? "text-blue-50"
                : theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {style.description}
          </p>
          {isLoading && (
            <div className="mt-2">
              <motion.div
                className={`h-1 w-full rounded-full ${
                  isSelected ? "bg-blue-400" : "bg-blue-200"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <RightIcon
            className={`w-5 h-5 ${
              isSelected
                ? "text-white"
                : theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          />
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800/50 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </motion.div>
  );
}
