import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { useScheduledWorkplaceStore, ScheduleListCard } from "features/schedule";

import { useIsMobile } from 'shared/hooks/useIsMobile';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function ScheduledWorkplaceListTable() {
  const { scheduledWorkplaces, loadScheduledWorkplaces } = useScheduledWorkplaceStore();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    loadScheduledWorkplaces();
  }, [loadScheduledWorkplaces]);

  const colDefs = [
    {
      field: "measureDate",
      headerName: "측정일(채취일)",
      resizable: false,
      width: 140
    },
    {
      field: "status",
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
    { field: "workplaceName", headerName: "측정대상 사업장" },
    {
      field: "stackNames",
      headerName: "측정 시설",
    },
    {
      field: "teamName",
      headerName: "측정팀",
      resizable: false,
      width: 100
    },
    {
      field: "staffs",
      headerName: "측정인력"
    },
    { field: "address", headerName: "사업지 주소", flex: 1 },
    
    { field: "scheduledWorkplaceId", hide: true },
    { field: "workplaceId", hide: true },
    { field: "teamId", hide: true },
  ];  
  
  return(
    <div style={{ height: "100%" }}>
      {isMobile ? (
        <ScheduleListCard data={scheduledWorkplaces} />
      ) : (
        <div style={{ height: 500 }}>
          <AgGridReact
            rowData={scheduledWorkplaces}
            columnDefs={colDefs}
            defaultColDef={{ resizable: true, sortable: true, filter: true }}
            animateRows={true}
            onRowDoubleClicked={
              (target) => {
                navigate({
                  pathname: `${target.data.scheduledWorkplaceId}`,
                })
              }}
          />
        </div>
      )}
    </div>
  );
}