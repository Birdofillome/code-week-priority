const altaPriorità = document.querySelector(".alta-priorità");
const importantiPriorità = document.querySelector(".importanti-priorità");
const bassaPriorità = document.querySelector(".bassa-priorità");
const divUno = document.querySelector(".phone1");
const divDue = document.querySelector(".phone2");
const divTre = document.querySelector(".phone3");
const btnUno = document.querySelector(".btn-1");
const btnDue = document.querySelector(".btn-2");
const btnTre = document.querySelector(".btn-3");
const btnAdd = document.querySelector(".add-task-btn");
const btnClose = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const addText = document.querySelector(".testo");
const addUserId = document.querySelector(".userId");
const addId = document.querySelector(".id");
const addPriority = document.querySelector(".priority");
const btnSend = document.querySelector(".send");

altaPriorità.style.display = 'none';
importantiPriorità.style.display = 'none';
bassaPriorità.style.display = 'none';

btnSend.addEventListener('click', async (e) => {
    e.preventDefault();
    const taskText = addText.value;
    const taskUserId = addUserId.value;
    const taskId = addId.value;
    const taskPriority = addPriority.value;
    if (taskPriority < 0 || taskPriority > 5) {
        alert("La priorità deve essere un numero tra 0 e 5");
        return;
    }
    const newTask = {
        userId: taskUserId,
        id: taskId,
        title:taskText,
        priority: taskPriority,  
    };
    try {
        const POST = await fetch ('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        const data = await POST.json();
        console.log(data);
        const nuovaTask = document.createElement('li');
        nuovaTask.textContent = (`${data.title}Priority: ${data.priority}`);
        if (data.priority >= 4) {
            altaPriorità.appendChild(nuovaTask);
        } else if (data.priority >= 2) {
            importantiPriorità.appendChild(nuovaTask);
        } else {
        bassaPriorità.appendChild(nuovaTask);
        }
        addText.value = '';
        addUserId.value = '';
        addId.value = '';
        addPriority.value = '';
        modal.style.display = "none";
        console.log("Task aggiunto e modale chiuso")
    } 
    catch (errore) {
    console.error("Errore durante la richiesta di salvataggio:", errore);
}
});

btnAdd.addEventListener("click", openmodal =>{
    modal.style.display = "block";
console.log("Apro modal");
})

btnClose.addEventListener("click", closeModal =>{
    modal.style.display = "none";
    console.log("Chiudo modal");
})

const showList = (show) => {
    altaPriorità.style.display = 'none';
    importantiPriorità.style.display = 'none';
    bassaPriorità.style.display = 'none';
    show.style.display = 'block'; 
};

btnUno.addEventListener('click', () =>{
    showList(altaPriorità);
});

btnDue.addEventListener('click', () =>{
    showList(importantiPriorità);
});
btnTre.addEventListener('click', () =>{
    showList(bassaPriorità);
});

    const appuntamenti = async () => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
            const data = await res.json();
    
            // Creiamo la sezione priority con map e la randomizziamo negli oggetti
            const mappatura = data.map(async appuntamento => {
                const nuovaPriorita = Math.floor(Math.random() * 6);
                const resPatch = await fetch(`https://jsonplaceholder.typicode.com/todos/${appuntamento.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        priority: nuovaPriorita 
                    }),
                });
                const updatedAppuntamento = await resPatch.json();
                // console.log(updatedAppuntamento);
                return updatedAppuntamento;
            });
            const updatedAppuntamenti = await Promise.all(mappatura);
            //per ogni oggetto mappato con il forEach creiamo un li che smistiamo nelle nostre card per valore di priorità
            updatedAppuntamenti.forEach(appuntamento => {
                const lista = document.createElement("li");
                lista.textContent = `${appuntamento.title} Priority: ${appuntamento.priority}`;
                if (appuntamento.priority >= 4) {
                    altaPriorità.appendChild(lista);
                } else if (appuntamento.priority >= 2) {
                    importantiPriorità.appendChild(lista);
                } else {
                    bassaPriorità.appendChild(lista);
                }
            });
        } catch (errore) {
            console.error("Errore durante il fetch o l'aggiornamento della priorità:", errore);
        }
    };
    appuntamenti();
