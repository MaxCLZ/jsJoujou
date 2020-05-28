
const LevelEnum = [
    {
        level:'enfant',
        percentMeet: 20,
        percentSurvive: 30
    },
    {
        level:'adulte',
        percentMeet: 40,
        percentSurvive: 60
    },
    {
        level:'senior',
        percentMeet: 60,
        percentSurvive: 20
    }
];

Object.freeze(LevelEnum);

class EtreVivant{
    constructor(name)
    {
        this.age = Math.random()*100;
        this.name = name || 'NoName';
        this.isAlive = true;
    }
    printDetails()
    {
        return ` Nom : ${this.name} | Age : ${this.age} | Vivant : ${this.isAlive} `;
    }

    getDetails(){
        return JSON.stringify(this);
    }
}

 class Humain extends EtreVivant {
    constructor(name)
    {
        super(name);
        this.level = LevelEnum[Math.floor(Math.random() *LevelEnum.length)];
        this.meetPercentage = this.level.percentMeet || 50;
        this.survivePercentage = this.level.percentSurvive || 50;
    }

    printDetails(){
        console.log(`${super.printDetails()} MeetPercentage : ${this.meetPercentage} | Survive percentage : ${this.survivePercentage} | Level : ${ JSON.stringify(this.level)}`);
    }

    doesMeetZombie(){
        let randomMeet  = Math.random()*100;
        return(randomMeet <= this.meetPercentage);
    }

    meetZombie(){ //est-ce qu'il survit ?
        let randomSurvive = Math.random()*100;
        if(randomSurvive <= this.survivePercentage)
        {
            this.isAlive = false; 
        }
    }
}

class Zombie extends EtreVivant{
    constructor(name)
    {
        super(name);
        this.daysLeft= 10;
        this.diePercentage = 50;
    }   
    printDetails(){
        console.log(`${super.printDetails()}  Days Left : ${this.daysLeft} | Die Percentage : ${this.diePercentage}`);
        super.printDetails();
    }
}

module.exports = {
    // EtreVivant: EtreVivant,
    Humain: Humain,
    Zombie: Zombie
};

