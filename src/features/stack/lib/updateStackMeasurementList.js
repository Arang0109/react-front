import { createStackMeasurement } from "features/stack/api/StackMeasurementApi";
import { useStackStore } from "features/stack";

export async function updateStackMeasurementListOnRegister(data, stackId) {
  const { loadStackDetail } = useStackStore.getState();
  await createStackMeasurement(data);
  await loadStackDetail(stackId);
}