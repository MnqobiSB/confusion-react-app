import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	renderDish () {
		if (this.props.dish != null) {
			return (
				<Card>
					<CardImg
						width="100%"
						src={this.props.dish.image}
						alt={this.props.dish.name}
					/>
					<CardBody>
						<CardTitle>{this.props.dish.name}</CardTitle>
						<CardText>{this.props.dish.description}</CardText>
					</CardBody>
				</Card>
			);
		} else {
			return <div />;
		}
	}

	renderComments () {
		if (this.props.dish != null) {
			const usersComments = this.props.dish.comments.map((comment) => {
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
				</div>
			);
		} else {
			return <div />;
		}
	}

	render () {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						{this.renderDish(this.props.selectedDish)}
					</div>
					{this.renderComments(this.props.selectedDish)}
				</div>
			</div>
		);
	}
}

export default DishDetail;
