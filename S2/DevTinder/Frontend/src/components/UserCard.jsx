const UserCard = ({ user }) => {
	const { firstName, lastName, photoUrl, age, gender, about } = user;
	return (
		<div className="card bg-base-200 w-96 shadow-sm scale-80">
			<figure>
				<img className="" src={photoUrl} alt="photo" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{firstName + " " + lastName}</h2>
				{age && gender && <p>{age + ", " + gender}</p>} <p>{about}</p>
				<div className="card-actions justify-around m-4">
					<button className="btn btn-primary ">Ignore</button>
					<button className="btn btn-secondary">Interested</button>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
