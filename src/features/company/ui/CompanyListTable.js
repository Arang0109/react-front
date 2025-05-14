import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import { useCompanyStore } from 'features/company';

const columns = [
	{
		name: '측정대행 의뢰업체',
    selector: row => row.companyName,
		cell: row => (
      <Link to={`/companies/${row.companyId}`} style={{ textDecoration: 'none' }}>
        {row.companyName}
      </Link>
    ),
    sortable: true
	},
	{ name: '대표자', selector: row => row.ceoName },
  { name: '사업지 주소', selector: row => row.address },
  { name: '사업자번호', selector: row => row.bizNumber },
];

export default function CompanyListTable() {

  const { companies, loadCompanies } = useCompanyStore();

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return (
    <div>
      <DataTable
        columns={columns}
        data={companies ?? []}
      />
    </div>
    
  );
}
