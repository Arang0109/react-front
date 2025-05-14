import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function ScheduledStackListTable({ scheduledStacks }) {
  const navigate = useNavigate();

  const colDefs = [
    {
      field: "status",
      headerName: "상태",
      sortable: false,
      resizable: false,
      width: 100,
      cellRenderer: ({ value }) => {
        switch (value) {
          case "MEASURING":
            return <Badge bg="secondary">측정중</Badge>;
          case "HANDOVER":
            return <Badge bg="warning" text="dark">인수인계</Badge>;
          case "ANALYZING":
            return <Badge bg="info">분석중</Badge>;
          case "COMPLETED":
            return <Badge bg="success">분석완료</Badge>;
          default:
            return <Badge bg="light" text="dark">미정</Badge>;
        }
      }
    },
    { field: "stackName", headerName: "측정 시설" },
    { field: "pollutantNames", headerName: "측정 항목", flex: 1 },
    { field: "analysisStartDate", headerName: "분석 시작일" },
    { field: "analysisEndDate", headerName: "분석 종료일" },
  ];  
  
  return(
    <div style={{ height: "100%" }}>
      <div style={{ height: 300 }}>
        <AgGridReact
          rowData={scheduledStacks}
          columnDefs={colDefs}
          defaultColDef={{ resizable: true, sortable: true, filter: true }}
          animateRows={true}
          onRowDoubleClicked={(target) => {
            navigate({
              pathname: `${target.data.scheduledWorkplaceId}`,
            })
          }}
        />
      </div>
    </div>
  );
}