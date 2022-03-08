const url = "http://localhost:3000/personas/";
let currentId = 0;

const appiCall = async () => {
    const resp = await fetch(url);
    if (resp.status == 200) {
        const results = await resp.json();
        return results;
    }
    else {
        alert("Server error");
    }
}

window.onload = () => {    
    
    document.querySelector(".formulario").addEventListener("submit", handleSubmit);

    appiCall()
        .then(data=>{
            if (data && data.length > 0) {
                let persona = data[0];
                currentId = persona.id;
                document.getElementById("usuario").value = persona.usuario;
                document.getElementById("apellido").value = persona.apellido;
                document.getElementById("contrasenia").value = persona.contrasenia;
                document.getElementById("nombre").value = persona.nombre;
                document.getElementById("emailCompania").value = persona.correoEmpresa;
                document.getElementById("emailPersonal").value = persona.correoPersonal;
                document.getElementById("ciudad").value = persona.ciudad;
                document.getElementById("imagen").value = persona.urlImagen;
                document.getElementById("fechaCreacion").value = persona.fechaCreacion;
                document.getElementById("activo").checked = persona.activado;
                document.getElementById("fechaFin").value = persona.fechaFin; 
            }  
        })
        .catch (error => console.log(error));  
}

const handleSubmit = (event) => {
    event.preventDefault();
    let persona = {
        usuario: document.getElementById("usuario").value,
        apellido: document.getElementById("apellido").value,
        contrasenia: document.getElementById("contrasenia").value,
        nombre: document.getElementById("nombre").value,
        correoEmpresa: document.getElementById("emailCompania").value,
        correoPersonal: document.getElementById("emailPersonal").value,
        ciudad: document.getElementById("ciudad").value,
        urlImagen: document.getElementById("imagen").value,
        fechaCreacion: document.getElementById("fechaCreacion").value,
        activado: document.getElementById("activo").checked,
        fechaFin: document.getElementById("fechaFin").value        
    }
    
    //Update & validate
    if (!(validate(persona))) {        
        return false;        
    } else {
        updateUser(persona)
        .then(res => alert("Usuario actualizado"))
        .catch(error => console.log(error));
        
    }    
}

const validate = newUser => {
    for (const [key, value] of Object.entries(newUser)){        
        if (value == null || value == ""){     
            alert (`Error en ${key}`);
            window.location.reload();
        }             
    }
    return true;
}

//PUT
const updateUser = async (newUser) => {
    const res = await fetch(url + currentId, {
        method: "PUT",
        body: JSON.stringify({
            usuario: newUser.usuario,
            apellido: newUser.apellido,
            contrasenia: newUser.contrasenia,
            nombre: newUser.nombre,
            correoEmpresa: newUser.correoEmpresa,
            correoPersonal: newUser.correoPersonal,
            ciudad: newUser.ciudad,
            urlImagen: newUser.urlImagen,
            fechaCreacion: newUser.fechaCreacion,
            active: newUser.active,
            fechaFin: newUser.fechaFin
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status != 200) alert("Server Error");
    else {
        const data = await res.json();
        return data;
    }
}