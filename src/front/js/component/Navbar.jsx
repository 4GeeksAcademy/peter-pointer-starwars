import React, { useContext } from "react"; // 1. import Hook
// 2. import Context del appContext.js
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	// 3. Desestructurar store y/o actions del objeto que está en flux utilizando el "context" de appContext.js
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()

	const handleDelete = (uid) => {
		actions.removeFavorite(uid)
	}

	const hanldeLog = (isLoggedLocal) => {
		if (isLoggedLocal) actions.logout()
		navigate("/login")
	}

	return (
		<nav className="navbar bg-black">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png" style={{ width: "auto", height: "80px" }} alt="profile picture" /> </span>
				</Link>

				<div className="d-flex justify-content-between">					
					<Link to="/characters" className="me-3">
						<button type="button" className="btn btn-outline-warning">Characters</button>
					</Link>
					<Link to="/planets" className="me-3">
						<button type="button" className="btn btn-outline-warning">Planets</button>
					</Link>
					<Link to="/starships" className="me-3">
						<button type="button" className="btn btn-outline-warning">Starships</button>
					</Link>
					<Link to="/contact" className="me-3">
						<button type="button" className="btn btn-outline-warning">Contacts</button>
					</Link>
					{store.isLogged ? 
						
						<button onClick={() => hanldeLog(true)} type="button" className="btn btn-outline-warning me-3">Logout</button>
						:
						<button onClick={() => hanldeLog(false)} type="button" className="btn btn-outline-warning me-3">Login</button>
					
					}
					<div className="dropdown">
						<button className="btn btn-outline-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
							<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
								{store.favorites.length}
								<span className="visually-hidden">unread messages</span>
							</span>
						</button>
						<ul className="dropdown-menu dropdown-menu-dark">
							{store.favorites.map((item, index) =>
								<li key={index}><span className="dropdown-item d-flex justify-content-between align-items-center">
									{item.name}<i onClick={() => handleDelete(item.uid)} className="text-danger fa fa-trash"></i></span></li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
