export function validateStackMeasurement(data) {
  const errors = {};

  if (isNaN(data.allowValue)) {
    errors.allowValue = '허용 기준치는 숫자여야 합니다.'
  }

  if (isNaN(data.oxygenConcentration)) {
    errors.oxygenConcentration = '표준산소농도는 숫자여야 합니다.'
  }

  return errors;
}