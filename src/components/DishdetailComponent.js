import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !val || (val.length <= len);

function RenderDish({ dish }) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.erMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if (props.dish 1 + null)
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

function RenderComments({ comments, toggle, addComment, dishId }) {
  if (comments) {
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
    return (
      <div className="col-12 col-md-5 m-1">
        <h4> Comments </h4>
        <ul> {comm} </ul>
        <CommentForm toggle={toggle} dishId={dishId} addComment={addComment} />
      </div>
    );
  }
  else return <div></div>;
}

function CommentForm(props) {
  return (
    <div>
      <Button onClick={props.toggle}>Submit Comment</Button>
    </div>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId);
    console.log('Current State is: ' + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    //event.preventDefault();
  }

  render() {
    if (this.props.dish)
      return (
        <div className="container">
          <div>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
            </div>
          </div>

          <div className="row">
            {" "}
            <RenderDish dish={this.props.dish} />
            <RenderComments comments={this.props.comments} toggle={this.toggleModal} />
          </div>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader> Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className='form-group'>
                  <Label md={2}>Rating</Label>
                  <Col md={10}>
                    <Control.select model='.rating' name='rating' className='form-control'>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className='form-group'>
                  <Label htmlFor='author' md={2}>Your Name</Label>
                  <Col md={10}>
                    <Control.text model='.author' id='author' name='author'
                      placeholder='Your Name'
                      className='form-control'
                      validators={{
                        minLength: minLength(3),
                        maxLength: maxLength(15)
                      }}
                    />
                    <Errors className='text-danger' model='.author' show='touched'
                      messages={{
                        minLength: 'Name must be longer than 2 characters',
                        maxLength: 'Name must be shorter than 15 characters'
                      }}
                    />
                  </Col>
                </Row>
                <Row className='form-group'>
                  <Label htmlFor='comComment' md={2}>Comment</Label>
                  <Col md={10}>
                    <Control.textarea model='.comComment' id='comComment' name='comComment'
                      rows='6'
                      placeholder=''
                      className='form-control'
                    />
                  </Col>
                </Row>
                <Row className='form-group'>
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type='submit' color='primary'>Submit</Button>
                  </Col>
                </Row>

              </LocalForm>

            </ModalBody>
          </Modal>


        </div>
      );
    else return <div></div>;
  };
}
export default DishDetail;
