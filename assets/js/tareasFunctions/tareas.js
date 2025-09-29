const listaTodo = document.getElementById('listaTodo');
const listaProgress = document.getElementById('listaProgress');
const listaReview = document.getElementById('listaReview');

const listaCheck = document.getElementById('listaDone');

const tareaForm = document.getElementById('taskForm');

const listasDrop = document.querySelectorAll('.drop-zone');
const lineDone = document.getElementById('lineDone');

const paramId = new URLSearchParams(window.location.search).get('id');
const tareas = localStorage.getItem('Tareas');

let listaTareas = [];


function checkTareaF(event, ulTarea){
    if (event.checked) {

        const tareaId = ulTarea.id;
        for (let i = 0; i < tarea.length; i++) {

            const element = tarea[i].tareas;
            
            for (let i = 0; i < element.length; i++) {
                const element2 = element[i];

                if (element2.id == tareaId) {
                    element2.done = true;
                }
            }
        }

        const tituloTarea = ulTarea.children[1];
        
        ulTarea.classList.remove('draggable');
        tituloTarea.classList.remove('cursor-pointer');
        ulTarea.removeAttribute('draggable');
        listaCheck.appendChild(ulTarea);
    } else {
        const tareaId = ulTarea.id;
        for (let i = 0; i < tarea.length; i++) {
            const element = tarea[i].tareas;
            for (let i = 0; i < element.length; i++) {
                const element2 = element[i];
                if (element2.id == tareaId) {
                    element2.done = false;
                }
            }
        }
        
        const drag = ulTarea.classList.contains('draggable');
        
        if (!drag) {
            const tituloTarea = ulTarea.children[1];
            ulTarea.classList.add('draggable');
            tituloTarea.classList.add('cursor-pointer');
            ulTarea.setAttribute('draggable', true);
            listaCheck.insertBefore(ulTarea,lineDone);
        }
    }
    localStorage.setItem('Tareas', JSON.stringify(tareasLS));
}

function mostrarTareas(tarea){
    const ulTarea = document.createElement('ul');
    ulTarea.id = tarea.id; 

    ulTarea.classList.add('flex', 'items-center', 'gap-2', 'draggable');
    ulTarea.setAttribute('draggable', 'true');

    ulTarea.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.classList.add('dragging');
    });

    ulTarea.addEventListener('dragend', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.classList.remove('dragging');
    });

    ulTarea.addEventListener('click', (event) => {

        for (let i = 0; i < tareasLS.length; i++) {
            const tarea = tareasLS[i]; 
            
            if (tarea.idTablero == idTablero) {
                const arrTareas = tarea.tarea;
                const tareaEncontradaId = arrTareas.find(m => m.id = ulTarea.id);

                if (tareaEncontradaId) {

                    console.log(tareaEncontradaId);
                    
                    const modalEditTask = document.getElementById('taskModalEdit');
                    modalEditTask.style.display = 'flex';
            
                    const title = document.getElementById('task-title-edit');
                    const description = document.getElementById('task-description-edit');
                    const date = document.getElementById('task-dueDate-edit');
                    const priority = document.getElementById('task-priority-edit');
                    const tags = document.getElementById('task-tags-edit');
            
                    title.value = tareaEncontradaId.titulo;
                    description.value = tareaEncontradaId.descripcion;
                    date.value = tareaEncontradaId.date;
                    priority.value = tareaEncontradaId.priority;
                    tags.value = tareaEncontradaId.etiquetas;
                }
            }
        } 

    })

    const checkTarea = document.createElement('input');
    checkTarea.setAttribute('type', 'checkbox');
    checkTarea.classList.add('form-checkbox', 'w-5');
    checkTarea.id = 'checkTarea';

    const inputTarea = document.createElement('div');
    inputTarea.setAttribute('class', 'w-full border-b border-gray-200 focus:border-indigo-500 transition-all duration-300 ease-in-out focus:outline-none me-5 my-2 font-bold cursor-pointer');
    inputTarea.innerHTML = tarea.titulo;
    
    ulTarea.appendChild(checkTarea);
    ulTarea.appendChild(inputTarea);

    checkTarea.addEventListener('change', (event) => {
        checkTareaF(event.target, ulTarea);
    });

    switch (tarea.idSeccion) {
        case 'listaTodo':
            listaTodo.appendChild(ulTarea);
            break;

        case 'listaProgress':
            listaProgress.appendChild(ulTarea);
            break
        case 'listaReview':
            listaReview.appendChild(ulTarea);
            break

        case 'listaDone':

        console.log(ulTarea);
        
            listaCheck.insertBefore(ulTarea, lineDone);
            break

        default:

            break;
    }

}

listasDrop.forEach(dropZone => {
    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();   
        event.currentTarget.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (event) => {
        event.currentTarget.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();

        event.currentTarget.classList.remove('dragover');
        const data = event.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(data);
        const seccionDrop = event.currentTarget.id;
        const idTarea = draggedElement.id;

        
        for (let i = 0; i < tareasLS.length; i++) {
            const tablero = tareasLS[i];
            
            if (tablero.idTablero == idTablero) {
                const arrTareas = tablero.tarea;
                const tareaEncontrada = arrTareas.find(m => m.id == idTarea);
                tareaEncontrada.idSeccion = seccionDrop;
            }
        }
        
        
        if (draggedElement) {
            const listaDone = event.currentTarget.id;
            
            if (listaDone == 'listaDone') {
                event.currentTarget.insertBefore(draggedElement, lineDone);
            }else{
                event.currentTarget.appendChild(draggedElement);      
            }
            
            draggedElement.classList.remove('dragging');
        }
        
        localStorage.setItem('Tareas', JSON.stringify(tareasLS))
    });
});

let tareasLS = [];
let tarea = [];

tareaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('task-title').value;
    const descripcion = document.getElementById('task-description').value;
    const date = document.getElementById('task-dueDate').value;
    const priority = document.getElementById('task-priority').value;
    const etiquetas = document.getElementById('task-tags').value; 
    const id = 'tarea-' + Date.now();

    let tarea = {
        id: id,
        titulo: title,
        descripcion: descripcion,
        date: date,
        priority: priority,
        etiquetas: etiquetas
    }
    guardarTarea(tarea);
})


function guardarTarea(tareaParam){

    let tareaDetalle = {
        idSeccion: 'listaTodo',
        id: tareaParam.id,
        titulo: tareaParam.titulo,
        descripcion: tareaParam.descripcion,
        date: tareaParam.date,
        priority: tareaParam.priority,
        etiquetas: tareaParam.etiquetas,
        done:false
    };

    mostrarTareas(tareaDetalle);

    const tableroEncontrado = tareasLS.findIndex(m => m.idTablero == idTablero)
    
    if (tableroEncontrado >= 0) {
        tareasLS[tableroEncontrado].tarea.push(tareaDetalle)
    }else{
        tarea.push(tareaDetalle);
        
        tareasLS.push({
            idTablero: idTablero,
            tarea: tarea
        })
    }
    
    localStorage.setItem('Tareas', JSON.stringify(tareasLS));
    closeModal('taskModal');
}

function openModal() {
    const taskModal = document.getElementById('taskModal');
    taskModal.style.display = 'flex';
}

function closeModal(div) {
    const taskModal = document.getElementById(div);
    taskModal.style.display = 'none';
}
