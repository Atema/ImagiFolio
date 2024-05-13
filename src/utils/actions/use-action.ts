import type { SuccessErrorFormAction } from "@/actions/common";
import { useCallback, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

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

  const reset = useCallback(() => {
    state.success = false;
    state.error = undefined;
    state.fullError = undefined;
  }, [state]);

  useEffect(() => {
    if (state.fullError) console.error(state.fullError);
    if (state.success && onSuccess) {
      reset();
      onSuccess();
    }
  }, [reset, state, onSuccess]);

  return {
    error: state.error,
    action,
    pending,
    reset,
  } as const;
};
