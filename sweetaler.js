if (window.location.pathname.includes("recolector_principal.html")) {    
    // obtenemos la cantidad de ubicaciones
    let cantidadUbicaciones = obtenerCantidadUbicaciones();  
    console.log(cantidadUbicaciones);
    
    if (cantidadUbicaciones === 1) {
        Swal.fire({
            title: "ALERTA",
            text: `Hay ${cantidadUbicaciones} solicitud pendiente en la ciudad de Bogotá`,
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: "Alerta",
            text: `Hay ${cantidadUbicaciones} solicitudes pendientes en la ciudad de Bogotá`,
            confirmButtonText: 'Aceptar'
        });
    }
}

if (window.location.pathname.includes("recolector_medellin.html")) {    
    // obtenemos la cantidad de ubicaciones
    let cantidadUbicaciones = obtenerCantidadUbicacionesMedellin();  
    console.log(cantidadUbicaciones);
    
    if (cantidadUbicaciones === 1) {
        Swal.fire({
            title: "ALERTA",
            text: `Hay ${cantidadUbicaciones} solicitud pendiente en la ciudad de Medellín`,
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: "Alerta",
            text: `Hay ${cantidadUbicaciones} solicitudes pendientes en la ciudad de Medellín`,
            confirmButtonText: 'Aceptar'
        });
    }
}

if (window.location.pathname.includes("recolector_costa_caribe.html")) {    
    // obtenemos la cantidad de ubicaciones
    let cantidadUbicaciones = obtenerCantidadUbicacionesCosta();  
    console.log(cantidadUbicaciones);
    
    if (cantidadUbicaciones === 1) {
        Swal.fire({
            title: "ALERTA",
            text: `Hay ${cantidadUbicaciones} solicitud pendiente en la región de la Costa Caribe`,
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: "Alerta",
            text: `Hay ${cantidadUbicaciones} solicitudes pendientes en la región de la Costa Caribe`,
            confirmButtonText: 'Aceptar'
        });
    }
}
