import IPFSAgent from 'clear-me-lib/lib/storage/IPFSAgent';


export default class Resolver{

    constructor(host, port, protocol){
        this.ipfsAgent =  new IPFSAgent(host, port, protocol);
    }

    parse(did){
        if (!did || did === '') throw new Error('Missing DID');
        const sections = did.match(/^did:([clear]+):([[a-zA-Z0-9.-]+)(\/[^#]*)?(#.*)?$/);

        if (sections) {
            const parts = {did: sections[0], method: sections[1], id: sections[2]};
            if (sections[3]) parts.path = sections[3];
            if (sections[4]) parts.fragment = sections[4].slice(1);
            return parts;
        }

        throw new Error(`Invalid DID ${did}`)
    }

    async getFromIpfs(did){
        const parsedDid = this.parse(did);
        return await this.ipfsAgent.catEncodedData(parsedDid.id);
    }


    async resolve(did){
        return await this.getFromIpfs(did);
    }
}
