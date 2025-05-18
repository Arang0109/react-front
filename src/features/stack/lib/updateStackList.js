import { createStack } from "features/stack/api/StackApi";
import { useWorkplaceStore } from "features/workplace";

export async function updateStackListOnRegister(data, workplaceId) {
  const { loadWorkplaceDetail } = useWorkplaceStore.getState();
  await createStack(data);
  await loadWorkplaceDetail(workplaceId);
}