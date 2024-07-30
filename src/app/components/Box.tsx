// src/components/Box.jsx
import Image from "next/image";
import { useState } from "react";

interface StateProps {
  state: "hideGrey" | "showGreen" | "showRed";
}

interface BoxProps extends StateProps {
  onClick: React.MouseEventHandler<HTMLImageElement>;
  show: boolean;
}

export function Box({ onClick, state, show }: BoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isUnselected = !show;

  const srcMap: Record<"showGreen" | "showRed" | "hideGrey", string> = {
    hideGrey: isHovered ? "/element4.svg" : "/element1.svg",
    showGreen: "/element2.svg",
    showRed: "/element3.svg",
  };

  return (
    <Image
      src={isUnselected ? srcMap.hideGrey : srcMap[state as "showGreen" | "showRed"]}
      alt="box"
      width={120}
      height={120}
      onClick={onClick}
      className={`select-none ${isUnselected ? "box-hover" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}
