export interface IRoute {
    path: string,
    requireAuth?: boolean,
    element?: any,
    name?: string,
    exact?: boolean,
    children?: Array<IRoute>,
}
