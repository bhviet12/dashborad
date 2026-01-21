import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import clsx from "clsx";

type AppButtonColor =
  | "primary"
  | "secondary"
  | "third"
  | "transparent"
  | "custom";

interface AppButtonProps extends ButtonProps {
  colorType?: AppButtonColor;
  customColor?: string;
}

const colorMap = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-blue-500 text-white hover:bg-blue-600",
  third: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  transparent: "bg-transparent text-white border border-white",
  custom: "",
};

const AppButton = ({
  children,
  colorType = "primary",
  customColor,
  className,
  ...props
}: AppButtonProps) => {
  return (
    <Button
      {...props}
      className={clsx(
        "rounded-lg px-4 py-2 normal-case shadow-none",
        colorMap[colorType],
        className
      )}
      sx={
        colorType === "custom" && customColor
          ? {
              backgroundColor: customColor,
              color: "#fff",
              "&:hover": {
                backgroundColor: customColor,
                opacity: 0.9,
              },
            }
          : undefined
      }
    >
      {children}
    </Button>
  );
};

export default AppButton;
