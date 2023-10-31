const url = 'http://localhost:3000/api/provedor/'

let resultados = ''
let opcion = ''

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.querySelector('tbody')
  const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
  const formProvedores = document.querySelector('form');
  const btnEditar = document.getElementById('btnEditar');
  const btnCrear = document.getElementById('btnCrear');
  const id = document.querySelector('id')
  const ciudad = document.querySelector('#ciudad')
  const direccion = document.querySelector('#direccion')
  const nombre = document.querySelector('#nombre')
  const telefono = document.querySelector('#telefono')
  const nit = document.querySelector('#nit')

  btnCrear.addEventListener('click', () => {
    opcion='crear'
    modalEditar.show();
  });


  //Mostrar datos
  const mostrar = (provedores) => {
    provedores.forEach(provedor => {
      resultados += ` <tr>
                        <td>${provedor.id}</td>
                        <td>${provedor.ciudad}</td>
                        <td>${provedor.direccion}</td>
                        <td>${provedor.nombre}</td>
                        <td>${provedor.telefono}</td>
                        <td>${provedor.nit}</td>
                        <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                      </tr>
                    `
    });
    contenedor.innerHTML = resultados
  }

  fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))


  const on = (elemet,event,selector,handler)=>{
    console.log(elemet)
    elemet.addEventListener(event, e=>{
      if(e.target.closest(selector)){
        handler(e)
      }
    })
  } 
  //Procedimiento de borrado
  on(document,'click','.btnBorrar',e=>{
    const fila = e.target.parentNode.parentNode
    const id= fila.firstElementChild.innerHTML
    fetch(url+id, {
      method: 'DELETE'
    })
    .then(res=> res.json())
    .then(()=>location.reload())
    console.log(id)
  }) 
  //Procedimiento de edicion
  let idForm =0
  on(document,'click','.btnEditar',e=>{
    const fila = e.target.parentNode.parentNode
    idForm= fila.children[0].innerHTML
    
    const ciudadForm= fila.children[1].innerHTML
    const direccionFrom= fila.children[2].innerHTML
    const nombreFrom= fila.children[3].innerHTML
    const telefonoFrom= fila.children[4].innerHTML
    const nitFrom= fila.children[5].innerHTML
    ciudad.value=ciudadForm
    direccion.value=direccionFrom
    nombre.value=nombreFrom
    telefono.value=telefonoFrom
    nit.value=nitFrom
    opcion='editar'
    modalEditar.show()
  }) 
  //Procedimiento de edicion y creacion
  formProvedores.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){
      console.log('crear')
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          ciudad:ciudad.value,
          direccion: direccion.value,
          nombre: nombre.value,
          telefono:telefono.value,
          nit:nit.value
        })
       })
      .then(res=> res.json())
      .then(data=>{
        const nuevoProvedor=[]
        nuevoProvedor.push(data)
        mostrar(nuevoProvedor)
      })
      console.log(id)
    }
    if(opcion=='editar'){
      console.log(idForm)
      fetch(url+idForm, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          ciudad:ciudad.value,
          direccion: direccion.value,
          nombre: nombre.value,
          telefono:telefono.value,
          nit:nit.value
        })
       })
       .then(res=> res.json())
       .then(res=> location.reload())
    }
    modalEditar.hide()
  })

});
