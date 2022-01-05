import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Icon } from "@material-ui/core";

const ToggleView = ({ onToggle }) => {
  const [alignment, setAlignment] = useState("list");

  const handleAlignment = (e, newAlignment) => {
    setAlignment(newAlignment);
    onToggle(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      size="small"
    >
      <ToggleButton value="list" aria-label="list">
        <Icon>view_list</Icon>
      </ToggleButton>
      <ToggleButton value="grid" aria-label="grid">
        <Icon>view_module</Icon>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleView;
