document.addEventListener('submit',registerUser);

function registerUser(e){
    e.preventDefault();
    let form= document.getElementById('userForm');
    let data = new FormData(form);
    let name=data.get('name');
    let last_name=data.get('last_name');
    let age=data.get('age')
    let sendObject={
        name:name,
        last_name:last_name,
        age:age
    }

    fetch('/personas',{
        method:"POST",
        body: JSON.stringify(sendObject),
        headers:{
            'Content-type':'application/json'
        }
    }).then(result=>{
        return result.json()
    }).then(json=>{
        Swal.fire({
            title:"ÉXITO",
            text:"Usuario registrado",
            timer:2000,
            allowOutsideClick:false,
            allowEscapeKey:false
        }).then(result=>{
           location.href="/"
        })
    })
}