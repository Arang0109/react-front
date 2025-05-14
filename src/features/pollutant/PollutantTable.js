import DataTable from 'react-data-table-component';
import { MdEdit } from 'react-icons/md';

const columns = [
  {
    name: '측정항목(KR)',
    selector: row => row.pollutantNameKR,
    sortable: true
  },
  { name: '측정항목(EN)', selector: row => row.pollutantNameEN, wrap: true },
  { name: '측정항목(현대자동차)', selector: row => row.pollutantNameHyundai, wrap: true },
  {
    name: '측정방법',
    selector: row => row.method,
    sortable: true,
    wrap: true,
  },
  {
    name: '채취시간',
    selector: row => row.samplingTime + ' 분',
    wrap: true,
  },
  { name: '채취량', selector: row => row.samplingVolume, wrap: true },
  { name: '기기', selector: row => row.analysisEquipment, wrap: true },
  { name: '공정시험법', selector: row => row.legislationNumber, wrap: true },
  { name: '', cell: () => <button className="btn btn-sm d-flex align-items-center">
    <MdEdit className="me-1" size={18} />
    수정
  </button>},
];

export default function PollutantTable({ pollutants }) {
	return (
		<div>
      <DataTable
        columns={columns}
        data={pollutants}
        responsive
      />
    </div>
	);
}