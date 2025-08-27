import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import feedReducer, { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
const Feed = () => {
	const feed = useSelector((store) => store.feed);
	const dispatch = useDispatch();

	const getFeed = async () => {
		if (feed) return;
		try {
			const res = await axios.get(BASE_URL + "/feed", {
				withCredentials: true,
			});
			dispatch(addFeed(res?.data));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);
	return feed && feed.length > 0 ? (
		<div className=" flex justify-center">
			<UserCard user={feed[0]} />
		</div>
	) : (
		<h2 className="text-center font-bold py-5">No More Feed</h2>
	);
};

export default Feed;
