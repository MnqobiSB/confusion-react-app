/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
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
	Label,
	Col,
	Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDish ({ dish }) {
	return (
		<div className="col-12 col-md-5 m-1">
			<Card>
				<CardImg
					width="100%"
					src={baseUrl + dish.image}
					alt={dish.name}
				/>
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal () {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit (values) {
		this.toggleModal();
		this.props.postComment(
			this.props.dishId,
			values.rating,
			values.author,
			values.comment
		);
	}

	render () {
		return (
			<React.Fragment>
				<Modal
					isOpen={this.state.isModalOpen}
					toggle={this.toggleModal}
				>
					<ModalHeader toggle={this.toggleModal}>
						Submit Comment
					</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => this.handleSubmit(values)}
						>
							<Row className="form-group">
								<Label htmlFor="rating" sm={12}>
									Rating
								</Label>
								<Col sm={12}>
									<Control.select
										model=".rating"
										className="control-form w-100"
										name="rating"
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>

							<Row className="form-group">
								<Label htmlFor="author" md={12}>
									Your Name
								</Label>
								<Col md={12}>
									<Control.text
										model=".author"
										className="form-control"
										id="author"
										name="author"
										placeholder="Your Name"
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15)
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											required: 'Required',
											minLength:
												'Must be greater than 2 characters',
											maxLength:
												'Must be 15 characters or less'
										}}
									/>
								</Col>
							</Row>

							<Row className="form-group">
								<Label htmlFor="comment" md={12}>
									Comment
								</Label>
								<Col md={12}>
									<Control.textarea
										model=".comment"
										className="form-control"
										id="comment"
										name="comment"
										rows="6"
									/>
								</Col>
							</Row>

							<Row className="form-group">
								<Col md={12}>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-edit fa-lg" /> Submit Comment
				</Button>
			</React.Fragment>
		);
	}
}

function RenderComments ({ comments, postComment, dishId }) {
	const usersComments = comments.map((comment) => {
		return (
			<ul className="list-unstyled" key={comment.id}>
				<li className="mb-1">{comment.comment}</li>
				<li>
					-- {comment.author},{' '}
					{new Date(comment.date).toLocaleDateString('en', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</li>
			</ul>
		);
	});
	return (
		<div className="col-12 col-md-5 m-1">
			<h4 className="mb-4">Comments</h4>
			{usersComments}
			<CommentForm dishId={dishId} postComment={postComment} />
		</div>
	);
}

const DishDetail = (props) => {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>
							{props.dish.name}
						</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderDish dish={props.dish} />
					<RenderComments
						comments={props.comments}
						postComment={props.postComment}
						dishId={props.dish.id}
					/>
				</div>
			</div>
		);
	} else {
		return <div />;
	}
};

export default DishDetail;
