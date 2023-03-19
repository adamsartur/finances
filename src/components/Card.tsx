import { FC, HTMLProps } from "react";

interface CardProps extends HTMLProps<HTMLDivElement> {
  darkMode?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  darkMode,
  ...props
}) => {
  return (
    <div
      className={`dark:bg-gray-700 rounded-lg shadow-md mx-4 mt-5 mb-10 py-5 px-10${
        darkMode ? "shadow-lg" : ""
      } ${className}`}
      {...props}
    >
      <div className="full-width-minus-4 p-2">{children}</div>
    </div>
  );
};
