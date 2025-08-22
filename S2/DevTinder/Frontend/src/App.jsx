import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./components/Body";
import Login from "./components/login";
import PageNotFound from "./components/PageNotFound";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile.jsx";

function App() {
	return (
		<>
			<Provider store={appStore}>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/" element={<Body />}>
							<Route path="/" element={<Feed />}></Route>
							<Route path="/login" element={<Login />}></Route>
							<Route
								path="/profile"
								element={<Profile />}
							></Route>
							<Route path="*" element={<PageNotFound />}></Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
