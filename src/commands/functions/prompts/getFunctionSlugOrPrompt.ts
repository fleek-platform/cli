import { FleekFunctionSlugNotValidError } from "@fleek-platform/errors";
import { isFunctionSlugValid } from "@fleek-platform/utils-validation";

type GetFunctionSlugOrPromptArgs = {
	slug?: string;
};

export const getFunctionSlugOrPrompt = async ({
	slug,
}: GetFunctionSlugOrPromptArgs): Promise<string> => {
	if (slug && isFunctionSlugValid({ slug })) {
		return slug;
	}

	throw new FleekFunctionSlugNotValidError({ slug: slug! });
};
