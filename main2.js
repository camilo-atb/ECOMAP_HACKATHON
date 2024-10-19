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


function obtenerCantidadUbicacionesMedellin() {
  return ubicaciones.length;
}

/* ==================================== UBICACIONES CENTROS DE ACOPIO ==================================== */ 

let drogueria_colsubsidio = L.marker([6.273501983794822, -75.57522454099995]).addTo(mapa_medellin); 

drogueria_colsubsidio.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Droguería Colsubsidio SF Multicentro Caribe</b><br>
        Material: Juguetes<br>
        Dirección: Transversal 78 No. 65-165 Local. 165
    </div>
`); 

let olímpica_mazuren = L.marker([6.238301343795926, -75.57368076199998]).addTo(mapa_medellin); 

olímpica_mazuren.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de acopio ENERGÍA & POTENCIA S.A.S.</b><br>
        Material: Textiles<br>
        Dirección: Carrera52 No.36-80
    </div>
`); 

let euro_life = L.marker([6.230801006796159, -75.56958142499997]).addTo(mapa_medellin); 

euro_life.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de acopio EURO LIFE S.A.S</b><br>
        Material: Plástico<br>
        Dirección: Carrera43A No.30-84
    </div>
`); 

let fabrica_italo = L.marker([6.218397857796587, -75.58056959099997]).addTo(mapa_medellin); 

fabrica_italo.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de acopio FABRICA ITALO COLOMBIANA DE BATERIAS FAICO S.A.S</b><br>
        Material: Juguetes<br>
        Dirección: Carrera52 No.14-14
    </div>
`); 

let energia_y_potencia = L.marker([6.209047998796894, -75.58544501499995]).addTo(mapa_medellin); 

energia_y_potencia.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de acopio ENERGÍA Y POTENCIA S.A.</b><br>
        Material: Cuero<br>
        Dirección: Carrera52 No.1-185
    </div>
`); 

let Vehicaminos = L.marker([6.217672180796624, -75.57308757499999]).addTo(mapa_medellin); 

Vehicaminos.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de acopio Vehicaminos Autoland</b><br>
        Material: Juguetes<br>
        Dirección: Calle 17 No 43 F - 89. El Poblado
    </div>
`); 

let clinica_clofan = L.marker([6.207061250796924, -75.57675908499994]).addTo(mapa_medellin); 

clinica_clofan.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Clínica Clofan</b><br>
        Material: Plástico<br>
        Dirección: Carrera 48 No. 29A-40
    </div>
`); 

let Laboratorios_farmanal = L.marker([6.18136781079775, -75.59428767099996]).addTo(mapa_medellin); 

Laboratorios_farmanal.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de Acopio LABORATORIOS FARMANAL LTDA</b><br>
        Material: Plástico<br>
        Dirección: Calle 73A No.45-71
    </div>
`); 

let cristian_perdomo = L.marker([6.18136781079775, -75.59428767099996]).addTo(mapa_medellin); 

cristian_perdomo.bindPopup(`
    <div style="text-align: center;">
        <b>Centro de Almacenamiento CHRISTIAN FELIPE PERDOMO MAYOR</b><br>
        Material: Plástico<br>
        Dirección: Calle 79B Sur No.54-65
    </div>
`); 

let parque_de_las_aguas = L.marker([6.443356141789322, -75.32943501699998]).addTo(mapa_medellin); 

parque_de_las_aguas.bindPopup(`
    <div style="text-align: center;">
        <b>Punto de Recolección Parque Metropolitano de las Aguas</b><br>
        Material: Juguetes<br>
        Dirección: Kilómetro 23 Autopista Norte Barbosa – Antioquia
    </div>
`); 

