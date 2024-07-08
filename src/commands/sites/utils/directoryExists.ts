import { promises as fs } from "node:fs";

export const directoryExists = async (path: string) => {
	try {
		const stat = await fs.stat(path);

		return stat.isDirectory();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (e.code === "ENOENT") {
			return false;
		}

		throw e;
	}
};
