var module  = require('./ClassesDefinition')

// let EtreVivant = module.EtreVivant;
let Humain= module.Humain;
let Zombie = module.Zombie;
// let etre1 = new EtreVivant('Max');
let zb= new Zombie('Zombie');
let humain = new Humain('Ludo');
zb.printDetails();
humain.printDetails();


let listHumains = [];

for(let i= 0 ; i<10 ; i++)
{
    let humain = new Humain();
    listHumains.push(humain);
    humain.printDetails();
}  
    

for (let i=1; i<=100; i++){
    let counterDead = 0;
    let counterAlive=0;

    listHumains.forEach(element => {
        if(!element.isAlive)
            return;
        if(!element.doesMeetZombie())
        {
            counterAlive++;
            return;
        }
        
        element.meetZombie();

        element.isAlive ? counterAlive++ : counterDead++;
    });

    const areAllDead = listHumains.find(element => element.isAlive === true) === undefined;
    console.log(`Jour ${i}:`);

    console.log(`Il y a eu ${counterDead} personnes mortes aujourd'hui`);
    console.log(`Il reste  ${counterAlive} personnes vivantes`);
    if(areAllDead)
    {
        console.log(`La colonie a tenu ${i} jours`);
        break;
        
    }
}
    

