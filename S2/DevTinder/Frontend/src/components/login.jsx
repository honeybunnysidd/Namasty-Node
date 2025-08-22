import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
	const [emailId, setEmailId] = useState("honey@gmail.com");
	const [password, setPassword] = useState("Honey123@");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/login",
				{
					emailId,
					password,
				},
				{ withCredentials: true }
			);

			dispatch(addUser(res.data));
			return navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex items-center justify-center py-50">
			<div className="card w-96 bg-base-300 shadow-lg rounded-4xl p-5">
				<div className="card-body ">
					<h2 className="card-title justify-center mb-4">
						Login Page
					</h2>

					<div className="form-control">
						<label className="input flex items-center gap-2">
							<svg
								className="h-5 opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
								<circle cx="12" cy="7" r="4" />
							</svg>
							<input
								type="text"
								placeholder="Username"
								required
								pattern="[A-Za-z][A-Za-z0-9\-]*"
								className="grow"
								value={emailId}
								onChange={(e) => {
									setEmailId(e.target.value);
								}}
							/>
						</label>
						<span className="text-xs mt-1">
							Must be 3–30 characters with letters, numbers or
							dash
						</span>
					</div>

					<div className="form-control mt-3">
						<label className="input flex items-center gap-2">
							<svg
								className="h-5 opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
								<circle
									cx="16.5"
									cy="7.5"
									r=".5"
									fill="currentColor"
								/>
							</svg>
							<input
								type="password"
								placeholder="Password"
								required
								minLength="8"
								pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
								className="grow"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</label>
						<span className="text-xs mt-1">
							At least 8 chars, 1 uppercase, 1 lowercase, 1 number
						</span>
					</div>

					<div className="card-actions justify-center mt-6">
						<button
							className="btn btn-primary w-full"
							onClick={handleLogin}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
