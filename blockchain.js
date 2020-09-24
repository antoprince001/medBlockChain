const sha256 = require('sha256');
const prompt = require('prompt-sync');
const fs = require("fs");

function Medchain(){
    this.chain = [
        {                          //Genesis block
            BlockNo:  0,
            timestamp : Date.now(),
            blockAdderId : 0,
            hospital : 0,
            record   : [],
            previousBlockHash : 0,
            hash : 0
        }

    ];
    this.pendingRecords = [];

    this.requestContracts = [];

    this.hospitalNetworkNodes = ['A','B','C','D'];

}
;

Medchain.prototype.createNewBlock =  function(blockAdderId,hospitalId){

    const newBlock = {
        BlockNo:  this.chain.length,
        timestamp : Date.now(),
        blockAdderId : blockAdderId,
        hospital : hospitalId,
        record   : this.pendingRecords,
        contracts : this.requestContracts
    };
    let previousBlockHash = this.getPreviousBlockHash();
    let dataAsString = previousBlockHash + JSON.stringify(newBlock);
    newBlock['previousBlockHash'] = previousBlockHash;
    newBlock['hash']=  sha256(dataAsString);

    this.chain.push(newBlock);
    let datum =  JSON.stringify(newBlock);
    fs.appendFileSync('blockData.json', datum);
    this.pendingRecords = [];
    this.requestContracts=[];
    console.log('New Block Added');
}

Medchain.prototype.createNewRecord = function(name,bloodGroup,allergy,medication){


    this.pendingRecords.push({ name , bloodGroup , allergy , medication });
    console.log('Record added !\n');
};

Medchain.prototype.getPreviousBlockHash =  function()
{
     return this.chain[this.chain.length -1].hash ;

};

Medchain.prototype.createRequestContract= function(accessor,recordKey){


    this.requestContracts.push({
        accessor : accessor,
        recordKey: recordKey
    });
};


Medchain.prototype.validateBlockchain =  function(){
  for(var i = 1; i< this.chain.length;i++)
  {
    if( this.chain[i].previousBlockHash !== this.chain[i-1].hash)
    {
      return 'Blockchain compromised at ' + i-1
    }
  }
  return 'Blockchain immutability persists'
}
module.exports = Medchain;
