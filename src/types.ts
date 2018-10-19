export interface IStore {
    add: (data: any) => Promise<boolean>
    remove: () => Promise<boolean>
}

export interface ICreate {
    
}

export interface IOptions {
    digestfn ?: (data: any) => Buffer
    nodeDigestFn ?: (data: any) => Buffer
    store ?: IStore
    doubleHash ?: boolean
    inMemoryLayers ?: number
}

export interface IMerkle {

}