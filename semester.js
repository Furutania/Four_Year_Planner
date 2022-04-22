class semester{
    constructor(name){
        this.classes = new Array();
        this.name = name;
    }

    add(course){
        for(var i = 0; i < this.classes.length; i++){
            if(course.name == this.classes[i].name){
                return;
            }
        }
        this.classes.push(course);
    }
    getList(){
        return this.classes;
    }
    getName(){
        return this.name;
    }
    getIsCore(courseName){
        for(var i = 0; i < this.classes.length; i++){
            if(courseName.name == this.classes[i].name){
                return this.classes[i].getIsCore();
            }
        }
    }
    remove(courseToRemove){
        for(var i = 0; i < this.classes.length; i++){
            if(courseToRemove.name == this.classes[i].name){
                this.classes.splice(i, 1);
            }
        }
    }
}
