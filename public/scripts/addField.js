//procurar o botao
document.querySelector("#add-time")
// quando clicar no botao
.addEventListener('click', cloneField);

//executar açao
function cloneField(){
    //duplicar os campos. que campos ?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

    //pegar os campos. que campos ?
    const fields = newFieldContainer.querySelectorAll('input');

    //para cada campo, limpar!
    fields.forEach(function(field){
        //pegar o field do momento e limpa
        field.value = "";
    })

    //duplicar na página
    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}