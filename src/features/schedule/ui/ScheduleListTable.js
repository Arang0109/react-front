import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { useScheduleStore, ScheduleListCard } from "features/schedule";

import { useIsMobile } from 'shared/hooks/useIsMobile';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function ScheduleListTable() {
  const { schedules, loadSchedules } = useScheduleStore();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const handleDoubleClick = (event) => {
    const row = event.data;
    const ids = Array.isArray(row.groupedScheduleIds)
      ? row.groupedScheduleIds
      : (row.groupedScheduleIds ?? "").split(','); // 문자열이면 split 처리
  
    const searchParams = new URLSearchParams();
    ids.forEach(id => searchParams.append('ids', id));
  
    navigate(`/schedules/subSchedules?${searchParams.toString()}`);
  };

  const colDefs = [
    {
      field: "measureDate",
      headerName: "측정일(채취일)",
      resizable: false,
      width: 140
    },
    {
      field: "supStatus",
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
    {
      field: "mainRegNumber",
      headerName: "접수번호",
      resizable: false,
      width: 140,
      valueFormatter: (params) => {
        const reg = params.value;
        const year = new Date().getFullYear().toString().slice(2);
        const purpose = params.data?.measurementPurpose === "SELF" ? "01" : "02"
        const regNum = reg?.toString().padStart(3, "0") ?? "000";
        return `KGAR-${year}-${purpose}-${regNum}`;
      }
    },
    { field: "workplaceName", headerName: "측정대상 사업장" },
    { field: "stackNames", headerName: "측정 시설", flex: 1 },
    {
      field: "teamName",
      headerName: "측정팀",
      resizable: false,
      width: 100
    },
    { field: "address", headerName: "사업지 주소", flex: 1 }
  ];  
  
  return(
    <div style={{ height: "100%" }}>
      {isMobile ? (
        <ScheduleListCard data={schedules} />
      ) : (
        <div style={{ height: 500 }}>
          <AgGridReact
            rowData={schedules}
            columnDefs={colDefs}
            defaultColDef={{ resizable: true, sortable: true, filter: true }}
            animateRows={true}
            onRowDoubleClicked={handleDoubleClick}
          />
        </div>
      )}
    </div>
  );
}