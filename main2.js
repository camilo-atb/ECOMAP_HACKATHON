/* =============================================================================================== */

/* ======================================== MAPA MEDELLÍN ======================================== */ 

let mapa_medellin = L.map("mapa-medellin").setView([6.253705, -75.577809], 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
  foo: "bar",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa_medellin);

// UBICACIONES PRUEBA

// Inicializamos el array de ubicaciones
let ubicaciones = []; 

/* ====================== ZOOM COMUNAS ==================== */ 

document.getElementById("seleccionar-comuna").addEventListener("change", function(e) {
  let coordenadas = e.target.value.split(",");
  if (coordenadas.length === 2) { // El if es para asegurar que el valor extraído del elemento <select> se ha dividido correctamente en dos partes: latitud y longitud.
      // Convertimos las coordenadas a números flotantes
      let lat = parseFloat(coordenadas[0]); // flyTo requiere coordenadas numéricas y no cadenas de texto.
      let lng = parseFloat(coordenadas[1]); // flyTo requiere coordenadas numéricas y no cadenas de texto.

      // Usa flyTo con las coordenadas y el nivel de zoom
      mapa_medellin.flyTo([lat, lng], 16);
  }
});

/* ============================================================================================================================ */

function guardarUbicacionesEnLocalStorage() {
  localStorage.setItem("ubicaciones_medellin", JSON.stringify(ubicaciones));
}

/* ============================================================================================================================ */

function cargarUbicacionesDesdeLocalStorage() {
  let ubicacionesGuardadas = localStorage.getItem("ubicaciones_medellin");

  if (ubicacionesGuardadas) {
    ubicaciones = JSON.parse(ubicacionesGuardadas);

    ubicaciones.forEach(function (loc) {
      let nuevoMarcador = L.marker([loc.lat, loc.lng]).addTo(mapa_medellin);

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
    let nuevoMarcador = L.marker([lat, lng]).addTo(mapa_medellin);

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

    ubicaciones.push({ lat: lat, lng: lng, descriptions: descripciones });

    guardarUbicacionesEnLocalStorage();
  } else {
    alert("No se agregó ninguna descripción.");
  }
}

/* ============================================================================================================================ */

function eliminarUbicacion(lat, lng, boton) {
  if (confirm("¿Seguro que deseas eliminar esta ubicación?")) {
    ubicaciones = ubicaciones.filter(function (loc) {
      return !(loc.lat === lat && loc.lng === lng);
    });

    guardarUbicacionesEnLocalStorage();

    mapa_medellin.eachLayer(function (capa) {
      if (capa instanceof L.Marker) {
        if (capa.getLatLng().lat === lat && capa.getLatLng().lng === lng) {
          mapa_medellin.removeLayer(capa);
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

mapa_medellin.on("click", function (e) {
  let lat = e.latlng.lat;
  let lng = e.latlng.lng;

  agregarMarcador(lat, lng);
});

cargarUbicacionesDesdeLocalStorage();
