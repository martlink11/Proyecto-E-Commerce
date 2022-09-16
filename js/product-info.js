const url_info = PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE;
const url_comments = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE;
let boton = document.getElementById("agregarComentario");
let comment = document.getElementById("NewComment");
let puntuacion = document.getElementById("puntaje");

document.addEventListener("DOMContentLoaded", async () => {

    const fetchInfo = await getJSONData(url_info)
    if (fetchInfo.status === "ok") {
        infoProductos = fetchInfo.data;
        mostrarInfo();
    }

    const linkearComentarios = await getJSONData(url_comments)
    if (linkearComentarios.status === "ok") {
        comentarios = linkearComentarios.data;
        mostarComentarios();
    }

});






function mostrarInfo() {
    let contenidoHTML = "";
    contenidoHTML += ` 
    <div class="text-center p-4"> 
        <h1>` + infoProductos.name + ` </h1>
    </div>
    <hr>
    <div> 
        <h4> Precio </h4>
        <p>`+ infoProductos.cost + ` ` + infoProductos.currency + ` </p>  
    </div> 
    <div> 
        <h4> Descripcion </h4>
        <p> `+ infoProductos.description + ` </p>
    </div>
    <div> 
        <h4> Categoria </h4>
        <p> `+ infoProductos.category + ` </p>
    </div>
    <div> 
        <h4> Cantidad Vendida </h4>
        <p> `+ infoProductos.soldCount + ` </p>
    </div>
    
    `

    document.getElementById("informacion").innerHTML = contenidoHTML;

    let imagesDelProducto = "";
    for (let i = 0; i < infoProductos.images.length; i++) {
        let imagenes = infoProductos.images[i];
        imagesDelProducto += `
        <li>
            <a data-target="#pic" data-toggle="tab">
                <img src="` + imagenes + `" style="width: 20.25rem; display: flex;" alt="product image" class="img-thumbnail">
            </a>
        </li>
        `

    }
    document.getElementById("imagenes").innerHTML += imagesDelProducto;
}


function mostarComentarios() {
    let contenido = "";
    for (let c = 0; c < comentarios.length; c++) {
        let comments = comentarios[c];
        contenido += `
<div class="list-group-item list-group-item-action">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <p> <strong>  `+ comments.user + ` </strong> - ` + comments.dateTime + ` - 
            `
        if (comments.score === 1) {
            contenido += `<span class="fa fa-star checked"></span> `
        } else if (comments.score === 2) {
            contenido += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span> 
                `
        } else if (comments.score === 3) {
            contenido += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span> 
                <span class="fa fa-star checked"></span>
                `
        } else if (comments.score === 4) {
            contenido += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span> 
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                `
        } else {
            contenido += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span> 
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                `
        }


        contenido += `
                <p> ` + comments.description + ` </p>
            </div>
        </div>
    </div>
</div>
        
        `
    }
    document.getElementById("comentarios").innerHTML += contenido;

}


function agregarComentario() {
    let lista = document.getElementById("comentarios")
    guardado = JSON.parse(localStorage.getItem('comments'));

    if (guardado != null) {
        for (i in guardado) {
            agregarComentario(guardado[i]);
        }
    } else {
        guardado = [];
    }


    let nuevoComentario = `
    <div class="list-group-item list-group-item-action">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <p><strong>`+ localStorage.getItem("login") + `</strong> - `

    if (puntuacion.value === 1) {
        nuevoComentario += `<span class="fa fa-star checked"></span> `
    } else if (puntuacion.value === 2) {
        nuevoComentario += `
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span> 
                            `
    } else if (puntuacion.value === 3) {
        nuevoComentario += `
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span> 
                            <span class="fa fa-star checked"></span>
                            `
    } else if (puntuacion.value === 4) {
        nuevoComentario += `
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span> 
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            `
    } else {
        nuevoComentario += `
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span> 
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            `
    }

    nuevoComentario += ` 
                    
                    
                    <p> `+ comment.value + `</p>
                    
                    </div>
                </div>
            </div>
    </div>
    `
    lista.innerHTML += nuevoComentario;

}



boton.addEventListener("click", () => {
    if (comment.value != "" && puntuacion.value != 0) {
        agregarComentario();
        guardado.push(comment.value);
        guardado.push(puntuacion.value);
        localStorage.setItem('comments', JSON.stringify(guardado));
        comment.value = "";
    } else {
        comment.setAttribute("placeholder", "Agrega un comentario");
        comment.className = "error";
    }
});








