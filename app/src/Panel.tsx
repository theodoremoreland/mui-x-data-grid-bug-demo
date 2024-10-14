import { ReactElement, SyntheticEvent, useEffect, useState } from "react";

import { Close, Delete, Refresh } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

interface Props {
  handleClose: () => void;
}

const sortModel: GridSortModel | undefined = [
  {
    field: "age",
    sort: "asc",
  },
];

const columns: GridColDef<Person>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rows: Person[] = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 13 },
  { id: 6, lastName: "Melisandre", firstName: "Jerry", age: 99 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Smith", firstName: "John", age: 30 },
  { id: 11, lastName: "Doe", firstName: "Jane", age: 25 },
  { id: 12, lastName: "Brown", firstName: "Charlie", age: 40 },
  { id: 13, lastName: "Johnson", firstName: "Chris", age: 50 },
  { id: 14, lastName: "Williams", firstName: "Pat", age: 60 },
  { id: 15, lastName: "Jones", firstName: "Alex", age: 20 },
  { id: 16, lastName: "Garcia", firstName: "Taylor", age: 35 },
  { id: 17, lastName: "Martinez", firstName: "Jordan", age: 45 },
  { id: 18, lastName: "Rodriguez", firstName: "Morgan", age: 55 },
  { id: 19, lastName: "Martinez", firstName: "Casey", age: 65 },
  { id: 20, lastName: "Hernandez", firstName: "Riley", age: 75 },
  { id: 21, lastName: "Lopez", firstName: "Quinn", age: 85 },
  { id: 22, lastName: "Gonzalez", firstName: "Peyton", age: 95 },
  { id: 23, lastName: "Wilson", firstName: "Skyler", age: 70 },
  { id: 24, lastName: "Anderson", firstName: "Dakota", age: 65 },
  { id: 25, lastName: "Thomas", firstName: "Reese", age: 55 },
  { id: 26, lastName: "Taylor", firstName: "Avery", age: 45 },
  { id: 27, lastName: "Moore", firstName: "Harper", age: 35 },
  { id: 28, lastName: "Jackson", firstName: "Rowan", age: 25 },
  { id: 29, lastName: "Martin", firstName: "Sawyer", age: 15 },
  { id: 30, lastName: "Lee", firstName: "Emerson", age: 20 },
  { id: 31, lastName: "Perez", firstName: "Finley", age: 30 },
  { id: 32, lastName: "Thompson", firstName: "Blake", age: 40 },
  { id: 33, lastName: "White", firstName: "Hayden", age: 50 },
  { id: 34, lastName: "Harris", firstName: "Parker", age: 60 },
  { id: 35, lastName: "Sanchez", firstName: "Rory", age: 70 },
  { id: 36, lastName: "Clark", firstName: "Remy", age: 80 },
  { id: 37, lastName: "Ramirez", firstName: "River", age: 90 },
  { id: 38, lastName: "Lewis", firstName: "Sage", age: 99 },
  { id: 39, lastName: "Robinson", firstName: "Tatum", age: 85 },
  { id: 40, lastName: "Walker", firstName: "Teagan", age: 75 },
  { id: 41, lastName: "Young", firstName: "Wren", age: 65 },
  { id: 42, lastName: "Allen", firstName: "Zion", age: 55 },
  { id: 43, lastName: "King", firstName: "Arden", age: 45 },
  { id: 44, lastName: "Wright", firstName: "Briar", age: 35 },
  { id: 45, lastName: "Scott", firstName: "Cameron", age: 25 },
  { id: 46, lastName: "Torres", firstName: "Dakota", age: 15 },
  { id: 47, lastName: "Nguyen", firstName: "Elliot", age: 20 },
  { id: 48, lastName: "Hill", firstName: "Frankie", age: 30 },
  { id: 49, lastName: "Flores", firstName: "Gray", age: 40 },
  { id: 50, lastName: "Green", firstName: "Harley", age: 50 },
];

function Grid1(): ReactElement {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "description",
      headerName: "Description",
      width: 500,
    },
  ];
  const rows = [
    { id: 1, description: "Click 'Reset' button to reset Grid #2's state." },
  ];
  return (
    <DataGrid
      sx={{
        border: "none",
      }}
      rows={rows}
      columns={columns}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
      }}
    />
  );
}

function Grid2({ rows }: { rows: Person[] }): ReactElement {
  return (
    <DataGrid
      sx={{
        border: "none",
      }}
      rows={rows}
      columns={columns}
      initialState={{
        sorting: {
          sortModel,
        },
        pagination: {
          paginationModel: {
            page: 0,
            pageSize: 50,
          },
        },
      }}
      pageSizeOptions={[10, 30, 50]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
}

function Panel({ handleClose }: Props): ReactElement {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [stateRows, setStateRows] = useState<Person[]>(rows);

  useEffect(() => {
    setStateRows(rows);
  }, []);

  const handleTabSelection = (_: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Stack
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={4}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "16px 0px",
        }}
      >
        <Typography
          component="h2"
          variant="h1"
          style={{
            fontSize: "1.25rem",
            fontWeight: 500,
            padding: "0px 16px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          scrollTop Bug Demo
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <Divider
        style={{
          marginTop: 0,
          width: "100%",
        }}
      />
      <Stack
        style={{
          position: "relative",
          width: "95%",
          minHeight: 400,
          height: "73vh",
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
      >
        <Stack
          position="relative"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1}
        >
          <Tabs value={selectedTab} onChange={handleTabSelection} aria-label="">
            <Tab label="Grid #1" />
            <Tab label="Grid #2" />
          </Tabs>
          <Stack
            position="relative"
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
            marginRight={1}
          >
            {selectedTab === 0 ? (
              <Button
                title="Reset"
                startIcon={<Refresh />}
                variant="contained"
                onClick={() => setStateRows(rows)}
              >
                Reset
              </Button>
            ) : (
              <>
                <Button
                  title="Delete"
                  startIcon={<Delete />}
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setStateRows(rows.slice(0, 9));
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Stack>
        </Stack>

        {selectedTab === 0 ? <Grid1 /> : <Grid2 rows={stateRows} />}
      </Stack>
    </Stack>
  );
}

export default Panel;
