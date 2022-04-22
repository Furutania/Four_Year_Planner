/**
 * Course object 
 */
class course{
    constructor(name, numCredits,){
        this.name = name;
        this.numCredits = numCredits;
        this.isCore = false;
    }

    getCredits(){
        return this.numCredits
    }
    getName(){
        return this.name
    }
    setIsCore(){
        this.isCore = true;
    }
    getIsCore(){
        return this.isCore;
    }
    getInfo(){
        console.log("name: " + this.name + " num credits " + this.numCredits);
    }
}