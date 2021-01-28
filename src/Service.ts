export type Service = {
    id: string;
    factory: () => any;
    instance?: any;
}
