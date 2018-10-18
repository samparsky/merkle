interface IVerify {
    proof: Array<ArrayBuffer>
    leave: ArrayBuffer
    root: ArrayBuffer
    concatHash: () => ArrayBuffer
}

export default function verify({ proof, leave, root, concatHash }: IVerify ) {

}