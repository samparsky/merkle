# Merkle-ts
A javascript/typescript implementation of standard, sparse & compact (coming soon) merkle trees

## Standard Merkle tree
A standard merkle tree 

### How it works
To calculate the merkle root of a tree with 

For leaves [1, 2, 3, 4, 5]

                     30
              10              20
          3       7       10     {10}
        1   2   3   4   5   {5}

For leaves [1, 2, 3, 4, 5, 6]

                      32
              10              22
          3       7       11    {11} 
        1   2   3   4   5   6

Merkle Proof for 

## Sparse Merkle
A sparse merkle tree makes it easy to proof the non membership of a leave in a merkle tree.
While with standard merkle tree its quite easy to 

### How it works


## Configuration


## Tutorial

#### Standard Merkle Tree
```javascript
import { Merkle } from "merkle-ts"

const leaves = [1, 2, 3, 4, 5]

const merkle: { root } = new Merkle(leaves)
// print the merkle root
console.log({root})

// merkle proof for 3
const proof = merkle.proof(3)
// log the merkle proof
console.log({proof})

// verify the proof
const verify = merkle.verify(proof)
```

#### Sparse Merkle Tree

```javascript
import { SparseMerkle } from "merkle-ts"

const leaves = [1, 2, 3, 4, 5]

const merkle: { root } = new SparseMerkle(leaves)
// print the merkle root
console.log({root})

// merkle proof for 3
const proof = merkle.proof(3)
// log the merkle proof
console.log({proof})

// non inclusion proof
const nonproof = merkle.proof(10)
console.log({nonproof})
```

### Configuration
You can customize the output of the by specifying the following

| property | description | default |
|-----|-------------|--------------|
| *digestfn* |  You can specify a custom digest function | (data: any) => Buffer |
| *nodeDigestfn* | This allows you to specify a custom hash function different from whats is used to hash the leave nodes. if not set equals to the digestfn | (data: any) => Buffer |
| *doubleHash* | This allows you to specify to if the nodes are to be hashed twice | boolean, default: false |

## details
Uses different hash functions for leaves & tree internal nodes. 

### Contribution


### Authors
[Samuel](https://twitter.com/samparsky)

### License
MIT
