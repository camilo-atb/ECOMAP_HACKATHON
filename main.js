/* ================================ MAPA BOGOTÁ ====================================*/ 

let mapa = L.map("mapa-bogotá").setView([4.658563, -74.096134], 11);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
  foo: "bar",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);


/* ====================== ZOOM LOCALIDADES ==================== */ 

document.getElementById("seleccionar-localidad").addEventListener("change", function(e) {
  let coordenadas = e.target.value.split(",");
  if (coordenadas.length === 2) { // El if es para asegurar que el valor extraído del elemento <select> se ha dividido correctamente en dos partes: latitud y longitud.
      // Convertimos las coordenadas a números flotantes
      let lat = parseFloat(coordenadas[0]); // flyTo requiere coordenadas numéricas y no cadenas de texto.
      let lng = parseFloat(coordenadas[1]); // flyTo requiere coordenadas numéricas y no cadenas de texto.

      // Usa flyTo con las coordenadas y el nivel de zoom
      mapa.flyTo([lat, lng], 15);
  }
});

/* ============================================================================================================================ */

// UBICACIONES PRUEBA

// Lista de ubicaciones
let lugares = []; 

/* ============================================================================================================================ */

// Guardar ubicaciones en el localStorage
function guardarUbicacionesEnLocalStorage() { 
  localStorage.setItem("ubicaciones", JSON.stringify(lugares));
} 

/* ============================================================================================================================ */

// Cargar las sitios desde localStorage
function cargarUbicacionesDesdeLocalStorage() {
  let ubicacionesGuardadas = localStorage.getItem("ubicaciones");

  if (ubicacionesGuardadas) {
    lugares = JSON.parse(ubicacionesGuardadas);

    lugares.forEach(function (loc) {
      let nuevoMarcador = L.marker([loc.lat, loc.lng]).addTo(mapa);

      let textoDescripcion = `
        <div style="text-align: center;">
          <b>Ubicación Guardada</b><br>
          Latitud: ${loc.lat.toFixed(5)}<br>
          Longitud: ${loc.lng.toFixed(5)}
        </div><ul>`;

      loc.descriptions.forEach(function (desc) {
        textoDescripcion += `<li>${desc}</li>`;
      });

      textoDescripcion += `</ul>`;

      textoDescripcion += `<br><button onclick="eliminarUbicacion(${loc.lat}, ${loc.lng}, this)">Eliminar Ubicación</button>`;

      nuevoMarcador.bindPopup(textoDescripcion).openPopup();
    });
  }
}

/* ============================================================================================================================ */

// Función para agregar marcador en la ubicación seleccionada
function agregarMarcador(lat, lng) {
  let descripcion = "";
  let descripciones = [];

  while (true) {
    descripcion = prompt("Agrega una descripción para esta ubicación (escribe '0' para terminar):");

    if (descripcion === "0") {
      break;
    } else if (descripcion === null) {
      break;
    } else if (descripcion.trim() !== "") {
      descripciones.push(descripcion);
    } else {
      alert("La descripción no puede estar vacía.");
    }
  }

  if (descripciones.length > 0) {
    let nuevoMarcador = L.marker([lat, lng]).addTo(mapa);

    let textoDescripcion = `<b>Ubicación Guardada</b><br>
      <div style="text-align: center;">
        Latitud: ${lat.toFixed(5)}<br>
        Longitud: ${lng.toFixed(5)}
      </div><br><ul>`;

    descripciones.forEach(function (desc) {
      textoDescripcion += `<li>${desc}</li>`;
    });

    textoDescripcion += `</ul>`;

    textoDescripcion += `<br><button onclick="eliminarUbicacion(${lat}, ${lng}, this)">Eliminar Ubicación</button>`;

    nuevoMarcador.bindPopup(textoDescripcion).openPopup();

    lugares.push({ lat: lat, lng: lng, descriptions: descripciones });

    guardarUbicacionesEnLocalStorage();
  } else {
    alert("No se agregó ninguna descripción.");
  }
}

/* ============================================================================================================================ */

// Función para eliminar la ubicación
function eliminarUbicacion(lat, lng, boton) {
  if (confirm("¿Seguro que deseas eliminar esta ubicación?")) {
    lugares = lugares.filter(function (loc) {
      return !(loc.lat === lat && loc.lng === lng);
    });

    guardarUbicacionesEnLocalStorage();

    mapa.eachLayer(function (capa) {
      if (capa instanceof L.Marker) {
        if (capa.getLatLng().lat === lat && capa.getLatLng().lng === lng) {
          mapa.removeLayer(capa);
        }
      }
    });

    let popup = boton.closest('.leaflet-popup');
    if (popup) {
      popup.remove();
    }
  }
}

/* ============================================================================================================================ */

// Función para manejar clics en el mapa para agregar ubicaciones
mapa.on("click", function (e) {
  let lat = e.latlng.lat;
  let lng = e.latlng.lng;

  agregarMarcador(lat, lng);
});

// Cargar las ubicaciones almacenadas cuando se carga la página
cargarUbicacionesDesdeLocalStorage();


/*
let cantidad_ubicaciones = lugares.length;
console.log(cantidad_ubicaciones);

if (cantidad_ubicaciones === 1) {
  alert(`Hay ${cantidad_ubicaciones} solicitud pendiente en la ciudad de Bogotá`);
} else {
  alert(`Hay ${cantidad_ubicaciones} solicitudes pendientes en la ciudad de Bogotá`);
}
  */
 /*
let cantidad_ubicaciones = lugares.length;

// Verificamos si estamos en la página del recolector
if (window.location.pathname.includes("recolector_principal.html")) { // "window.location.pathname" Para trabajar en la ruta del archivo indicado
  if (cantidad_ubicaciones === 1) {
    alert(`Hay ${cantidad_ubicaciones} solicitud pendiente en la ciudad de Bogotá`);
  } else if (cantidad_ubicaciones > 1) {
    alert(`Hay ${cantidad_ubicaciones} solicitudes pendientes en la ciudad de Bogotá`);
  }
}
*/
function obtenerCantidadUbicaciones() {
  return lugares.length;
}


/* ==================================== UBICACIONES CENTROS DE ACOPIO ==================================== */ 

let ads_pharma = L.marker([4.696003917845852, -74.07444980699995]).addTo(mapa); 

ads_pharma.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Laboratorio ADS PHARMA S.A.S.</b><br>
        Material: Textiles<br>
        Dirección: Calle 102 A No. 70-79
    </div>
`); 

let discolpartes = L.marker([4.749258266844163, -74.02832257499995]).addTo(mapa); 

discolpartes.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de Acopio DISCOLPARTES S.A.S.</b><br>
        Material: Cuero<br>
        Dirección: Avenida Carrera 68 No. 68B - 91
    </div>
`); 

let pilas_y_baterias = L.marker([4.666659999846803, -74.07222999999993]).addTo(mapa); 

pilas_y_baterias.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de Acopio PILAS Y BATERIAS S.A.</b><br>
        Material: Textiles<br>
        Dirección: Calle 72 No. 29A-33
    </div>
`); 

let drogueria_pharma_world = L.marker([4.719133834845102, -74.09055954199994]).addTo(mapa); 

drogueria_pharma_world.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Droguería Universitaria Pharma World</b><br>
        Material: Textiles<br>
        Dirección: Carrera 91 No. 136-06
    </div>
`); 

let ford_motor = L.marker([4.713286018845327, -74.05120603499995]).addTo(mapa); 

ford_motor.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de Acopio FORD MOTOR COLOMBIA S A S</b><br>
        Material: Plástico<br>
        Dirección: Calle 128 B No 32 - 51
    </div>
`); 

let unicentro_occidente = L.marker([4.723313583844968, -74.11446735899995]).addTo(mapa); 

unicentro_occidente.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Centro Comercial Unicentro De Occidente</b><br>
        Material: Cuero<br>
        Dirección: Carrera 111C No. 86-05
    </div>
`); 

let gmovil_patio_verbenal = L.marker([4.714323279845264, -74.13925541299994]).addTo(mapa); 

gmovil_patio_verbenal.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Gmovil Patio Verbenal</b><br>
        Material: Juguetes<br>
        Dirección: Carrera 121 No.65A-90
    </div>
`); 

let exito_americas = L.marker([4.628123307848085, -74.10588676899994]).addTo(mapa); 

exito_americas.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Éxito De Las Américas</b><br>
        Material: Cuero<br>
        Dirección: Avenida Américas No. 68 A-94
    </div>
`); 

let audifarma_san_lucas = L.marker([4.623487714848242, -74.14880399299994]).addTo(mapa); 

audifarma_san_lucas.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Audifarma San Lucas</b><br>
        Material: Juguetes<br>
        Dirección: Calle 35 Sur No. 78-58
    </div>
`); 

let milenio_plaza = L.marker([4.623487714848242, -74.14880399299994]).addTo(mapa); 

milenio_plaza.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Centro Comercial Milenio Plaza</b><br>
        Material: Cuero<br>
        Dirección: Avenida Ciudad de Cali No. 42B-51 sur
    </div>
`);

let drogueria_unisanar = L.marker([4.606493364848799, -74.18513451399997]).addTo(mapa); 

drogueria_unisanar.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Droguería Unisanar</b><br>
        Material: Juguetes<br>
        Dirección: Calle 65 Sur No. 80-05
    </div>
`);

let cc_centro_mayor = L.marker([4.59174913584924, -74.12403303899998]).addTo(mapa); 

cc_centro_mayor.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Centro Comercial Centro Mayor</b><br>
        Material: Cuero<br>
        Dirección: Calle 38 a sur No. 34d-51 
    </div>
`);

let la_rebaja = L.marker([4.498389999852279, -74.10037999999997]).addTo(mapa); 

la_rebaja.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Droguería La Rebaja No. 3 Santa Librada</b><br>
        Material: Cuero<br>
        Dirección: Avenida Usme Carrera 1 No. 76 A-22 Sur
    </div>
`);

let dispensario_medipol = L.marker([4.5045699998521105, -74.24967999999996]).addTo(mapa); 

dispensario_medipol.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Dispensario Medipol Sibaté</b><br>
        Material: Juguetes<br>
        Dirección: Kilómetro 20 Vía Sibate Escuela Gonzalo Jimenez de Quesada
    </div>
`);

let green_movil = L.marker([4.7004599978457176,  -74.16205247899995]).addTo(mapa); 

green_movil.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Green Móvil</b><br>
        Material: Textiles<br>
        Dirección:Transversal 133 No 22B-99
    </div>
`);




