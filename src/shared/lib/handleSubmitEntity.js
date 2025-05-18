export function handleSubmitEntity({ validate, api, onSuccess, onError }) {
  return async () => {
    if (validate && !validate()) return;

    try {
      await api();
      onSuccess?.(); // 함수가 있으면 실행
    } catch (error) {
      console.error(error);
      alert('등록에 실패했습니다. 입력값을 확인해주세요.');
    }
  };
}