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
import { Loading } from './LoadingComponents';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !val || (val.length <= len);

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <FadeTransform in
          transformProps={{
            exitTransform: 'scale(0.5) translate(-50%)'
          }}>
          <Card>
            <CardImg src={baseUrl + dish.image}></CardImg>
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
}

function RenderComments({ comments, toggle, postComment, dishId }) {
  if (comments != null) {
    const comm = comments.map(comment => {
      return (
        <Fade in>
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
        </Fade>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4> Comments </h4>
        <ul className='list-unstyled'>
          <Stagger in>
            {comm}
          </Stagger>
        </ul>
        <CommentForm toggle={toggle} dishId={dishId} postComment={postComment} />
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
      isModalOpen: false,
      isNavOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.hadnleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    console.log('Current State is: ' + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    //event.preventDefault();
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }
    else if (this.props.erMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    }
    else if (this.props.dish != null)
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
            <RenderComments comments={this.props.comments}
              postComment={this.props.postComment}
              dishId={this.props.dishId}
              toggle={this.toggleModal} />
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
