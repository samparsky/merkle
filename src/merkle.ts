import { } from "crypto"
import { IOptions, IStore } from "./types"

/**
 * 
 * 
 * 
 *    
 * odd merkle tree implementation
 *          14
 *        9   5   
 *     2    7     10
 *   1  2  3  4  5  5
 * https://github.com/bitcoinjs/merkle-lib/blob/master/fastRoot.js
 */
class MerkleTree {

    _leaves: Array<any>
    // _hashfn: () => ArrayBuffer
    _nodeDigestFn: (data: any) => Uint8Array
    _doubleHash: boolean
    _layers: Array<Array<ArrayBuffer>>
    _store: IStore
    
    /**
     * @description 
     * @param leaves the leaves of the merkle tree
     * @param hashfn you can specify a custom hash function
     */
    constructor( leaves: Array<any>, digestfn: (data: any) => ArrayBuffer, options: IOptions = {}){
        // this._hashfn = hashfn
        this._nodeDigestFn = options.nodeDigestFn || digestfn
        this._doubleHash = options.doubleHash || false
        this._store = options.store || null
        this._leaves = leaves.map((leave) => digestfn(leave))
        this._generateLayers(this._leaves)
    }

    get layers(): Array<Array<ArrayBuffer>> {
        return this.layers
    }

    get toString(): Array<Array<string>> {
        return this.layers.map((layer) => layer.map((layer) => layer.toString()))
    }

    getLayer(index: number){
        return this.layers[index]
    }
    
    get depth(): number {
        return this._layers.length
    }

    getRoot(){
        return this._layers[this._layers.length - 1][0]
    }

    _hash(data: ArrayBuffer): ArrayBuffer {
        if(this._doubleHash){
            return this._nodeDigestFn(this._nodeDigestFn(data))
        }
        return this._nodeDigestFn(data)
    }

    // constant-space merkle root calculation algorithm
    private _generateLayers( data: Array<Uint8Array> ){
        let level = []
        while(level.length !== 1) {
            level = []
            for(let i = 0; i < data.length; i+=2){
                const left = data[i]
                const right = (i+1 == data.length) ? left : data[i++]
                const hash = this._hash(Buffer.concat([left, right]))
                level.push(hash)
            }
            // append to store
            if(this._store) this._store.add(level);
            // push to layers
            this.layers.push(level);
        }
    }

    private _proof(){

    }

    treeWidth (n, h) {
        return (n + (1 << h) - 1) >> h  
    }

    layerWidth(){

    }

    proof(leave: Buffer){
        let proof = []
        let index = this._leaves.indexOf(leave)

        // if the leave can't be foudn
        if(index == -1) return null
        
        // let node = this._leaves[index]
        const layersLength = this.depth

        if(layersLength == 1){
            return this.getRoot()
        }

        let i = 0
        /**
         * Since we don't want the root included in the proof
         * hence layersLenagth - 1
         */
        while(i < layersLength - 1){
            const layerWidth = this.layers[i].length

            let odd = index % 2
            let offset 

            if(odd){
                
            } else {
                proof.push({
                    data: nodes[offset-1],
                    left: true
                })
            }
            


        }
    }

    verify(proof:[Uint8Array]): boolean {
        // merkle tree root
        const root = proof[proof.length - 1]

        let hash = root
      
        for (var i = 0; i < (proof.length - 1); i += 2) {
          let left = proof[i] || hash
          let right = proof[i + 1] || hash
          let data = Buffer.concat([left, right])
          hash = this._nodeDigestFn(data)
        }
      
        return hash.equals(root)
    }
}

export default MerkleTree

// class MerkleTree {
//     leaves: []
//     concatfn: any
//     layers: []
  
//     constructor(leaves: [], fn){
//         this.leaves = leaves;
//         this.concatfn = fn;
//         this.layers = []
//         this.layers.push(leaves)
//     }
  
//     layer(layerIndex){
//         return this.layers[index]
//     }
    
//     getRoot() {
//         let nodes
//         let intermediate = this.leaves
//       //   let length = parseInt(nodes / 2)
//         if(intermediate.length == 1){
//             return intermediate[0]
//         }
  
//         while(nodes.length !== 1){
//             nodes = []
            
//             let length = parseInt(intermediate.length / 2)
  
//             for (let i = 0; i < length; i++) {            
//                 const left = intermediate[i*2]
//                 const right = intermediate[((i*2)+1)]
//                 console.log(left)
//                 console.log(right)
//                 console.log(i)
//                 const immediateHash = this.concatfn(left, right)
//                 nodes.push(immediateHash)
//             }
  
//             if (intermediate.length % 2 == 1) {
//                 let lastleaf = intermediate[intermediate.length-1];
//                 nodes.push(lastleaf)
//             }
  
//             intermediate = nodes
//             this.layers.push(nodes)
//         }
  
//         return nodes[0];
//     }
  
//     getProof(index) {
//         const result = []
  
//         if(this.layers.length == 1){
//             this.getRoot()
//         }
//         let layerIndex = 0
//         while(true){
//             // check if left or right node
//             // if 0 left node if 1 right node
//             let nodes = this.layers[layerIndex]
//             console.log({layerIndex})
//             console.log({index})
//             console.log(this.layers.length)
//             if (index % 2 == 0) {
//                 if(nodes.length == (index+1)){
//                     if(Buffer.compare(nodes[index], result[result.length-1].data) == 0 ){
//                         result.push({
//                             data: nodes[index],
//                             left: false
//                         })
//                     }
//                 } else {
//                     result.push({
//                         data: nodes[index+1],
//                         left: false
//                     })
//                 }
                
//             } else {
//                 result.push({
//                     data: nodes[index-1],
//                     left: true
//                 })
//             }
//             layerIndex += 1
            
  
//             if((layerIndex+1) == this.layers.length){
//                 break;
//             } else if(index == 0 && (layerIndex+1) !== this.layers.length) {
//                 index += 1
//             }
  
//             index = parseInt(index/2)
//         }
//         console.log(result)
//         return result
//     }
  
//   }
  
//   module.exports = MerkleTree;
  