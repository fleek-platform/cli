import { promises as fs } from "node:fs";

export const fileExists = async (path: string) => {
	try {
		const stat = await fs.stat(path);

		return stat.isFile();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (e.code === "ENOENT") {
			return false;
		}

		throw e;
	}
};
