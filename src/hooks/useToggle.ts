import { useCallback, useState } from 'react';

type ToggleReturn = [
    boolean,
    () => void
]

export const useToggle = (initialState = false): ToggleReturn => {
    const [state, setState] = useState(initialState);

    const toggle = useCallback(() => setState((prevState) => !prevState), []);

    return [state, toggle];
};
