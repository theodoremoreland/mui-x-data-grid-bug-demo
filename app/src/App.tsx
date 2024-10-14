import { ReactElement, useState } from "react";

// Material UI
import { Drawer, Button } from "@mui/material";

// Custom components
import Panel from "./Panel";

import "./App.css";

function App(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <Button
        color="success"
        variant="outlined"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open
      </Button>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        ModalProps={{ keepMounted: false }}
        PaperProps={{
          style: {
            height: "100%",
            width: "clamp(200px, 65%, 1400px)",
          },
        }}
      >
        <Panel handleClose={() => setIsOpen(false)} />
      </Drawer>
    </div>
  );
}

export default App;
