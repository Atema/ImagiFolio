"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

type GlobalState = {
  /** Whether the info box in the photo view is open */
  infoOpen: boolean;
};

type GlobalAction = {
  /** Type of action to dispatch */
  type: string;
} & {
  type: "set_photo_info_open";

  /** Whether the info view is opened */
  open: boolean;
};

/** Initial global state */
const defaultGlobalState = {
  infoOpen: false,
};

const GlobalStateContext = createContext<GlobalState>(defaultGlobalState);
const GlobalDispatchContext = createContext<Dispatch<GlobalAction>>(() => {});

/**
 * Reducer to update the global state based on the dispatched action
 *
 * @param state - The state before applying the dispatched action
 * @param action - The dispatched action
 * @returns The new global state
 */
const globalStateReducer = (
  state: GlobalState,
  action: GlobalAction,
): GlobalState => {
  switch (action.type) {
    case "set_photo_info_open":
      return {
        ...state,
        infoOpen: action.open,
      };

    default:
      return state;
  }
};

/**
 * Provides all its children with state and dispatch contexts for the global
 * state
 *
 * @component
 * @param props.children - The children nodes
 */
const GlobalStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, defaultGlobalState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;

/**
 * Hook to use the global state and dispatcher. More specific hooks (below)
 * should be used instead
 *
 * @returns The state and action dispatcher
 */
const useGlobalState = () =>
  [useContext(GlobalStateContext), useContext(GlobalDispatchContext)] as const;

/**
 * Hook to get photo info open state from the global state, and a function to
 * dispatch an action to update the open state
 *
 * @returns The open state and update function
 */
export const usePhotoInfoOpen = () => {
  const [state, dispatch] = useGlobalState();

  return [
    state.infoOpen,
    (open: boolean) => dispatch({ type: "set_photo_info_open", payload: open }),
  ] as const;
};
