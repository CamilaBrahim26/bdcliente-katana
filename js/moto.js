


//ADD CONTENT BUTTON
const addMoto = async () => {
  let nombreCliente = document.getElementById('nombreClienteInput').value
  let fechaIngreso = document.getElementById('fechaIngresoInput').value
  let telefono = document.getElementById('telefonoInputmoto').value
  
  if (fechaIngreso == '', nombreCliente == '' , telefono == '') {
    alert('Por favor, complete todos los campos');
  return
  } else {
    await fetch(' http://localhost:4000/motos',{
      method: 'POST',
      body: JSON.stringify({
      fechaIngreso,
      nombreCliente,
      telefono
  
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    alert ('Moto ingresada con exito ')
  }
};

const loadTable = async () => {
  let result = await fetch('http://localhost:4000/motos');
  let content = await result.json();

  content.forEach(moto => {
    let tableBody = document.getElementById('tbodymoto');
    let tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${moto.id}</td>  <td>${moto.fechaIngreso}</td>
      <td>${moto.nombreCliente}</td>
      <td>${moto.telefono}</td>
      <td><button type="button" class="btn btn-link link-dark" onclick="enviarMensaje(this)" id=${moto.id}><i class="bi bi-car-front-fill"></i></button></td>
      <td><button type="button" class="btn btn-link link-dark" onclick="editContent(this)" id=${moto.id}><i class="bi bi-pencil-fill"></i></button></td>
    `;

    tableBody.appendChild(tr); // Use appendChild for new rows at the end
  });
};


const editContent = async (moto) => {
  let result = await fetch ('http://localhost:4000/motos')
  let content = await result.json ()
  let idLine = content.find (para => para.id == moto.id)
  let id = idLine.id

  let value = prompt ('Ingrese aquí el tipo de elemento que desea cambiar')
  let change = prompt ('ingrese aqui el cambio que quiere realizar')
   switch (value) {
    case 'fecha de ingreso':
      await fetch(`http://localhost:4000/motos/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({
          fechaIngreso: change
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        }
      })
    break;
    case 'nombre cliente':
      await fetch(`http://localhost:4000/motos/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({
          nombreCliente: change
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
    break;    
    case 'telefono':
      await fetch(`http://localhost:4000/motos/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({
          telefono: change
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
    break; 
  

    default:
      alert ('ingrese correctamente el tipo de elemento que quiere modificar')
      break;
   }
};

const enviarMensaje = async (moto) =>{
  const response = await fetch(`http://localhost:4000/motos/${moto.id}`);
  const motoData = response.json();
  const telefono = motoData.telefono;
  const url = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola%2C%20tu%20moto%20ya%20esta%20lista%20!`;
  window.open(url, "_blank");
}


//ONLOAD FUNCTIONS EJECUTIONS
window.onload = loadTable ();