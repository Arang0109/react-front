import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function SubScheduleListTable({ subSchedules }) {
  const navigate = useNavigate();

  const handleDoubleClick = (event) => {
    const row = event.data;
  
    navigate(`/schedules/${row.groupedScheduleId}`);
  };


  const colDefs = [
    {
      field: "subRegNumber",
      headerName: "접수번호",
      resizable: false,
      filter: false,
      width: 85,
      valueFormatter: (params) => {
        const reg = params.value;
        const regNum = reg?.toString().padStart(2, "0") ?? "00";
        return `${regNum}`;
      }
    },
    {
      field: "subStatus",
      headerName: "상태",
      sortable: false,
      resizable: false,
      width: 80,
      cellRenderer: ({ value }) => {
        return value === "NONCOMPLETED" ? (
          <Badge bg="secondary">미완료</Badge>
        ) : (
          <Badge bg="success">완료</Badge>
        );
      }
    },
    { field: "stackName", headerName: "측정 시설" },
    { field: "pollutantNames", headerName: "측정 항목", flex: 1 }
  ];  
  
  return(
    <div style={{ height: "100%" }}>
      <div style={{ height: 300 }}>
        <AgGridReact
          rowData={subSchedules}
          columnDefs={colDefs}
          defaultColDef={{ resizable: true, sortable: true, filter: true }}
          animateRows={true}
          onRowDoubleClicked={handleDoubleClick}
        />
      </div>
    </div>
  );
}