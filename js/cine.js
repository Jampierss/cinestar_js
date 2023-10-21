const getCine = async() => {

    const id = new URLSearchParams(window.location.search).get('id');

    const response_general = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}`);
    const response_prices = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/tarifas`);
    const response_movies = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/peliculas`);

    if (response_prices.status === 200 && response_movies.status === 200 && response_general.status === 200) {

        const data_prices = await response_prices.json();
        const data_movies = await response_movies.json();
        const data_general = await response_general.json();

        let html_movies = ''
        let count = 1;
        data_movies.forEach(movie =>{
            if (count % 2 === 0) {
                html_movies += `
                    <div class="fila">
                        <div class="celda-titulo">${movie.Titulo}</div>
                        <div class="celda">${movie.Horarios}</div>
                    </div>
                `
            } else {
                html_movies += `
                    <div class="fila impar">
                        <div class="celda-titulo">${movie.Titulo}</div>
                        <div class="celda">${movie.Horarios}</div>
                    </div>
                `
            }

            count += 1;
        });


        let html_prices = ''
        data_prices.forEach(price =>{
            html_prices += `
                <div class="fila">
                    <div class="celda-titulo">${price.DiasSemana}</div>
                    <div class="celda">${price.Precio}</div>
                </div>
            `
        });


        let full_html = `
            <h2>${data_general.RazonSocial}</h2>
            <div class="cine-info">
                <div class="cine-info datos">
                    <p>${data_general.Direccion} - ${data_general.Detalle}</p>
                    <p>Teléfono: ${data_general.Telefonos}</p>
                    <br/>
                    <div class="tabla">
                        ${html_prices}
                    </div>
                    <div class="aviso">
                        <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
                    </div>
                </div>
                <img src="img/cine/${data_general.id}.1.jpg"/>
                <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
                <div class="cine-info peliculas">
                    <div class="tabla">
                        <div class="fila">
                            <div class="celda-cabecera">Películas</div>
                            <div class="celda-cabecera">Horarios</div>
                        </div>
                        ${html_movies}
                    </div>
                </div>
            </div>
            <div>
                <img style="float:left;" src="img/cine/${data_general.id}.2.jpg" alt="Imagen del cine"/>
                <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
                    Horario de atención de juegos es de 12:00 m hasta las 10:30 pm.
                    <br/><br/>
                    Visitános y diviértete con nosotros.
                    <br/><br/>
                    <b>CINESTAR</b>, siempre pensando en tí.
                </span>
            </div>
        `

        document.getElementById("contenido-interno").innerHTML = full_html;

    }

}

getCine();