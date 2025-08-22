import { Link } from "react-router";

const PageNotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
			<h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
			<h2 className="text-2xl font-semibold text-gray-700 mb-2">
				Oops! Page Not Found
			</h2>
			<p className="text-gray-500 mb-6">
				The page you’re looking for doesn’t exist or has been moved.
			</p>
			<Link to="/">
				<button
					size="lg"
					className="cursor-pointer rounded-2xl px-6 py-2 shadow-md"
				>
					Go Back Home
				</button>
			</Link>
		</div>
	);
};

export default PageNotFound;
