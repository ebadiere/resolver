# clear-me-resolver

The resolver 'resolves' DIDs documents.  The core function of the 
resolver is simple. It takes a DID, and uses it to retrieve the 
document from IPFS and deserializes it into a DDO.

**DID Format**

scheme:method:ID<br/>

i.e. did:ipfs:QmWBAr1QBWaAGaRJMcggbPiFYTBZhoHc4jBoWtKzLyZfSN


**Background**
The emerging [standard](https://w3c-ccg.github.io/did-spec/) around decentralized identifiers, describes
DIDs as URLs that resolve to DID descriptor objects. These DDOs are simple
JSON objects that contain meta data and proofs of the ownership of
the ID.  

- DDO - Described in the 'Rebooting the web of trust fall 2016' 
[DID Specification](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-fall2016/blob/master/topics-and-advance-readings/did-spec-working-draft-03.md)


**JWT**

- [JSON Web Tokens](https://jwt.io/introduction/) are encoded and contain signatures.  These
may be used to manage claims or attestations.  

**ToDo**

Add more tests to illustrate how the resolver works and to 
futher understand the IPFS API.

**Tests**

Currently the tests parse DIDs and resolve existing DDOs.  Adding
tests that publish and delete DDOs from IPFS is needed to get a 
deeper understanding of the API.  Sometimes documents stored on IPFS
do not seem to be available for a 'cat' or 'get' right away.

**Getting Started**
1. git clone https://github.com/clear-me/clear-me-resolver.git
2. cd clear-me-identity
3. npm install
4. npm test






