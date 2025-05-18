export function validateStack(data) {
  const errors = {};
  if (!data.stackName?.trim()) {
    errors.stackName = '측정시설을 입력해주세요.';
  }

  if (isNaN(data.preventionCapacity)) {
    errors.preventionCapacity = '방지시설 용량은 숫자여야 합니다.'
  }

  if (isNaN(data.semsNumber)) {
    errors.semsNumber = 'sems 번호는 숫자여야 합니다.'
  }

  return errors;
}