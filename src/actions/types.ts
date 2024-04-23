export type SuccessErrorFormState = {
  success?: boolean;
  error?: string;
};

export type SuccessErrorFormAction = (
  state: SuccessErrorFormState,
  data: FormData
) => Promise<SuccessErrorFormState>;
