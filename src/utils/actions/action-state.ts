import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

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
 * Hook that wraps a server action to provide state information (errors and
 * success)
 *
 * @param actionFunc - The server action to execute
 * @param onSuccess - Function to execute on successful execution
 * @returns The wrapped action, pending state, any errors, and function to reset
 * the error
 */
export const useAction = (
  actionFunc: SuccessErrorFormAction,
  onSuccess?: () => void,
) => {
  const [state, action] = useFormState(actionFunc, {});
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.fullError) console.error(state.fullError);
    if (state.success && onSuccess) onSuccess();
  }, [state, onSuccess]);

  return {
    error: state.error,
    action,
    pending,
    resetError: () => {
      state.error = "";
      state.fullError = "";
    },
  } as const;
};
