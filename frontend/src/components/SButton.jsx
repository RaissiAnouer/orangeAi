import React from "react";
import Button from "@mui/material/Button";

const SButton = ({ width }) => {
  return (
    <div>
      {" "}
      <Button
        variant="outlined"
        sx={{
          width,

          font: "semibold",
          color: "#1a0e9a",
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
            transform: "translateY(-3px)",
          },
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default SButton;
