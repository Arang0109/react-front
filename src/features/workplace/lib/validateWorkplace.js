export function validateWorkplace(data) {
  const errors = {};
  if (!data.workplaceName?.trim()) {
    errors.workplaceName = '사업장을 입력해주세요.';
  }
  return errors;
}