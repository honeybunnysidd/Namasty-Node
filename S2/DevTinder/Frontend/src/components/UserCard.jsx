import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user }) => {
	const { firstName, lastName, photoUrl, age, gender, about, _id } = user;
	const dispatch = useDispatch();
	const handleSendRequest = async (status, _id) => {
		try {
			const res = await axios.post(
				BASE_URL + "/request/send/" + status + "/" + _id,
				{},
				{ withCredentials: true }
			);
			dispatch(removeFeed(_id));
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="card bg-base-200 w-96 shadow-md transform scale-90 rounded-2xl overflow-hidden">
			{/* Image Section */}
			<figure>
				<img
					className="w-full h-full object-contain"
					src={photoUrl}
					alt="photo"
				/>
			</figure>

			{/* Card Body */}
			<div className="card-body">
				<h2 className="card-title">{firstName + " " + lastName}</h2>
				<p className="text-sm text-gray-500">{age + ", " + gender}</p>

				<p className="break-words whitespace-pre-line mt-2 leading-relaxed text-gray-300">
					{about}
				</p>

				{/* Buttons */}
				<div className="card-actions justify-around mt-4">
					<button
						className="btn btn-primary px-6"
						onClick={() => handleSendRequest("ignored", _id)}
					>
						Ignore
					</button>
					<button
						className="btn btn-secondary px-6"
						onClick={() => handleSendRequest("interested", _id)}
					>
						Interested
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
