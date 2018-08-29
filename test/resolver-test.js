const assert = require('assert');
import {expect} from 'chai';

import Resolver from "../lib/resolver";
import IPFSAgent from 'clear-me-lib/lib/storage/IPFSAgent';
import JWT from 'jsonwebtoken';


describe('Clearme Resolver', function(){

    this.timeout(0);

    let ipfsAgent;
    let resolver;

    // revisit this,  the after needs to be implemented as well as immediate availablity
    // of the file on IPFS like in the Getting Started part of the docs
    before('Add the files to IPFS synchronously', function(){
        resolver = new Resolver('ipfs.infura.io', '5001', 'https');
        ipfsAgent = new IPFSAgent('ipfs.infura.io', '5001', 'https');
    })

    it('Can parse a clearme DID', () => {
        let parsedDid = resolver.parse('did:clear:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')
        expect(parsedDid.method).equal('clear')
        expect(parsedDid.id).equal('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')
    })

    it('Can reject a bad scheme', () => {
        assert.throws(function(){resolver.parse('dod:ipfs:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')},
            Error, "Error Invalid DID dod:ipfs:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX")
    })

    xit('Can deserialize an ipfs address into a JSON doc representing a DDO', async () => {
        const leadEngUPortFile = require('./data/uPort-lead-eng');
        const leadEngUPortFileStringIfied = JSON.stringify(leadEngUPortFile);
        const token = JWT.sign({
            data: leadEngUPortFileStringIfied
        }, 'clearmeSecret', { expiresIn: 60 * 60 });

        const hash = await ipfsAgent.saveEncodedData(token);

        const leadUPortEndObj = JSON.parse(leadEngUPortFileStringIfied);
        const encodedDoc = await resolver.resolve((`did:clear:${hash}`));
        const decodedJwt = JWT.verify(encodedDoc, 'clearmeSecret');
        const leadEngDdo = JSON.parse(JSON.parse(JSON.stringify(decodedJwt.data)));
        expect(leadEngDdo.name).equal(leadUPortEndObj.name);
        expect(leadEngDdo.description).equal(leadUPortEndObj.description);
        expect(leadEngDdo.publicKey).equal(leadUPortEndObj.publicKey);
    })

})