import { Button } from "@mui/material";
import React from "react";

interface IProps {
  title: string;
  onClick: () => void;
  loading: boolean;
  color?: string;
  disabled?: boolean;
}
const GlobalButton: React.FC<IProps> = ({
  title,
  onClick,
  loading,
  color,
  disabled,
}) => {
  return (
    <Button
      disabled={loading || disabled}
      color={color === "error" ? "error" : "primary"}
      onClick={onClick}
      size="small"
      variant="contained"
      sx={{ textTransform: "none", paddingX: "20px" }}
    >
      {loading ? "Loading..." : title}
    </Button>
  );
};

export default GlobalButton;
