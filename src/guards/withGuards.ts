import { output } from "../cli";
import { loginGuard } from "./loginGuard";
import { projectGuard } from "./projectGuard";
import { sdkGuard } from "./sdkGuard";
import { sitesGuard } from "./sitesGuard";
import type { Action, Guards, SdkGuardedFunction } from "./types";

type WithGuardsArgs = { scopes: Guards };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withGuards = <
	T extends { predefinedConfigPath?: string; [name: string]: any },
>(
	handler: SdkGuardedFunction<T>,
	{ scopes }: WithGuardsArgs,
): Action<T> => {
	return async (args: T = {} as T) => {
		if (scopes.authenticated) {
			await loginGuard();
		}

		if (scopes.project) {
			await projectGuard();
		}

		if (scopes.site) {
			await sitesGuard(args);
		}

		try {
			const action = sdkGuard(handler);
			await action(args);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			output.error(error?.message);
		}
	};
};
