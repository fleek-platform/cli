import { getPrivateIpfsGatewayUrl } from "@fleek-platform/utils-ipfs";

import { output } from "../../cli";
import type { SdkGuardedFunction } from "../../guards/types";
import { withGuards } from "../../guards/withGuards";
import { t } from "../../utils/translation";
import { getPrivateGatewayOrPrompt } from "./prompts/getPrivateGatewayOrPrompt";

type DetailPrivateGatewayActionArgs = {
	id?: string;
	slug?: string;
};

export const detailPrivateGatewayAction: SdkGuardedFunction<
	DetailPrivateGatewayActionArgs
> = async ({ args, sdk }) => {
	const privateGateway = await getPrivateGatewayOrPrompt({
		sdk,
		id: args.id,
		slug: args.slug,
	});

	output.table([
		{
			ID: privateGateway.id,
			Slug: privateGateway.slug,
			Name: privateGateway.name,
			"Created At": privateGateway.createdAt,
		},
	]);

	const domains = await sdk
		.domains()
		.listByZoneId({ zoneId: privateGateway.zone?.id });

	if (domains.length === 0) {
		output.log(t("gatewayNoDomainsAss"));

		return;
	}

	output.log(`${t("acccessContentViaDomain")}:`);

	for (const domain of domains) {
		output.link(
			getPrivateIpfsGatewayUrl({ hostname: domain.hostname, hash: "<cid>" }),
		);
	}

	output.printNewLine();
};

export const detailPrivateGatewayActionHandler = withGuards(
	detailPrivateGatewayAction,
	{
		scopes: { authenticated: true, project: true, site: false },
	},
);
