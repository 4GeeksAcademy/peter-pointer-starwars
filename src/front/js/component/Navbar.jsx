import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-body-secondary">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Star Wars</span>
				</Link>
				<Link to="/evtols">
				<button type="button" className="btn btn-outline-success">Evtols</button>
				</Link>
				<Link to="/contact">
					<button type="button" className="btn btn-outline-primary">Agenda</button>
				</Link>
				<Link to="/demo">
					<button className="btn btn-outline-primary">Check the Context in action</button>
				</Link>

			</div>
		</nav>
	);
};
