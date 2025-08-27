import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removerUser } from "../utils/userSlice";
import { useState } from "react";

export default function Navbar() {
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleLogout = async () => {
		try {
			await axios.post(
				BASE_URL + "/logout",
				{},
				{ withCredentials: true }
			);
			dispatch(removerUser());
			setOpen(false);
			return navigate("/login");
		} catch (err) {
			// console.log(err);
		}
	};

	return (
		<div className="navbar bg-base-300 shadow-sm">
			<div className="flex-1">
				<a href="/" className="btn btn-ghost text-xl">
					🖥️DevMate
				</a>
			</div>

			<div className="flex gap-2">
				{user && (
					<div className="flex justify-center items-center relative">
						<p className="mx-5">Welcome {user.firstName}!</p>

						<button
							onClick={() => setOpen(!open)}
							className="btn btn-ghost btn-circle avatar me-8"
						>
							<div className="w-10 rounded-full">
								<img alt="profile photo" src={user.photoUrl} />
							</div>
						</button>

						{open && (
							<ul className="absolute top-0 mt-12 w-52 p-2 shadow menu menu-sm bg-base-100 rounded-box z-10">
								<li>
									<Link
										to="/profile"
										onClick={() => setOpen(false)}
									>
										Profile
									</Link>
								</li>
								<li>
									<Link
										to="/requests"
										onClick={() => setOpen(false)}
									>
										Pending Request
									</Link>
								</li>
								<li>
									<Link
										to="/connections"
										onClick={() => setOpen(false)}
									>
										Connections
									</Link>
								</li>
								<li>
									<a
										onClick={() => {
											handleLogout();
											setOpen(false);
										}}
									>
										Logout
									</a>
								</li>
							</ul>
						)}
					</div>
				)}

				{!user && (
					<div>
						<Link to="/login" className="mx-5">
							Login/SignUp
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
