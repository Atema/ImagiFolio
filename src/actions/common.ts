import { z } from "zod";

/**
 * Type of form state for server actions used with {@link useAction}
 */
export type SuccessErrorFormState = {
  /** Whether the action was executed successfully */
  success?: boolean;

  /** Error to display to the user */
  error?: string;

  /** Full error message to log to the console */
  fullError?: string;
};

/**
 * Type of server action for use with {@link useAction} to provide state
 * information
 *
 * @returns The new state of the form
 */
export type SuccessErrorFormAction = (
  /** The previous state of the form */
  state: SuccessErrorFormState,

  /** The submitted form data */
  data: FormData,
) => Promise<SuccessErrorFormState>;

/**
 * Factory function for form actions that validates and parses the data using a
 * schema before handing it over to the defined function, and performs error
 * handling
 *
 * @param schema - The zod schema to parse the formdata with
 * @param func - The function to pass the parsed data to
 * @returns Form action that can be used as usual
 */
export const validateSchemaFormAction =
  <T extends z.ZodTypeAny>(
    schema: T,
    func: (
      state: SuccessErrorFormState,
      data: z.output<T>,
    ) => Promise<SuccessErrorFormState>,
  ): SuccessErrorFormAction =>
  async (state, formData) => {
    const { data, error } = await schema.safeParseAsync(formData);

    if (error)
      return {
        error: error.issues[0].message,
      };

    try {
      return await func(state, data);
    } catch (err) {
      return {
        error: "" + err,
      };
    }
  };

export const schemaRequired = (desc: string) =>
  z
    .string({ required_error: `${desc} is required` })
    .min(1, { message: `${desc} is required` });

export const schemaMinLength = (desc: string, minLength: number) =>
  schemaRequired(desc).min(minLength, {
    message: `${desc} must be at least ${minLength} characters`,
  });

export const schemaEmail = (desc: string) =>
  schemaRequired(desc).email({
    message: `${desc} does not have a valid format`,
  });

export const schemaUuid = (desc: string) =>
  schemaRequired(desc).uuid({
    message: `${desc} does not have a valid format`,
  });
