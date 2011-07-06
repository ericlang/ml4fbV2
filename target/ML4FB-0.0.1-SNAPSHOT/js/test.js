/*******************************************************************************
 * ****** UTN FRBA - TACS 1�C 2011 ******** ML4FB - GRUPO N�1 ********
 ******************************************************************************/
 
 
var ulMock = $("<ul></ul>");
var fbMock = {name : Eric, id: 1111664570};
ulMock.append = function() {
			ok(true, "se 'append' un elemento");	
};



$(document).ready(function(){
    	
	module("Modulo de Busquedas");
	test("Por cada resultado se agrega un elemento al 'ul' pasado como parametro", function() {
		expect(2);
		
		//Creo el jQueryMock y modifico su metodo .ajax para obtener los parametros que recibe
        var options = null;
		jQueryMock = jQuery.sub();
        jQueryMock.ajax = function (param) {
            options = param;
        };
		
        buscarArticuloXString("q=un string ejemplo", ulMock, jQueryMock);
		
        options.success([200,{},
			{
            results : 	[
							{
							title: "primer producto",
							thumbnail: "una url de imagen"
							},
							{
							title: "segundo producto",
							thumbnail: "una url de imagen"
							}
						]
			}
		]);
    });
	

	
	module("Modulo de recorrido categorias");
	test("Por cada 'categoria principal' en un site ML se debe agregar un elemento al 'ul' pasado como parametro",
		function() {
			expect(3);
			
			var options = null;
			jQueryMock = jQuery.sub();
			jQueryMock.ajax = function (param) {
				options = param;
			};
			
			cargarCategoriasPrincipal(ulMock, jQueryMock);
			
			options.success(
				[200, {},
						{
								categories : [
												{id: "ITEM123", name: "Item n�1 de prueba" },
												{id: "ITEM234", name: "Item n�2 de prueba" },
												{id: "ITEM345", name: "Item n�3 de prueba" },
											]
						}
				]
			);
			
		}
	);
	
	test("Por cada 'categoria' se debe agregar un elemento 'ul' (con todas las subcategorias) al 'li' pasado como parametro",
		function() {
			expect(1);
			
			var options = null;
			jQueryMock = jQuery.sub();
			jQueryMock.ajax = function (param) {
				options = param;
			};
			
			liMock = $("<li></li>");
			liMock.append = function(objetoApendado){
								ok(true, "se 'append' un elemento");
							};
			
			cargarCategoria("id categoria de prueba", liMock, jQueryMock);
			
			options.success(
							[200, {},
							{
								children_categories: 
									[
										{id: "id sub-categoria n�1", name: "nombre sub-categoria n�1"},
										{id: "id sub-categoria n�2", name: "nombre sub-categoria n�2"},
										{id: "id sub-categoria n�3", name: "nombre sub-categoria n�3"}
									]
							}
							]
							)
		}
	);
	
	test("Por cada 'subcategoria' en el JSON se debe agregar un 'li' la 'ul' pasado como parametro",
		function() {
			expect(3);
			
			appendarSubCategorias(
									[
										{id: "ID prueba de categoria n�1", name: "nombre categoria n�1"},
										{id: "ID prueba de categoria n�2", name: "nombre categoria n�2"},
										{id: "ID prueba de categoria n�3", name: "nombre categoria n�3"},
									],
									ulMock
									);
		}
	);

	module("Pruebas de integraci�n");
	test("Busqueda de items, integracion con ajax", function() {
		stop(5000);
		
		ulPrueba = $("<ul></ul>");
		
		buscarArticuloXString("q=prueba", ulPrueba);
		
		setTimeout(function(){
				notEqual(ulPrueba.html() , "" , "La lista debe tener contenido");
				start();
			  }, 4500);
	});
	
	test("Cargar categorias principales, integraci�n con ajax", function() {
		stop(5500);
		
		ulPrueba = $("<ul></ul>");
		
		cargarCategoriasPrincipal(ulPrueba);
		
		setTimeout(function(){
								notEqual(ulPrueba.html(), "", "El 'ul' tiene que estar completado con el resultado de la consulta Jsonp");
								start();
							}, 5000	);
	});
	
	test("Cargar las subcategorias, integraci�n con ajax", function(){
		stop(5000);
		
		liPrueba = $("<li></li>");
		
		//El primer parametro debe corresponder con una categoria que SI exista
		//En este caso se corresponde con los procesadores INTEL
		cargarCategoria("MLA7171", liPrueba);
		
		setTimeout(function() {
							notEqual(liPrueba.html(), "", "El 'li' tiene que estar completado con el resultado de la consulta Jsonp");
							start();
						}, 4500);
	
	
	});
		
	test("Consultar lista persistida, integraci�n con FB", function(){
		stop(3000);
		
		setTimeout(function() {
							notEqual(c.logged, "", "El Usuario no esta logueado");
							start();
						}, 3500);
	
	
	});	*/
		

		

});