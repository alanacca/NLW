// Procurar o botão
document.querySelector("#add-time")

//Quando clicar no botão
.addEventListener('click', cloneField)



//Executar uma ação
function cloneField() {
    console.log("Cheguei aqui")
    //DUPLICAR OS CAMPOS (QUE CAMPOS??) 
    //Peguei o campo que eu quero duplicar e clonei
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true)//Se não colocar o true ele pega o nó (div), mas não pega os filhos (tudo que ta dentro da div). Sem o true ele pega só <div id="schedule-item"></div>

    //o const é para caso eu coloque mais código na página o fields não consiga mudar de valor. Ele vais er uma variável constante.

    //LIMPAR OS CAMPOS DAS HORAS ANTES DE COLOCAR NA PÁGINA
    const fields = newFieldContainer.querySelectorAll('input')//os inputs vão ser armazenados em uma NodeList

    /* 1º forma de limpar os fields
    var i;
    for(i=0; i<fields.length; i++) {//para cada campo do fields, limpar os dados
        fields[i].value = "";
    }*/


    //2º forma de limpar os fields
    fields.forEach(function (field) {//field é o nome da variavel que eu coloquei para cada elemento dentro da NodeList fields
        //pegar o field do momento e limpa ele
        field.value = ""
    })


    //COLOCAR NA PÁGINA
    
    //onde??Peguei a div onde eu quero colocar que é a que tem a class = "schedule-items" e fiz um appendChild.
    document.querySelector("#schedule-items").appendChild(newFieldContainer)

}   
    