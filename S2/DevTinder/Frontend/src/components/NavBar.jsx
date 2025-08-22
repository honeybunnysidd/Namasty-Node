import { useSelector } from "react-redux";

export default function Navbar() {
	const user = useSelector((store) => store.user);
	return (
		<div className="navbar bg-base-300 shadow-sm">
			<div className="flex-1">
				<a href="/" className="btn btn-ghost text-xl">
					🖥️DevMate
				</a>
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
									<a
										href="/profile/view"
										className="justify-between"
									>
										Profile
										<span className="badge">New</span>
									</a>
								</li>
								<li>
									<a>Settings</a>
								</li>
								<li>
									<a>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				)}
				{!user && (
					<div>
						{" "}
						<a href="/login" className="mx-5">
							Login
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
