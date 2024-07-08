import { output } from "../../cli";
import type { SdkGuardedFunction } from "../../guards/types";
import { withGuards } from "../../guards/withGuards";
import { getSiteOrPrompt } from "./prompts/getSiteOrPrompt";
import { printDeploymentsTable } from "./utils/printDeploymentsTable";

type ListDeploymentsActionArgs = {
	id?: string;
	slug?: string;
};

const listDeploymentsAction: SdkGuardedFunction<
	ListDeploymentsActionArgs
> = async ({ sdk, args }) => {
	const site = await getSiteOrPrompt({ id: args.id, slug: args.slug, sdk });

	printDeploymentsTable({ output, deployments: site.deployments });
};

export const listDeploymentsActionHandler = withGuards(listDeploymentsAction, {
	scopes: {
		authenticated: true,
		project: true,
		site: false,
	},
});
