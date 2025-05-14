import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: '배출 시설',
    selector: row => row.stackName,
    cell: row => (
      <Link to={`/stacks/${row.stackId}`} style={{ textDecoration: 'none' }}>
        {row.stackName}
      </Link>
    ),
    sortable: true
  },
  { name: '배출시설 종류', selector: row => row.stackType },
  { name: '방지시설 종류', selector: row => row.prevention },
  { name: 'sems 번호', selector: row => row.semsNumber },
  { name: '배출구 종별', selector: row => row.stackSize + " 종" },
  { name: '등록일', selector: row => row.regDate },
];

export default function StackListTable({ stacks }) {
	return (
		<div>
      <DataTable
        columns={columns}
        data={stacks ?? []}
      />
    </div>
	);
}