import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

export const EditProfile = ({ user }) => {
	const [firstName, setFirstName] = useState(user.firstName || "");
	const [lastName, setLastName] = useState(user.lastName || "");
	const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
	const [about, setAbout] = useState(user.about || "");
	const [age, setAge] = useState(user.age || "");
	const [gender, setGender] = useState(user.gender || "");
	const [error, setError] = useState(null);

	const [showToast, setShowToast] = useState(false);

	const dispatch = useDispatch();
	const saveProfile = async () => {
		try {
			setError(null);
			const res = await axios.patch(
				BASE_URL + "/profile/edit",
				{ firstName, lastName, photoUrl, about, age, gender },
				{ withCredentials: true }
			);

			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
			dispatch(addUser(res?.data?.data));
		} catch (err) {
			setError(err?.response?.data);
		}
	};

	return (
		<>
			{/* Success Alert */}

			{showToast && (
				<div className="toast toast-bottom toast-end z-10">
					<div className="alert alert-success">
						<span>Profile Updated Successfully !</span>
					</div>
				</div>
			)}

			<div className="flex items-center justify-center py-10">
				<div className="card w-100 bg-base-300 shadow-lg rounded-2xl p-5">
					<div className="card-body">
						<h2 className="card-title justify-center mb-4">
							Update Profile
						</h2>

						<div className="form-control">
							<label className="input flex items-center gap-2">
								<input
									type="text"
									placeholder="First Name"
									required
									pattern="[A-Za-z][A-Za-z0-9\-]*"
									className="grow"
									value={firstName}
									onChange={(e) =>
										setFirstName(e.target.value)
									}
								/>
							</label>
						</div>

						<div className="form-control mt-3">
							<label className="input flex items-center gap-2">
								<input
									type="text"
									placeholder="Last Name"
									required
									className="grow"
									value={lastName}
									onChange={(e) =>
										setLastName(e.target.value)
									}
								/>
							</label>
						</div>

						<div className="form-control mt-3">
							<label className="input flex items-center gap-2">
								<input
									type="url"
									placeholder="Photo Url"
									required
									className="grow"
									value={photoUrl}
									onChange={(e) =>
										setPhotoUrl(e.target.value)
									}
								/>
							</label>
						</div>

						<div className="form-control mt-3">
							<label className="input flex items-center gap-2">
								<input
									type="text"
									placeholder="Age"
									required
									className="grow"
									value={age}
									onChange={(e) => setAge(e.target.value)}
								/>
							</label>
						</div>

						<div className="form-control mt-3">
							<select
								value={gender}
								onChange={(e) => setGender(e.target.value)}
								className="select select-info"
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>

						<div className="form-control mt-3">
							<label htmlFor="about" className="flex mb-1">
								About:
							</label>
							<textarea
								name="about"
								id="about"
								className="textarea textarea-bordered"
								value={about}
								onChange={(e) => setAbout(e.target.value)}
							></textarea>
						</div>

						{error && (
							<p className="text-red-400 text-center">{error}</p>
						)}

						<div className="card-actions justify-center mt-6 w-2/3 flex mx-auto">
							<button
								className="btn btn-primary w-full"
								onClick={saveProfile}
							>
								Update Profile
							</button>
						</div>
					</div>
				</div>

				<UserCard
					user={{
						firstName,
						lastName,
						photoUrl,
						age,
						gender,
						about,
					}}
				/>
			</div>
		</>
	);
};

export default EditProfile;
