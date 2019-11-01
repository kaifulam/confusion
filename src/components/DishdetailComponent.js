import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDish(dish) {
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

  renderComments(comments) {
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

  render() {
    if (this.props.dish)
      return (
        <div className="container">
          <div className="row">
            {" "}
            {this.renderDish(this.props.dish)}
            {this.renderComments(this.props.dish.comments)}{" "}
          </div>
        </div>
      );
    else return <div></div>;
  }
}

export default DishDetail;
