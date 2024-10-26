import Box from "@mui/material/Box";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Location } from "../mocks/db";
import { Circle, Star, StarBorder } from "@mui/icons-material";
import { api } from "../API";

interface DataTableProps {
  locations: Location[];
  starred: Location["id"][];
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Row {
  id: number;
  starred: boolean;
  locationName: string;
  robotId: string;
  locationTypes: "serving" | "Disnifection";
}

const DataTable = (props: DataTableProps) => {
  const { locations, starred, setTrigger } = props;
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "starred",
      headerName: "STAR",
      width: 90,
      renderCell: (params: GridRenderCellParams) =>
        params.row.starred ? (
          <Star
            onClick={async () => {
              await api.addStarred(
                starred.filter((st) => st !== params.row.id),
              );
              setTrigger((t) => !t);
            }}
          />
        ) : (
          <StarBorder
            onClick={async () => {
              try {
                await api.addStarred([...starred, params.row.id]);
                setTrigger((t) => !t);
              } catch (e) {
                alert("Could not star an item due to unexpected error");
              }
            }}
          />
        ),
    },
    {
      field: "locationName",
      headerName: "Locations",
      width: 350,
      renderCell: (params: GridRenderCellParams) =>
        params.row.robot.is_online ? (
          <button style={{ backgroundColor: "#0091FF" }}>
            {params.row.locationName}
          </button>
        ) : (
          <button style={{ backgroundColor: "#BCBCBC" }}>
            {params.row.locationName}
          </button>
        ),
    },
    {
      field: "robotId",
      headerName: "Robots",
      width: 250,
      renderCell: (params: GridRenderCellParams) =>
        params.row.robot.is_online ? (
          <div>
            <Circle style={{ color: "green" }} /> {params.row.robotId}
          </div>
        ) : (
          <div>Add</div>
        ),
    },
    {
      field: "locationTypes",
      headerName: "Location Types",
      width: 280,
    },
  ];
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    const mapped: Row[] = locations.map((current) => {
      return {
        id: current.id,
        starred: starred.includes(current.id),
        locationName: current.name,
        robotId: current.robot.id,
        locationTypes: "serving",
        robot: current.robot,
      };
    });
    setRows(mapped);
  }, [locations, starred]);
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        hideFooter={true}
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
export default DataTable;
