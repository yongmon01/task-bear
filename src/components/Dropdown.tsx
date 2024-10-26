import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { GroupType } from "../pages/FleetPage";
import { memo } from "react";
import { Star } from "@mui/icons-material";
import { Location } from "../mocks/db";

interface DropdownProps {
  setGroupType: React.Dispatch<React.SetStateAction<GroupType>>;
  starred: Location["id"][];
}

export const Dropdown = (props: DropdownProps) => {
  const { setGroupType, starred } = props;
  const handleClick = (e: SelectChangeEvent<string>) => {
    if (e.target.value === "Starred") setGroupType("starred");
    else setGroupType("all");
  };
  return (
    <FormControl fullWidth sx={{ width: "300px" }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={"All Locations"}
        onChange={handleClick}
      >
        <MenuItem value={"All Locations"}>All Locations</MenuItem>
        <MenuItem value={"Starred"}>
          <Star /> Starred {starred.length}
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default memo(Dropdown);
