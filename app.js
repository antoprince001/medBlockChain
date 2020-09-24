const Blockchain  = require('./blockchain');
const prompt = require('prompt-sync')({ sigint : true } );
const hospitalCurrent = -1;
let input = 0;

const Medchain = new Blockchain();
do
{

    console.log('\n\n-----Welcome to MEDCHAIN----- \n\n');

    console.log('  1. Create Record \n  2. Create Block \n  3. Validate Blockchain ');
    console.log('  4. View Blockchain \n  5. Request a record \n ');
    input = Number(prompt('Enter : '));

    switch(input)
    {
        case 1:
            let name = prompt('Name: ');
            let bloodGroup = prompt('Blood Group: ');
            let allergy = prompt('Allergy: ');
            let medication = prompt('Medication: ');
            let recordKey = Medchain.pendingRecords.length+1;
            Medchain.createNewRecord(name,bloodGroup,allergy,medication);
            break;

        case 2:
            let id = prompt('Enter valid id to proceed : ');
            let hospitalId = Medchain.hospitalNetworkNodes[(hospitalCurrent+1)%4];
            Medchain.createNewBlock(id,hospitalId);
            break;

        case 3:
            let res = Medchain.validateBlockchain();
            console.log(res);
            break;

        case 4:
            console.log(Medchain);
            break;

        case 5:
            let accessor = prompt('Enter your key');
            let record   = prompt('Enter id of record you wish to access');
            Medchain.createRequestContract(accessor,record);
            break;


    }
    if(input > 5)
    {
        console.log('GoodBye');
        break;
    }


}while(true);
