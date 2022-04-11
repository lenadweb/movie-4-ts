import qs from 'query-string';

export const setQueryStringWithoutPageReload = (qsValue: string): void => {
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${qsValue}`;

    window.history.pushState({ path: newUrl }, '', newUrl);
};

export const setQueryStringValue = (
    key: string,
    value: any,
    queryString = window.location.search,
): void => {
    const values = qs.parse(queryString);
    const newQsValue = qs.stringify({ ...values, [key]: value });
    setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (
    key: string,
    queryString: any = window.location.search,
): any => {
    const values = qs.parse(queryString);
    return values[key];
};

export const getAllStringValue = (): any => {
    const params: any = {};
    (new URLSearchParams(window.location.search)).forEach((value, name) => {
        params[name] = value;
    });
    return params;
};
