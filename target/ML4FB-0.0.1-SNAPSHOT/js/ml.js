/*******************************************************************************
 * ****** UTN FRBA - TACS 1C 2011 ******** ML4FB - GRUPO N1 ********
 ******************************************************************************/

/*******************************************************************************
 * Funcionalidad de cargar el arbol de categorias dinamicamente
 ******************************************************************************/

function cargarCategoria(category_id, liCategoria, $) {
	// Si no me pasan jQuery por parametro lo configuro por default
	if ($ === undefined) {
		$ = jQuery;
	}
	var liDestino = liCategoria;
	var URL = "https://api.mercadolibre.com/categories/" + category_id;
	$.ajax({
		type : "GET",
		url : URL,
		timeout : 10000,
		dataType : "jsonp",
		success : function(data, status) {
			var nuevo_ul = $("<ul></ul>");
			nuevo_ul.hide();
			appendarSubCategorias(data[2].children_categories, nuevo_ul);
			/*
			 * $.each(data[2].children_categories, function(i, categoria) {
			 * lista_item = creadorItem(categoria); nuevo_ul.append(lista_item);
			 * });
			 */

			liDestino.attr("cargado", "yes");
			liDestino.append(nuevo_ul);
			nuevo_ul.slideDown();
		},
		beforeSend : logoCargandoShowHide,
		complete : logoCargandoShowHide
	});
}; // fin cargarCategoria()

// Esta funcin se volvio necesaria separarla para poder
// testear unitariamente, ya que esto se hacia dentro de otra funcion
// y no habia manera de saber su resultado
function appendarSubCategorias(children_categories, ulDestino) {
	$.each(children_categories, function(i, categoria) {
		lista_item = creadorItem(categoria);
		ulDestino.append(lista_item);
	});
};

function login() {
	  
	fb.login(function(){ 
	
		if (fb.logged) {
	      html = "<p>Hola " + fb.user.name + "</p>";
	      html += "<p><img src='" + fb.user.picture + "'/></p>";
	      $("#signInDiv").append(html);
	      $("#botLogin").hide();
	      cargarWishList(fb.user.id);
	    } else {
	      alert("No se pudo identificar al usuario");
	    }
	  })
	};

function cargarWishList(usuario){
	
	$.ajax({
		  url: "getWishList",
		  timeout : 10000,
		  type : "GET",
		  data: {userId:usuario},
		  success : function(data, status) {
					
					$.each(data, function(i, wish) {
						formatedWish = {
										id : wish.itemId,
										title : wish.title,
										thumbnail : wish.imgURL,
										price : "0,00"
										};
						addWishOnlyToUlTag(formatedWish);
					});
					
			}
			});
}

function clickPostearEnWall(usuario){

	$.ajax({
		  url: "getWishList",
		  timeout : 10000,
		  type : "GET",
		  data: {userId:usuario},
		  success : function(data, status) {
			  
			  var wishList = {}
			  $.each(data, function(i, wish) {
					formatedWish = {
									id : wish.itemId,
									title : wish.title,
									thumbnail : wish.imgURL,
									price : "0,00"
									};
					wishList[i] = formatedWish;
			  });
			  postearEnWall(wishList);
		  }
	});
	
}

function postearEnWall(wishList){
	var imgPrimerWish = wishList[0].thumbnail;
	var linkMercadoLibre = "http://mercadolibre.com.ar";
	var nombre = 'Este es mi WishList para mi cumplea&ntilde;os';
	var titulo = 'Organ&iacute;cense y c&oacute;mprenme algo de esto.';
	
	var descripcion = '';
	$.each(wishList, function(i, wish){
		descripcion = descripcion + ' ' + wish.title + ';'; 
	});
	
	 FB.ui(
		   {
		     method: 'feed',
		     name: nombre,
		     link: linkMercadoLibre,
		     picture: imgPrimerWish,
		     caption: titulo,
		     description: descripcion,
		   }
	);
	
	
}

function cargarCategoriasPrincipal(ulDondeCargar, $) {

	// Si no me pasan jQuery por parametro lo configuro por default
	if ($ === undefined) {
		$ = jQuery;
	}
	var ulDestino = ulDondeCargar;
	var URL = "https://api.mercadolibre.com/sites/MLA";
	$.ajax({
		type : "GET",
		url : URL,
		timeout : 10000,
		dataType : "jsonp",
		success : function(data, status) {
			$.each(data[2].categories, function(i, categoria) {
				lista_item = creadorItem(categoria);
				ulDestino.append(lista_item);
			});
		},
		beforeSend : logoCargandoShowHide,
		complete : logoCargandoShowHide
	});
}; // fin cargarCategoriasPrincipal()

function creadorItem(categoria) {
	var lista_item = $("<li></li>");
	lista_item.attr("id", categoria.id);

	var category_id = categoria.id;

	nombreCategoria = $("<span>" + categoria.name + "</span>");
	nombreCategoria.click(function() {
		if (lista_item.attr("cargado") == "yes") {
			return true;
		}
		cargarCategoria(category_id, lista_item);
	});

	lista_item.append(nombreCategoria);
	
	linkMostrar = $("<span style=\"	font-weight: bold;\">Ver</span>");
	linkMostrar.addClass("linkMostrar");
	linkMostrar.click(function() {
		buscarArticuloXString("category=" + category_id, $("#listaBusqueda"));
	});

	lista_item.append(linkMostrar);

	return lista_item;
}// fin creadorItem()

/*******************************************************************************
 * Animacion de espera
 ******************************************************************************/
function logoCargandoShowHide() {
	$("#logoCargando").fadeToggle();
}

/*******************************************************************************
 * Funcionalidad de Busqueda
 ******************************************************************************/
function buscarArticuloXString(strBusqueda, ulDondeCargar, $) {
	// Si no me pasan jQuery por parametro lo configuro por default
	if ($ === undefined) {
		$ = jQuery;
	}
	var URL = "https://api.mercadolibre.com/sites/MLA/search?" + strBusqueda;
	var ulFinal = ulDondeCargar;
	$.ajax({
		type : "GET",
		url : URL,
		timeout : 10000,
		dataType : "jsonp",
		success : function(data, status) {

			ulFinal.empty();
			ulFinal.hide();

			$.each(data[2].results, function(i, resultado) {
				lista_item = crearElementoResultado(resultado);
				ulFinal.append(lista_item);
			});

			ulFinal.fadeToggle();
		},
		beforeSend : logoCargandoShowHide,
		complete : logoCargandoShowHide

	});
}
/* Publicar la lista en muro de FB */

function publicarEnMuroFB() {

	/**/

}

function crearElementoResultado(resultado) {
	nuevoItem = $("<li></li>");

	imgMiniatura = $("<img />");
	imgMiniatura.attr("src", resultado.thumbnail);

	nuevoItem.append(imgMiniatura);
	nuevoItem.append(resultado.title);
	nuevoItem.append(" - $"+resultado.price);

	agregarDiv = $("<div></div>");
	agregarSpan = $("<span><b>Agregar</b></span>");
	agregarSpan.attr("class", "linkMostrar");
	$(agregarSpan).click(function() {
		addWishWithAJAX(resultado)
	})

	agregarDiv.append(agregarSpan);

	nuevoItem.append(agregarDiv);

	return nuevoItem;
}

function addWishOnlyToUlTag(data) {

	if (!isInWishList(data.id)) {
		newWish = $("<li></li>");

		imageURL = $("<img />");
		imageURL.attr("src", data.thumbnail);
		newWish.append(imageURL);
		newWish.append(data.title);
		newWish.append(" - $"+data.price);
		newWish.attr("id", data.id);

		agregarDiv = $("<div></div>");
		agregarSpan = $("<span><b>Quitar</b></span>");
		agregarSpan.attr("class", "linkMostrar");
		$(agregarSpan).click(function() {
			doQuitarWish($(this))
		})

		agregarDiv.append(agregarSpan);
		newWish.append(agregarDiv);
		$("#wishList").append(newWish);
		return true;
	}
	else
		return false;
}

function addWishWithAJAX(data) {

	if(addWishOnlyToUlTag(data))
		{
		//persisto igualmente deberia ser atomico
		$.ajax({
			url : "saveWish",
			type : "POST",
			data : {
				userId : fb.user.id,
				title : data.title,
				itemId : data.id,
				imgURL : data.thumbnail
			}
		});
	}
}

function doQuitarWish(wish) {
	var itemIdParam = $(wish.parent().parent())[0].id;
	$.ajax({
		url : "removeWish",
		type : "POST",
		data : { 
			itemId : itemIdParam,
			userId : fb.user.id
		}
	});
	wish.parent().parent().remove();

}

function isInWishList(id) {
	var wishes = $("#wishList");
	var r = false;
	//var wish = $("#"+id);
	//return $.contains(wish,wishes);
	$.each(wishes[0].children, function(i, wish) {
		if (wish.id == id) {
			r = true;
		}
	});
	return r;
}
