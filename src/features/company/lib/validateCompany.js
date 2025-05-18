// features/company/lib/validateCompany.js
export function validateCompany(data) {
  const errors = {};
  if (!data.companyName?.trim()) {
    errors.companyName = '업체명을 입력해주세요.';
  }
  if (!/^\d{3}-\d{2}-\d{5}$/.test(data.bizNumber)) {
    errors.bizNumber = '사업자번호는 000-00-00000 형식이어야 합니다.';
  }
  return errors;
}