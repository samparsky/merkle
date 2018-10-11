import { } from "crypto"

/**
 * 
 * 
 * 
 *  1
 */

class MerkleTree {

    leaves: Array<any>
    hashfn: () => ArrayBuffer
    
    /**
     * @description 
     * @param leaves the leaves of the merkle tree
     * @param hashfn you can specify a custom hash function
     */
    constructor(leaves, hashfn){
        this.leaves = leaves
        this.hashfn = hashfn
    }


}