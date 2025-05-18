import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export default function ScheduleListCard({ data }) {
  return (
    <div className="d-flex flex-column gap-3 p-2">
      {data.map((item, idx) => (
        <Card key={idx} className="shadow-sm">
          <Card.Body>
            <Card.Title>
              {item.mainRegNumber
                ? `KGAR-${new Date().getFullYear().toString().slice(2)}-01-${String(item.mainRegNumber).padStart(3, '0')}`
                : "접수번호 없음"}
            </Card.Title>
            <div className="mb-2">
              <Badge bg={item.supStatus === "COMPLETED" ? "success" : "secondary"}>
                {item.supStatus === "COMPLETED" ? "완료" : "미완료"}
              </Badge>
            </div>
            <div><strong>사업장:</strong> {item.workplaceName}</div>
            <div><strong>측정 시설:</strong> {item.stackNames}</div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
