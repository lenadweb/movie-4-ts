import { getQueryStringValue, setQueryStringValue } from 'services/QueryServices';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQueryParams, setQueryParams } from 'redux/reducers/AppSlice';

type tReturnValue = [
    string | number | boolean,
    (nValue: string | number | boolean) => void
]

function useQueryString(key: string, initialValue?: string | number | boolean): tReturnValue {
    const dispatch = useDispatch();
    const queryParams = useSelector(selectQueryParams);
    const onSetValue = useCallback(
        (nValue) => {
            dispatch(setQueryParams({
                key,
                value: nValue,
            }));
            setQueryStringValue(key, nValue);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return [queryParams[key] ?? initialValue, onSetValue];
}

export default useQueryString;
