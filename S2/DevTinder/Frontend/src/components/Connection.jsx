import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnection } from "../utils/connectionSlice.js";

const Connection = () => {
	const dispatch = useDispatch();
	const connections = useSelector((store) => store.connections);
	const fetchConnection = async () => {
		try {
			const res = await axios.get(BASE_URL + "/user/connections", {
				withCredentials: true,
			});
			dispatch(addConnections(res.data.data));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchConnection();
	}, []);

	if (!connections) return;

	if (connections.length === 0)
		return (
			<h1 className="text-bold text-2xl text-center py-10">
				No connection Found
			</h1>
		);

	return (
		<>
			<h2 className="text-bold text-2xl text-center py-10">Connection</h2>
			<div className="flex flex-col gap-2  w-150 mx-auto  p-2 mb-10">
				{connections.map((el, index) => {
					const { firstName, lastName, photoUrl, age } = el;
					return (
						<div
							className="bg-base-300 flex justify-between rounded-2xl p-5"
							key={index}
						>
							<div className="flex gap-2 items-center">
								<img
									src={photoUrl}
									alt="img"
									className="size-9 rounded-2xl"
								/>
								<p>
									{firstName} {lastName}{" "}
									{"(" + age + " Year)"}
								</p>
							</div>

							<button>Friend☑️</button>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Connection;
