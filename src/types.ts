export interface IStore {
    add: (data: any) => Promise<boolean>
    remove: () => Promise<boolean>
}

export interface ICreate {
    
}

export interface IOptions {
    nodeDigestFn ?: () => ArrayBuffer
    store ?: IStore
    doubleHash ?: boolean
    inMemoryLayers ?: number
}

