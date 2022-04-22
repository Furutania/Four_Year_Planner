const draggables = document.querySelectorAll('.draggable'); //gets the draggable objects ie courses
const containers = document.querySelectorAll('.container'); //gets the containers ie semesters 
const fallOneContainer = document.getElementById("fallOneContainer");
var allSemesters = [];
//let limited in scope
//var can be global 
onselectstart();
updateCredits();
draggables.forEach(draggable =>{
    draggable.addEventListener('dragstart', () => { //if a draggable object it being dragged 
        draggable.classList.add('dragging'); //give the class a dragging
    })

    draggable.addEventListener('dragend', () => { //when the object is no longer dragged
        draggable.classList.remove('dragging'); //removes the class dragging
    })
})
var i = 0 ;
var j = 0;
//Creates our class and semester objects from HTML elements
function onselectstart(){
    var sems = document.body.getElementsByTagName('div'); //gets all elements with div tag
    for( i = 0; i < sems.length; i++){
        sems[i] 
        var semName = sems[i].getElementsByTagName('h4'); //gets all elemenets with h4 tag
        if(semName.length >= 1){
            var newSemester = new semester(semName[0].textContent); //create a new semester object
        }
        var courseTitles = sems[i].getElementsByTagName('p'); //get all p elements in container
        for(j = 0; j < courseTitles.length; j++){
            let text = courseTitles[j].textContent;
            classStats = text.split(" ");   
            var newCourse = new course(classStats[0] + " " + classStats[1], classStats[2]); //creates a course object with name and credits
            if(courseTitles[j].classList.contains("Core")){
                newCourse.setIsCore(); //if the course has a Core class set iScore to true
            }
            newSemester.add(newCourse); //adds course to semester
        }
        allSemesters.push(newSemester);//adds semester to our list of semesters 
    }
    //exportSchedule();
}

//Code is from drag and drop tutorial on youtube by Web dev Simplified 
//https://www.youtube.com/watch?v=jfYWwQrtzzY
containers.forEach(container => { 
    container.addEventListener('dragover', e =>{ //when an element is bring dragged in a container
        e.preventDefault();//removes the do not place icon on mouse when hovering
        //Check if container is spring or fall 
        var containerType = container.classList;
        const afterElement = getDragAfterElement(container, e.clientY);
        updateCredits();
        let wasLegal = false; //Checks if the move was legal
        const draggable = document.querySelector('.dragging'); //grabs the element being dragged
        let classType = draggable.classList;
        let classIfo = draggable.textContent;
        let courseName = classIfo.split(" ");
        if(classType.length == 2 || classType.contains("Core") ){ //if classtype is only draggable and dragging
            if (afterElement == null){
                container.appendChild(draggable); //add or object to container
                wasLegal = true;
            }
            else{
                container.insertBefore(draggable, afterElement);
                wasLegal = true;
            }
        }
        else if(classType.contains("springClass")){ // if its a spring 
            if (afterElement == null && (!containerType.contains("fallSem"))){
                container.appendChild(draggable)
                wasLegal = true;
            }
            else if(!containerType.contains("fallSem")){
                container.insertBefore(draggable, afterElement);
                wasLegal = true;
            }
        }
        else if(classType.contains("fallClass")){ // if its a fall class 
            if (afterElement == null && (!containerType.contains("springSem"))){
                container.appendChild(draggable);
                wasLegal = true;
            }
            else if(!containerType.contains("springSem")){
                container.insertBefore(draggable, afterElement);
                wasLegal = true;
            }
        }
        if(wasLegal == true){ //if placement is legal 
        let name = container.getElementsByTagName('h4');
        var newCourse = new course(courseName[0] + " " + courseName[1], courseName[2]);
        for(var i = 0; i < allSemesters.length; i++){
            var bool = allSemesters[i].getIsCore(newCourse);
            allSemesters[i].remove(newCourse); //remove course from past semester 
            if(bool){
                newCourse.setIsCore();
            }
            if(name[0].textContent == allSemesters[i].name){
                allSemesters[i].add(newCourse); //add it to new semester 
            }
        }
    }   
    })
})
//Code is from drag and drop tutorial on youtube by Web dev Simplified 
//https://www.youtube.com/watch?v=jfYWwQrtzzY
function getDragAfterElement(container, y){ //determines the y position of mouse 
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')] //gets all elements in our container as an array
    return draggableElements.reduce((closest, child) => { //finds the element right after our y mouse position
        const box = child.getBoundingClientRect() //gets dimensions and positions of box
        const offset = y - box.top - box.height/2 
        if (offset < 0 && offset > closest.offset){
            return { 
                offset: offset, 
                element: child
            }
        }
        else{
            updateCredits();
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element //default offset is infinity
}

function updateCredits(){
    var total = 0;

    //Fall 1
    var numCredits = calcCredits(0);
    total += numCredits;
    document.getElementById("fallOneCreditVal").innerHTML = ("Credits " + (numCredits));
    
    //Spring 1
    numCredits = calcCredits(1);
    total += numCredits;
    document.getElementById("springOneCreditVal").innerHTML = ("Credits " + (numCredits));

    //Fall 2
    numCredits = calcCredits(2);
    total += numCredits;
    document.getElementById("fallTwoCreditVal").innerHTML = ("Credits " + (numCredits));

    //Spring 2
    numCredits = calcCredits(3);
    total += numCredits;
    document.getElementById("springTwoCreditVal").innerHTML = ("Credits " + (numCredits));

    //Fall 3
    numCredits = calcCredits(4);
    total += numCredits;
    document.getElementById("fallThreeCreditVal").innerHTML = ("Credits " + (numCredits));

    //Spring 3
    numCredits = calcCredits(5);
    total += numCredits;
    document.getElementById("springThreeCreditVal").innerHTML = ("Credits " + (numCredits));

    //Fall 4
    numCredits = calcCredits(6);
    total += numCredits;
    document.getElementById("fallFourCreditVal").innerHTML = ("Credits " + (numCredits));

    //Spring 4
    numCredits = calcCredits(7);
    total += numCredits;
    document.getElementById("springFourCreditVal").innerHTML = ("Credits " + (numCredits));

    //Transfered
    numCredits = calcCredits(8);
    total += numCredits;
    document.getElementById("transferedCreditVal").innerHTML = ("Credits " + (numCredits));

    document.getElementById("totalCredits").innerHTML = ("Total Credits " + (total));

    let numCore = checkNumCore();
    if(numCore < 1){
        document.getElementById("coreRequirements").innerHTML = ("Missing "  + (1 - numCore) +  " Core class");
    }
    else{
        document.getElementById("coreRequirements").innerHTML = ("All core classes accounted for");
    }
}
//
function checkNumCore(){
    let numCore = 0;
    for(i = 0; i < 9; i++){ //Goes through the Semester List
        let thisSem = allSemesters[i].getList(); 
        for(j = 0; j < thisSem.length; j++){ // Goes through the classes stored in the semster lists
            if (thisSem[j].getIsCore()){
                numCore += 1;
            }
        }
    }
    return numCore; //Total number of core classes
}

function calcCredits(index){ //takes index of semester in the list
    let creditNum = 0;
    let thisSem = allSemesters[index].getList();
    for(i = 0; i < thisSem.length; i ++){ // Goes through the list of courses, get the num credits and add it to our total
        creditNum += parseInt(thisSem[i].getCredits());
    }
    return creditNum
}
