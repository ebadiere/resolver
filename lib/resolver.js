'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IPFSAgent = require('clear-me-lib/lib/storage/IPFSAgent');

var _IPFSAgent2 = _interopRequireDefault(_IPFSAgent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resolver = function () {
    function Resolver(host, port, protocol) {
        _classCallCheck(this, Resolver);

        this.ipfsAgent = new _IPFSAgent2.default(host, port, protocol);
    }

    _createClass(Resolver, [{
        key: 'parse',
        value: function parse(did) {
            if (!did || did === '') throw new Error('Missing DID');
            var sections = did.match(/^did:([clear]+):([[a-zA-Z0-9.-]+)(\/[^#]*)?(#.*)?$/);

            if (sections) {
                var parts = { did: sections[0], method: sections[1], id: sections[2] };
                if (sections[3]) parts.path = sections[3];
                if (sections[4]) parts.fragment = sections[4].slice(1);
                return parts;
            }

            throw new Error('Invalid DID ' + did);
        }
    }, {
        key: 'getFromIpfs',
        value: async function getFromIpfs(did) {
            var parsedDid = this.parse(did);
            return await this.ipfsAgent.catJSONData(parsedDid.id);
        }
    }, {
        key: 'resolve',
        value: async function resolve(did) {
            return await this.getFromIpfs(did);
        }
    }]);

    return Resolver;
}();

exports.default = Resolver;