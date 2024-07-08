import { randomBytes } from "crypto";

export const generateVerificationSessionId = () =>
	randomBytes(16).toString("hex");
