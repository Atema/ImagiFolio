import { useCallback, useEffect } from "react";
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
  action: SuccessErrorFormAction,
  onSuccess?: () => void
) => {
  const [formState, formAction] = useFormState(action, {});

  useEffect(() => {
    if (formState.fullError) console.error(formState.fullError);
    if (formState.success && onSuccess) onSuccess();
  }, [formState, onSuccess]);

  return [formState.error, formAction] as const;
};
