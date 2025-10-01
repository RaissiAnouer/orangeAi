import React from "react";
import Button from "@mui/material/Button";

const Buttons = ({ width }) => {
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width,
          backgroundColor: "#ff7300",
          color: "black",
          textTransform: "none",
          boxShadow: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#e66300",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
            transform: "translateY(-3px)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Sign up
      </Button>
    </div>
  );
};

export default Buttons;
