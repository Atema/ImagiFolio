import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

export type SuccessErrorFormState = {
  success?: boolean;
  error?: string;
  fullError?: string;
};

export type SuccessErrorFormAction = (
  state: SuccessErrorFormState,
  data: FormData
) => Promise<SuccessErrorFormState>;

export const useAction = (
  actionFunc: SuccessErrorFormAction,
  onSuccess?: () => void
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
  } as const;
};
