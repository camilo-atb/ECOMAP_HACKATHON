/* =============================================================================================== */

/* ======================================== MAPA COSTA CARIBE ======================================== */ 

let mapa_caribe = L.map("mapa-caribe").setView([10.732423947675231, -74.57935895279992], 9);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
  foo: "bar",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa_caribe);

/* ====================== ZOOM COMUNAS ==================== */ 

document.getElementById("seleccionar-ciudad").addEventListener("change", function(e) {
  let coordenadas = e.target.value.split(",");
  if (coordenadas.length === 2) { // El if es para asegurar que el valor extraído del elemento <select> se ha dividido correctamente en dos partes: latitud y longitud.
      // Convertimos las coordenadas a números flotantes
      let lat = parseFloat(coordenadas[0]); // flyTo requiere coordenadas numéricas y no cadenas de texto.
      let lng = parseFloat(coordenadas[1]); // flyTo requiere coordenadas numéricas y no cadenas de texto.

      // Usa flyTo con las coordenadas y el nivel de zoom
      mapa_caribe.flyTo([lat, lng], 11);
  }
});

/* ============================================================================================================================ */


// UBICACIONES PRUEBA

// Inicializamos el array de ubicaciones
let ubicaciones = []; // Para almacenar las ubicaciones del mapa

/* ============================================================================================================================ */

function guardarUbicacionesEnLocalStorage() {
  localStorage.setItem("ubicaciones_caribe", JSON.stringify(ubicaciones));
}

/* ============================================================================================================================ */

function cargarUbicacionesDesdeLocalStorage() {
  let ubicacionesGuardadas = localStorage.getItem("ubicaciones_caribe");

  // cargamos las ubicaciones del localstorage
  if (ubicacionesGuardadas) {
    ubicaciones = JSON.parse(ubicacionesGuardadas);

    // volvemos a dibujar marcadores
    ubicaciones.forEach(function (loc) {
      let nuevoMarcador = L.marker([loc.lat, loc.lng]).addTo(mapa_caribe);

      // texto de cuadro del marcador
      let textoDescripcion = `
         <div style="text-align: center;"> <!--estilo CSS text-align: center-->
          <b>Ubicación Guardada</b><br> <!-- Texto en negrita -->
          Latitud: ${loc.lat.toFixed(5)}<br> <!-- Accedemos a la propiedad lat del objeto loc; con .toFixed(5) ajustamos decimales -->
          Longitud: ${loc.lng.toFixed(5)}
        </div><ul> <!-- cerramos la división y "inicializamos la lista" -->`;

      // Agregar las descripciones 
      loc.descriptions.forEach(function (desc) {
        textoDescripcion += `<li>${desc}</li>`;
      });

      textoDescripcion += `</ul>`;

      // Agregamos el botón de eliminar
      textoDescripcion += `<br><button onclick="eliminarUbicacion(${loc.lat}, ${loc.lng}, this)">Eliminar Ubicación</button>`;

      // Asignamos el cuadro de texto de la ubicación y las descripciones
      nuevoMarcador.bindPopup(textoDescripcion).openPopup();
    });
  }
}

/* ============================================================================================================================ */

// Función para agregar marcador en la selección 
function agregarMarcador(lat, lng) {
  let descripcion = ""; 
  let descripciones = []; 

  // Solicitar descripción 
  while (true) {
    descripcion = prompt("Agrega una descripción para esta ubicación (escribe '0' para terminar):");

    // Si el usuario presiona "0", terminamos el bucle
    if (descripcion === "0") {
      break;
    }

    // Si el usuario presiona Cancelar (null), terminamos el bucle sin agregar nada
    else if (descripcion === null) {
      break;
    }

    // Si el campo no está vacío, lo agregamos al array de descripciones
    else if (descripcion.trim() !== "") {
      descripciones.push(descripcion);
    }

    // Si el campo está vacío, mostramos un mensaje
    else {
      alert("La descripción no puede estar vacía.");
    }
  }

  // creamos el marcador de las ubicaciones guardadas
  if (descripciones.length > 0) {
    let nuevoMarcador = L.marker([lat, lng]).addTo(mapa_caribe);

    let textoDescripcion = `<b>Ubicación Guardada</b><br>
      <div style="text-align: center;">
        Latitud: ${lat.toFixed(5)}<br>
        Longitud: ${lng.toFixed(5)}
      </div><br><ul>`;

    descripciones.forEach(function (desc) {
      textoDescripcion += `<li>${desc}</li>`;
    });

    textoDescripcion += `</ul>`;

    // Agregamos el botón de eliminar
    textoDescripcion += `<br><button onclick="eliminarUbicacion(${lat}, ${lng}, this)">Eliminar Ubicación</button>`;

    // Asignamos el cuadro de texto de la ubicación y la información proporcionada
    nuevoMarcador.bindPopup(textoDescripcion).openPopup();

    // Guardamos la ubicación y la lista de descripciones en el array de ubicaciones
    ubicaciones.push({ lat: lat, lng: lng, descriptions: descripciones });

    // Guardamos las ubicaciones en localStorage
    guardarUbicacionesEnLocalStorage();
  } else {
    alert("No se agregó ninguna descripción.");
  }
}

/* ============================================================================================================================ */

// Función para eliminar la ubicación
function eliminarUbicacion(lat, lng, boton) {
  // Confirmar eliminación
  if (confirm("¿Seguro que deseas eliminar esta ubicación?")) {
    // Filtramos las ubicaciones para eliminar de manera precisa las que quiere el usuario
    ubicaciones = ubicaciones.filter(function (loc) {
      return !(loc.lat === lat && loc.lng === lng);
    });

    // Actualizamos localStorage con la nueva lista de ubicaciones
    guardarUbicacionesEnLocalStorage();

    // Quitamos el marcador
    mapa_caribe.eachLayer(function (capa) {
      if (capa instanceof L.Marker) {
        if (capa.getLatLng().lat === lat && capa.getLatLng().lng === lng) {
          mapa_caribe.removeLayer(capa);
        }
      }
    });

    // Cerramos el cuadro de texto del marcador
    let popup = boton.closest('.leaflet-popup');
    if (popup) {
      popup.remove();
    }
  }
}

/* ============================================================================================================================ */

// Función para manejar clics
mapa_caribe.on("click", function (e) {
  let lat = e.latlng.lat;
  let lng = e.latlng.lng;

  // Llamamos a la función para agregar un marcador
  agregarMarcador(lat, lng);
});

// Cargamos las ubicaciones almacenadas cuando se carga la página
cargarUbicacionesDesdeLocalStorage();


function obtenerCantidadUbicacionesCosta() {
  return ubicaciones.length;
}


/* ==================================== UBICACIONES CENTROS DE ACOPIO ==================================== */ 

let cc_nao_fund_and_shopping = L.marker([10.413046416664164, -75.55127890999995]).addTo(mapa_caribe); 

cc_nao_fund_and_shopping.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Centro Comercial Nao Fun And Shopping</b><br>
        Material: Juguetes<br>
        Dirección: Bocagrande Carrera 1 Carrera 2 Esquina
    </div>
`); 

let baterias_ranger = L.marker([10.918720746648663, -74.77377679899996]).addTo(mapa_caribe); 

baterias_ranger.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de acopio BATERIAS RANGER</b><br>
        Material: Cuero<br>
        Dirección: Calle 30 No 19 – 04
    </div>
`); 

let autonorte = L.marker([11.236354493638963, -74.17898677399995]).addTo(mapa_caribe); 

autonorte.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de acopio Autonorte</b><br>
        Material: Textiles<br>
        Dirección: Av. El Libertador 20 - 80
    </div>
`); 

