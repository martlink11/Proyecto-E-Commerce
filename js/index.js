document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        localStorage.setItem("catName", "autos");
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        localStorage.setItem("catName", "juguetes");
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        localStorage.setItem("catName", "muebles");
        window.location = "products.html"
    });

    if (localStorage.getItem("login") === null) {
        Swal.fire({
            icon:'warning',
            title:'Debe Loguearse',
            timer:1500})
            setTimeout(" window.location.href = 'login.html'",2000);
    } else {
        document.getElementById("perfil").innerHTML = localStorage.getItem("login");
}
    document.getElementById("cerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("login");
    })

});
