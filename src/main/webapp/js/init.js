/*******************************************************************************
 * ****** UTN FRBA - TACS 1ºC 2011 ******** ML4FB - GRUPO Nº1 ********
 ******************************************************************************/

/******************************************************
 Inicializo el .html y le digo que cargue las primeras categorias
 *****************************************************/
 
$(document).ready(function() {
	/*Testing*/
	//fb.user = {id:"123"};
	//fb.logged = true;
	/*Testing*/
	
	fb.ready(function(){ 
		  if (fb.logged)
		  {
		    /***
		     * Esconder el botón conectar
		     */
			$("#botLogin").hide();
			
		    html = "<p>Hola " + fb.user.name + "</p>";
		    html += '<p><img src="' + fb.user.picture + '"/></p>';
		    html += '<p><a href="#" onclick="fb.logout(); return false;">Salir</a></p>';
		    $("#signInDiv").append(html);	
		    cargarWishList(fb.user.id);
		  }
		  		  
		});

		
	cargarCategoriasPrincipal($("#main_categories"));
	
	
	$("#formBuscar").submit( function(){
			buscarArticuloXString("q=" + $("#txtBuscar").val(), $("#listaBusqueda"));
			return false;
	});
	$("#postWall").click(
			function(){
				clickPostearEnWall(fb.user.id);
			}
			);
});