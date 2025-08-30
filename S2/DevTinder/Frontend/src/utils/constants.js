// Production
// export const BASE_URL = "/api";

// Local
// export const BASE_URL = "http://localhost:3000";

// Handle both
export const BASE_URL =
	location.hostname === "localhost" ? "http://localhost:3000" : "/api";
