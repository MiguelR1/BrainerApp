// Carga del componente del header.js
fetch('../shared/header.html')
.then(response => response.text())
.then(data => {
document.querySelector('header').innerHTML = data;
});

const tableros = document.getElementById('tableros');
const divCrearTablero = document.getElementById('crearTablero');

const titleTablero = document.getElementById('title');
const descripTablero = document.getElementById('description');
const imagenArea = document.getElementById('image-preview');

const title = document.getElementById('title');
const descripcion = document.getElementById('description');
const botonGuardar = document.getElementById('btnGuardar');
const mensajeDescripError = document.getElementById('descrip-error');


let tablerosArr = [];

let cantidadArchivosSelec = 0;

//Carta con formulario para crear tablero
function crearTablero(){
    const divTablero = document.getElementById('divTablero');
    if (!divTablero) {
        const cardC = document.createElement('div');
        cardC.setAttribute('id', 'divTablero');
    
        cardC.innerHTML = `
        <div style="height: 450px;" class="max-w-md w-80 p-6 space-y-4 bg-gray-900 border border-gray-800 rounded-lg shadow-xl flex flex-col items-center justify-center" id="divCrearTablero">
            <form id="tableroForm">
              <div class="h-48 border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors duration-200 hover:bg-gray-800 mb-2" onclick="imageTablero()" id="image-preview">
                <svg class="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span class="text-gray-500 font-medium">Importar imagen</span>
                <input type="file" id="file-input" class="hidden" accept="image/*">
              </div>
      
              <div class="mb-2">
                <label for="title" class="sr-only">Título</label>
                <input type="text" id="title" placeholder="Escribe tu título" class="w-full px-4 py-2 border-b-2 border-gray-700 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-200">
                <p id="title-error" style="color: red; margin-top: 3px"></p>
              </div>
      
              <div class="mb-2">
                  <label for="description" class="sr-only">Descripción</label>
                  <textarea id="description" rows="3" placeholder="Escribe una descripción" class="w-full px-4 py-2 border-b-2 border-gray-700 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-none"></textarea>
                    <p id="descrip-error" style="color: red; margin-top: 3px"></p>
              </div>
      
              <div class="m-0 p-0 w-full flex justify-end">
                <button id="btnGuardar" disabled class="px-3 py-1 bg-gray-500 rounded-md text-gray-900 " onclick="guardarTablero()" type="submit">Guardar</button>
              </div>
            </form>
          </div>`;
        
        tableros.insertBefore(cardC, divCrearTablero);
        divCrearTablero.classList.remove('cursor-pointer');
        
        const inputFile = document.getElementById('file-input');
        const tableroForm = document.getElementById('tableroForm');
    
        inputFile.addEventListener('change', (event) => {
            manejoImg(event)
        })
    
        tableroForm.addEventListener('submit', (event) => {
            event.preventDefault()
        })
    
        manejoForm()
    }

}

//Manejo de formulario errores y validaciones
function manejoForm(){    
    const title = document.getElementById('title');
    const descripcion = document.getElementById('description');

    title.addEventListener('input', () => {
        manejoTitleInput()
    })

    title.addEventListener('blur', () => {
        manejoTitleInput()
    })

    descripcion.addEventListener('input', () => {
        manejoDescripInput()
    })

    descripcion.addEventListener('blur', () => {
        manejoDescripInput()
    })
}

function manejoTitleInput(){
    const title = document.getElementById('title');
    const titleInput = title.value;

    const descripcion = document.getElementById('description');
    const descripInput = descripcion.value;

    const botonGuardar = document.getElementById('btnGuardar');
    const mensajeTitleError = document.getElementById('title-error');
    
    if (titleInput.trim() == '') {
        mensajeTitleError.textContent = 'Ingresa un título válido.';
        title.style.borderColor = 'red';
    }else{
        mensajeTitleError.textContent = '';
        title.style.borderColor = '';
    }

    if (descripInput.trim() != '' && titleInput.trim() != '' && cantidadArchivosSelec > 0) {
        
        botonGuardar.disabled = false;
        botonGuardar.classList.add('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
    }else{
        botonGuardar.disabled = true;
        botonGuardar.classList.remove('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
    }
}

function manejoDescripInput(){
    const descripcion = document.getElementById('description');
    const descripInput = descripcion.value;

    const title = document.getElementById('title');
    const titleInput = title.value;

    const mensajeDescripError = document.getElementById('descrip-error');
    const botonGuardar = document.getElementById('btnGuardar');


    if (descripInput.trim() == '') {
        mensajeDescripError.textContent = 'Ingresa una descripción válida.';
        descripcion.style.borderColor = 'red';                    
    }else{
        mensajeDescripError.textContent = '';
        descripcion.style.borderColor = '';
    }

    if (descripInput.trim() != '' && titleInput.trim() != '' && cantidadArchivosSelec > 0) {
        botonGuardar.disabled = false;
        botonGuardar.classList.add('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
    }else{
        botonGuardar.disabled = true;
        botonGuardar.classList.remove('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
    }
}

function manejoImg(event){
    cantidadArchivosSelec = event.target.files.length;
    const imagenArea = document.getElementById('image-preview');
    const title = document.getElementById('title');
    const descripcion = document.getElementById('description');

    const titleInput = title.value;
    const descripInput = descripcion.value;
    const botonGuardar = document.getElementById('btnGuardar');

    if (descripInput.trim() != '' && titleInput.trim() != '' && cantidadArchivosSelec > 0) {
        botonGuardar.disabled = false;
        botonGuardar.classList.add('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
    }else{
        botonGuardar.disabled = true;
        botonGuardar.classList.remove('cursor-pointer', 'hover:bg-gray-800', 'hover:text-gray-500');
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.alt = event.name;
        img.src = event.target.result;

        img.classList.add('w-full', 'h-full', 'object-cover', 'rounded-md');
    
        const numeroDeHijosAEliminar = 3; 
        for (let i = numeroDeHijosAEliminar - 1; i >= 0; i--) {
            imagenArea.removeChild(imagenArea.children[i])
        }

        imagenArea.appendChild(img);
    }
    reader.readAsDataURL(file)
}

//Funcion para llamar inputFile
function imageTablero(){
    let inputFile = document.getElementById('file-input');
    inputFile.click()
}

//Funcion para guardar tablero
function guardarTablero(){
    const titleTablero = document.getElementById('title');
    const descripTablero = document.getElementById('description');
    const imagenArea = document.getElementById('image-preview');
    const divTablero = document.getElementById('divTablero');


    const tabTGuardado = titleTablero.value;
    const tabDGuardado = descripTablero.value;

    //Imagen url
    const tabIGuardado = imagenArea.childNodes[4];
    
    const infoCard = {
        tabImagenTitle: tabTGuardado,
        tabImagenDescrip: tabDGuardado,
        tabImagenUrl: tabIGuardado.src,
        tabId: tablerosArr.length + 1
    }

    tablerosArr.push(infoCard);
    
    localStorage.setItem('Tableros', JSON.stringify(tablerosArr));

    divTablero.remove();
    divCrearTablero.classList.add('cursor-pointer');

    mostrarTableros(infoCard);
}

function mostrarTableros(infoCard){
    const cardDiv = document.createElement('div');

    cardDiv.innerHTML =  `<div style="height: 450px;" class="w-80 flex flex-col items-center justify-center p-4 bg-gray-900 border border-dashed border-gray-700 rounded-lg">
            <div class="h-48 border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center p-4 text-center transition-colors duration-200 mb-4">
            <img class="'w-full h-full object-cover rounded-md" src="${infoCard.tabImagenUrl}" alt="${infoCard.tabImagenTitle}">
            </div>
    
            <div class="mb-2 w-full">
            <label for="title" class="sr-only">Título</label>
            <div class="w-full px-4 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-200">
                <a href="/pages/tablero.html?id=${infoCard.tabId}" class="cursor-pointer text-2xl cardTitle">
                ${infoCard.tabImagenTitle}
                </a>
            </div>
            </div>
    
            <div class="mb-2 w-full">
                <label for="description" class="sr-only">Descripción</label>
                <div rows="3" class="w-full px-4 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-none">${infoCard.tabImagenDescrip}</div>
            </div>
        </div>`;
    tableros.prepend(cardDiv);
}

let cargadoFinal = false;

function getLS(){
    const tablerosLS = localStorage.getItem('Tableros');
    
    if (tablerosLS) {
        const tableroParse = JSON.parse(tablerosLS);
        for (let i = 0; i < tableroParse.length; i++) {
            const element = tableroParse[i];
            mostrarTableros(element);
        }
        cargadoFinal = true;
    }
}
