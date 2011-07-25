/*******************************************************************************
 * ****** UTN FRBA - TACS 1ºC 2011 ******** ML4FB - GRUPO Nº1 ********
 ******************************************************************************/

/******************************************************
 Inicializo el .html y le digo que cargue las primeras categorias
 *****************************************************/
 
$(document).ready(function() {
	/*Testing*/
	//fb.user = {id:"123"};
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
			function (){
				 FB.ui(
						   {
						     method: 'feed',
						     name: 'Facebook Dialogs',
						     link: 'http://developers.facebook.com/docs/reference/dialogs/',
						     picture: 'http://fbrell.com/f8.jpg',
						     caption: 'Reference Documentation',
						     description: 'Dialogs provide a simple, consistent interface for applications to interface with users.',
						     message: 'Facebook Dialogs are easy!'
						   },
						   function(response) {
						     if (response && response.post_id) {
						       alert('Post was published.');
						     } else {
						       alert('Post was not published.');
						     }
						   }
						 );
			}
			)
});