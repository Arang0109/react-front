import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export default function ScheduleListCard({ data }) {
  return (
    <div className="d-flex flex-column gap-3 p-2">
      {data.map((item, idx) => (
        <Card key={idx} className="shadow-sm">
          <Card.Body>
            <Card.Title>
              {item.workplaceName}
            </Card.Title>
            <div className="mb-2">
              <Badge bg={item.supStatus === "COMPLETED" ? "success" : "secondary"}>
                {item.supStatus === "COMPLETED" ? "완료" : "미완료"}
              </Badge>
            </div>
            <div>{item.teamName} {item.staffs}</div>
            <div>{item.measureDate}</div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
