const getPelicula = async() => {
    const id  = new URLSearchParams(window.location.search).get('id');
    const response = await fetch(`https://oaemdl.es/cinestar_sweb_php/peliculas/${id}`);

        if (response.status === 200) {
            const data = await response.json();

            let html = `
                <br/><h1>Cartelera</h1><br/>
                <div class="contenido-pelicula">
                    <div class="datos-pelicula">
                        <h2>${data.Titulo}</h2>
                        <p>${data.Sinopsis}</p>
                        <br/>
                        <div class="tabla">
                            <div class="fila">
                                <div class="celda-titulo">Título Original :</div>
                                <div class="celda">${data.Titulo}</div>
                            </div>
                            <div class="fila">
                                <div class="celda-titulo">Estreno :</div>
                                <div class="celda">${data.FechaEstrenoss}</div>
                            </div>
                            <div class="fila">
                                <div class="celda-titulo">Género :</div>
                                <div class="celda">${data.Geneross}</div>
                            </div>
                            <div class="fila">
                                <div class="celda-titulo">Director :</div>
                                <div class="celda">${data.Director}</div>
                            </div>
                            <div class="fila">
                                <div class="celda-titulo">Reparto :</div>
                                <div class="celda">${data.Reparto}</div>
                            </div>
                        </div>
                    </div>
                    <img src="img/pelicula/${data.id}.jpg" width="160" height="226"><br/><br/>
                </div>
                <div class="pelicula-video">
                    <embed src="https://www.youtube.com/v/${data.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
                </div>
            `;

            document.getElementById("contenido-interno").innerHTML = html;
        }
}

getPelicula();