import { Button } from "@mui/material";
import React from "react";

interface IProps {
  title: string;
  onClick: () => void;
}
const GlobalButton: React.FC<IProps> = ({ title, onClick }) => {
  return (
    <Button
      onClick={onClick}
      size="small"
      variant="contained"
      sx={{ textTransform: "none", paddingX: "20px" }}
    >
      {title}
    </Button>
  );
};

export default GlobalButton;
