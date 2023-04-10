import React from "react";
import { Card } from "react-bootstrap";

const CardComponent = ({ className, title, list }) => {
  return (
    <div>
      <Card className={className} style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="card-head">{title}</Card.Title>
          <Card.Text className="card-para">
            <ul>
              {list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;
