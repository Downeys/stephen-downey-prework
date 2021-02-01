var students = ['Jim', 'Jan', 'Jerry'];

alert("You will now be prompted for the names of 3 students.")

for(let i=0; i<3; i++){
    const newStudent = prompt("Enter a name for student " + (i+1));
    students.push(newStudent);
};

for(let i=0; i<students.length; i++){
    console.log(students[i]);
}