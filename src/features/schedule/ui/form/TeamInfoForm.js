import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { fetchStaffList, fetchVehicleList } from 'features/organization/api/teamApi';
import { useTeamStore } from 'features/organization';
import customSelectStyle from 'shared/utils/customSelectStyle';

const { singleStyle, multiStyle } = customSelectStyle();
const animatedComponents = makeAnimated();

export default function TeamInfoForm({ updateField, setTeamId }) {
  const { teams, loadTeams } = useTeamStore();

  const [staffs, setStaffs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const load = async () => {
      const fetchedStaffs = await fetchStaffList();
      const fetchedVehicles = await fetchVehicleList();
      await loadTeams();
      setStaffs(fetchedStaffs);
      setVehicles(fetchedVehicles);
    };
    load();
  }, [loadTeams]);

  const handleTeamChange = (e) => {
    const selectedTeamId = Number(e.target.id);
    updateField({ teamId: selectedTeamId });

    const team = teams.find(t => t.teamId === selectedTeamId);
    if (!team) return;

    // 인력 세팅
    const staffOptions = team.staffs.map(s => ({
      value: s.staffId,
      label: s.staffName,
    }));
    setSelectedStaffs(staffOptions);
    updateField({ staffIds: staffOptions.map(opt => opt.value) });

    // 차량 세팅
    const vehicleOptions = team.vehicles.map(v => ({
      value: v.vehicleId,
      label: `${v.vehicleNumber} | ${v.modelName}`,
    }));
    setSelectedVehicle(vehicleOptions[0] || null); // 1개만 선택되게
    if (vehicleOptions[0]) {
      updateField({ vehicleId: vehicleOptions[0].value });
    }
  };

  const handleStaffChange = (selectedOptions) => {
    setSelectedStaffs(selectedOptions);
    updateField({ staffIds: selectedOptions.map(opt => opt.value) });
  };

  const handleVehicleChange = (selectedOption) => {
    setSelectedVehicle(selectedOption);
    updateField({ vehicleId: selectedOption?.value ?? null });
  };

  return (
    <div>
      <div key="inline-radio" className="d-flex flex-wrap">
        {teams.map((team) => (
          <div key={team.teamId}>
            <Form.Check
              className="m-1"
              type="radio"
              name="group"
              id={`${team.teamId}`}
              label={team.teamName}
              onChange={handleTeamChange}
            />
          </div>
        ))}
      </div>

      <Form.Group className="mb-3" controlId="staff">
        <Form.Label className="common-label">측정인력</Form.Label>
        <Select
          options={staffs.map(staff => ({
            value: staff.staffId,
            label: staff.staffName,
          }))}
          value={selectedStaffs}
          onChange={handleStaffChange}
          isMulti
          styles={multiStyle}
          components={animatedComponents}
          placeholder="측정인력을 선택하세요."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="vehicle">
        <Form.Label className="common-label">운행차량</Form.Label>
        <Select
          options={vehicles.map(vehicle => ({
            value: vehicle.vehicleId,
            label: `${vehicle.vehicleNumber} | ${vehicle.modelName}`,
          }))}
          value={selectedVehicle}
          onChange={handleVehicleChange}
          styles={singleStyle}
          placeholder="운행차량을 선택하세요."
        />
      </Form.Group>
    </div>
  );
}