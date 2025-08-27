import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
	const dispatch = useDispatch();
	const requests = useSelector((store) => store.request);

	const reviewRequest = async (status, _id) => {
		try {
			const res = await axios.post(
				BASE_URL + "/request/review/" + status + "/" + _id,
				{},
				{ withCredentials: true }
			);
			dispatch(removeRequest(_id));
		} catch (err) {
			console.log(err);
		}
	};

	const fetchRequests = async () => {
		try {
			const res = await axios.get(BASE_URL + "/user/requests/received", {
				withCredentials: true,
			});

			dispatch(addRequests(res.data.data));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	if (!requests)
		return (
			<h1 className="text-bold text-2xl text-center py-10">
				No Request Found
			</h1>
		);

	if (requests.length === 0)
		return (
			<h1 className="text-bold text-2xl text-center py-10">
				No Request Found
			</h1>
		);

	return (
		<>
			<h2 className="text-bold text-2xl text-center py-10">Requests</h2>
			<div className="flex flex-col gap-2  w-150 mx-auto  p-2 mb-10">
				{requests.map((el, index) => {
					const { firstName, lastName, photoUrl, age } =
						el.fromUserId;
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
							<div className="flex gap-2">
								<button
									className="btn btn-sm btn-secondary"
									onClick={() => {
										reviewRequest("rejected", el._id);
									}}
								>
									Reject
								</button>
								<button
									className="btn btn-sm btn-primary"
									onClick={() => {
										reviewRequest("accepted", el._id);
									}}
								>
									Accept
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Requests;
