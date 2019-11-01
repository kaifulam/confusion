import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
  if (dish)
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg src={dish.image}></CardImg>
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
}

function RenderComments({ comments }) {
  const comm = comments.map(comment => {
    return (
      <li key={comment.id}>
        {" "}
        {comment.comment} <br />
        {"--"} {comment.author} {", "}
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit"
        }).format(new Date(Date.parse(comment.date)))}{" "}
        <br />{" "}
      </li>
    );
  });
  if (comments)
    return (
      <div className="col-12 col-md-5 m-1">
        <h4> Comments </h4>
        <ul> {comm} </ul>
      </div>
    );
  else return <div></div>;
}

const DishDetail = props => {
  if (props.dish)
    return (
      <div className="container">
        <div className="row">
          {" "}
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.dish.comments} />{" "}
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishDetail;
