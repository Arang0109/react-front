export async function handleGroupDeleteEntity({ data, deleteFn, redirectPath, navigate, entityName = '항목' }) {
  if (!window.confirm(`${entityName}을(를) 삭제하시겠습니까?`)) return;

  try {
    await deleteFn(data);
    navigate(redirectPath);
  } catch (error) {
    alert(`${entityName} 삭제에 실패했습니다.`);
    console.error(error);
  }
}