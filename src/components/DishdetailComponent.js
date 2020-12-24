import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish ({ dish }) {
	return (
		<div className="col-12 col-md-5 m-1">
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

function RenderComments ({ comments }) {
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
		</div>
	);
}

const DishDetail = (props) => {
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<RenderDish dish={props.dish} />
					<RenderComments comments={props.dish.comments} />
				</div>
			</div>
		);
	} else {
		return <div />;
	}
};

export default DishDetail;
