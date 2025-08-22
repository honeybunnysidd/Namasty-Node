import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removerUser } from "../utils/userSlice";

export default function Navbar() {
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await axios.post(
				BASE_URL + "/logout",
				{},
				{ withCredentials: true }
			);
			dispatch(removerUser());
			return navigate("/login");
		} catch (err) {
			// console.log(err);
		}
	};
	return (
		<div className="navbar bg-base-300 shadow-sm">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost text-xl">
					🖥️DevMate
				</Link>
			</div>
			<div className="flex gap-2">
				{user && (
					<div className="flex justify-center items-center">
						<p className="mx-5">Welcome {user.firstName}!</p>

						<div className="dropdown dropdown-end mx-5 ">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar me-8"
							>
								<div className="w-10 rounded-full">
									<img
										alt="profile photo"
										src={user.photoUrl}
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
							>
								<li>
									<Link
										to="/profile"
										className="justify-between"
									>
										Profile
										<span className="badge">New</span>
									</Link>
								</li>
								<li>
									<Link>Settings</Link>
								</li>
								<li>
									<a onClick={handleLogout}>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				)}
				{!user && (
					<div>
						{" "}
						<Link to="/login" className="mx-5">
							Login
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
