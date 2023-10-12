
document.addEventListener('DOMContentLoaded',function(){
    const form = document.getElementById('form')
    console.log(form)
    form.addEventListener('submit',function(event){ //ngambil form yg ada submit
        // const data = new todo()
        // console.log(data)
        addTodo()
        event.preventDefault()
        //event.preventDefault();
    })
})

function generateTodoObject(idTodo,textTodo,timestamp,isCompleted){  //fungsi yang mengembalikan object
    return{
        idTodo,
        textTodo,
        timestamp,
        isCompleted
    }
}

function generateId(){
    return +new Date(); //timestamp pada javascript
}

const todos=[]; //menampung object-object berisi data user
const RENDER_EVENT='render-todo' //mendefinisikan custom event bernama render-event
//Custom event ini digunakan sebagai patokan dasar ketika ada perubahan data pada variabel todos, 
//seperti perpindahan todo (dari incomplete menjadi complete, dan sebaliknya), menambah todo, maupun menghapus todo. 


function addTodo(){
    const textTodo = document.getElementById('title').value
    const timestamp = document.getElementById('date').value

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false)
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT)); //panggil sebuah custom event RENDER_EVENT menggunakan method dispatchEvent(). Custom event ini akan kita terapkan untuk me-render data yang telah disimpan pada array todos.
}   

function undoTaskFromCompleted(todoId){
    const todoTarget = findTodo(todoId);

    if(todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(RENDER_EVENT,function(){
    console.log(todos);
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML='';

    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML='';

    for (const todoItem of todos){
        const todoElement = makeTodo(todoItem);
        if(!todoItem.isCompleted){
            uncompletedTODOList.append(todoElement);
        }else{
            completedTODOList.append(todoElement);
        }
        
    }
});

function findTodo(todoId){
    for(const todoItem of todos){
        if(todoItem.idTodo==todoId){
            return todoItem;
        }
    } //findTodo, yang mana berfungsi untuk mencari todo dengan ID yang sesuai pada array todos.
    return null;
}

function removeTaskFromCompleted(todoId){
    const todoTarget = findIndexTodo(todoId)

    if(todoTarget=== -2)return;
    todos.splice(todoTarget,1);
    document.dispatchEvent(new Event(RENDER_EVENT));

    // for(const todoItem of todos){
    //     if(todoItem.isCompleted==true){
    //         return null;
    //     }
    // }
}

function findIndexTodo(todoId){
    for(const index in todos){
        if(todos[index].idTodo===todoId){
            return index;
        }
    }
    return -2;
}

function makeTodo(todoObject){
    const textTitle = document.createElement('h2');
    textTitle.innerText=todoObject.textTodo;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText=todoObject.timestamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle,textTimestamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.idTodo}`);
    console.log(container);

    if(todoObject.isCompleted){
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');

        undoButton.addEventListener('click', function(){
            undoTaskFromCompleted(todoObject.idTodo);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');

        trashButton.addEventListener('click',function(){
            console.log(removeTaskFromCompleted(todoObject.idTodo));
        })

        container.append(undoButton,trashButton);
    } else{
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');

        checkButton.addEventListener('click', function(){
            addTaskToCompleted(todoObject.idTodo); //pada tombol ini (checkButton) memanggil addTaskToCompleted, yang mana akan memindahkan todo dari rak “Yang harus dilakukan” ke rak “Yang sudah dilakukan”.
            console.log(addTaskToCompleted);
        });

        container.append(checkButton);
    }

    return container;

}

function addTaskToCompleted(todoId){
    const todoTarget = findTodo(todoId);

    if(todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}






// class todo{
//     constructor(id,isCompleted,task,date){
//         this.id=id;
//         this.isCompleted=isCompleted;
//         this.task=task;
//         this.date=date;
//     }

//     addTodo () {
//         id=generateId();
//         this.isCompleted=false;
//         task=document.getElementById('title').value;
//         date=document.getElementById('date').value;
//     }
// }

// function addTodo(){
//     const dataTodo = {
//         id: Math.round(Math.random()*100),
//         isCompleted: false,
//         task: document.getElementById('title').value,
//         date : document.getElementById('date').value
//     }
//     console.log(dataTodo)
    
// };


