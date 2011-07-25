<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="java.util.List"%>
<%@ page import="javax.jdo.PersistenceManager"%>
<%@ page import="elangsolutions.ml4fb.servicioML.WishBean"%>
<%@ page import="elangsolutions.ml4fb.servicioML.PMF"%>
<%@ page import="javax.jdo.Query"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html bgcolor=#555555>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="./css/index.css" />
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="./js/ml.js"></script>
<script src="./js/init.js"></script>
<script src="./js/facebook.js"></script>
<title>Labored Crime - TACS 1C 2011</title>
</head>
<body>
	<div id="signInDiv"> 
		<input class="btn"  id="botLogin" OnClick="login()" value="Conectar"/>
		<div id="logoCargando"><img src="img/ajax-loader.gif" /></div>
		<div id="postWall">Compartir</div>
	</div>
	<div id="divisionIzquierda">
		<ul id="main_categories"></ul>
	</div>
	<div id="divisionDerecha">
		<form id="formBuscar">
			<input id="txtBuscar" class="input" /> 
			<input class="btn"  id="btBuscar" type="submit" value="Buscar"> 
			<input class="btn" id="btPublicar" type="button" OnClick="publicarEnMuroFB();" value="Compartir">
		</form>
		<div id="resultadoBusqueda">
			<ul id="listaBusqueda">
			</ul>
		</div>
	</div>
	<div id="divisionWishList">
	<h3>WishList</h3>
		<ul id="wishList"></ul>
	</div>
 <div id="fb-root"></div>
 <script src="http://connect.facebook.net/en_US/all.js"></script>
 <script>
   FB.init({
     appId  : '162662973800555',
     status : true, // check login status
     cookie : true, // enable cookies to allow the server to access the session
     xfbml  : true  // parse XFBML
   });
 </script>	
</body>
</html>