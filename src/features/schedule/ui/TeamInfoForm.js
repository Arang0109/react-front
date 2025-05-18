import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

import { fetchStaffList, fetchVehicleList } from 'features/organization/api/teamApi';

import customSelectStyle from 'shared/utils/customSelectStyle';
import { useTeamStore } from 'features/organization';

export default function TeamInfoForm({ updateField, setTeamId }) {
  const { teams, loadTeams } = useTeamStore();
  const [staffs, setStaffs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState([]);

  const optionStaffs = staffs.map(staff => ({
    value: staff.staffId,
    label: staff.staffName,
  }));

  const optionVehicles = vehicles.map(vehicle => ({
    value: vehicle.vehicleId,
    label: `${vehicle.vehicleNumber} | ${vehicle.modelName}`,
  }));

  const { singleStyle, multiStyle } = customSelectStyle();

  useEffect(() => {
    const load = async () => {
      const fetchedStaffs = await fetchStaffList();
      const fetchedVehicles = await fetchVehicleList();
      setStaffs(fetchedStaffs);
      setVehicles(fetchedVehicles);
      await loadTeams();
    };
    load();
  }, [loadTeams]);

  const handleTeamChange = (e) => {
    const selectedTeamId = Number(e.target.id);
    setTeamId(selectedTeamId);

    const selectedTeam = teams.find(team => team.teamId === selectedTeamId);

    if (selectedTeam) {
      const newSelectedStaffs = selectedTeam.staffs.map(staff => ({
        value: staff.staffId,
        label: staff.staffName,
      }));

      const newSelectedVehicle = selectedTeam.vehicles.map(vehicle => ({
        value: vehicle.vehicleId,
        label: `${vehicle.vehicleNumber} | ${vehicle.modelName}`,
      }));

      setSelectedStaffs(newSelectedStaffs);
      setSelectedVehicle(newSelectedVehicle);

      updateField({ teamId: selectedTeamId });
    }
  };

  return (
    <div>
      <div key="inline-radio" className="d-flex">
        {teams.map((team) => (
          <div key={team.teamId}>
            <Form.Check
              className='m-1'
              type="radio"
              name="group"
              id={`${team.teamId}`}
              onChange={handleTeamChange}
              label={`${team.teamName}`}
            />
          </div>
        ))}
      </div>

      <Form.Group className="mb-3" controlId="staff">
        <Form.Label className="common-label">측정인력</Form.Label>
        <Select
          options={optionStaffs}
          value={selectedStaffs} // ✅ 여기!
          onChange={(selected) => setSelectedStaffs(selected)}
          styles={multiStyle}
          isMulti
          placeholder="측정인력을 선택하세요."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="vehicle">
        <Form.Label className="common-label">운행차량</Form.Label>
        <Select
          options={optionVehicles}
          value={selectedVehicle}
          styles={singleStyle}
          onChange={(selected) => setSelectedVehicle(selected)}
          placeholder="운행차량을 선택하세요."
        />
      </Form.Group>
    </div>
  );
}