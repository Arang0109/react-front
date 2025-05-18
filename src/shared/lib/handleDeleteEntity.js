// src/shared/lib/handleDeleteEntity.js
export async function handleDeleteEntity({ id, deleteFn, redirectPath, navigate, entityName = '항목' }) {
  if (!window.confirm(`${entityName}을(를) 삭제하시겠습니까?`)) return;

  try {
    await deleteFn(id);
    navigate(redirectPath);
  } catch (error) {
    alert(`${entityName} 삭제에 실패했습니다.`);
    console.error(error);
  }
}