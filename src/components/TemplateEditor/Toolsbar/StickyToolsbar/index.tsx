import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import Toolsbar from "..";

const StickyToolsbar = () => {
  const [showStickyTools, setShowStickyTools] = useState(false);

  useMemo(() => {
    const handleScroll = () => {
      console.log(window?.scrollY);
      if (window.scrollY > 220) {
        setShowStickyTools(true);
      } else {
        setShowStickyTools(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: showStickyTools ? "10vh" : "0px",
        left: "15%",
        width: "85%",
        zIndex: 1,
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          width: "1240px",
          mx: "auto",
          borderRadius: "10px",
          boxShadow: "0px 20px 51px 0px rgba(66, 129, 233, 0.30)",
        }}
      >
        <Toolsbar />
      </Box>
    </Box>
  );
};

export default StickyToolsbar;
