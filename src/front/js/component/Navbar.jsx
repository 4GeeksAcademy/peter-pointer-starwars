import React from "react"; // 1. import Hook
// 2. import Context del appContext.js
import { Link } from "react-router-dom";

export const Navbar = () => {
	// 3. Desestructurar store y/o actions del objeto que está en flux utilizando el "context" de appContext.js

	return (
		<nav className="navbar bg-black">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"> <img src="https://starwars.chocobar.net/star-wars-logo.png" style={{ width: "auto", height: "55px" }} alt="profile picture" /> </span>
				</Link>
				<div className="text-end ">
					<div className="d-flex justify-content-between">
						<Link to="/characters">
							<button type="button" className="btn btn-outline-primary">Characters</button>
						</Link>
						<Link to="/planets">
							<button type="button" className="btn btn-outline-primary">Planets</button>
						</Link>
						<Link to="/starships">
							<button type="button" className="btn btn-outline-primary">Starships</button>
						</Link>
						<Link to="/contact">
							<button type="button" className="btn btn-outline-primary">Contacts</button>
						</Link>
					</div>
				</div>
				{/* <Link to="/demo">
					<button className="btn btn-outline-primary">Check the Context in action</button>
				</Link> */}

			</div>
		</nav>
	);
};
