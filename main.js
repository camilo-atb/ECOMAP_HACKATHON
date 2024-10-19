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
