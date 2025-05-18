import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { CustomButton } from 'shared/ui/buttons';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function ScheduledStackListTable({ scheduledStacks }) {
  const [columnDefs] = useState([
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
  ]);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true
  }), []);

  const rowSelection = useMemo(() => { 
    return {
          mode: 'multiRow',
      };
  }, []);

  const navigate = useNavigate();

  return(
    <div style={{ height: "100%" }}>
      
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">측정시설 목록</h5>
        <CustomButton text={"추가"} onClick={() => {
          console.log("click");
        }} />
      </div>

      <div style={{ height: 300 }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={scheduledStacks}
          rowSelection={rowSelection}
          defaultColDef={defaultColDef}
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