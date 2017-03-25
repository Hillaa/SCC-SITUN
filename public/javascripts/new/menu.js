
function cargarMenu($scope)
{

	usr = JSON.parse(localStorage.getItem('usuario'));
    console.log(usr);
    var enc = '<nav class="navbar navbar-default" style="background-color:#60161E; ">'+
  '<div class="container-fluid">'+
   ' <!-- Brand and toggle get grouped for better mobile display -->'+
    '<div class="navbar-header">'+
      '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">'+
        '<span class="sr-only">Toggle navigation</span>'+
        '<span class="icon-bar"></span>'+
        '<span class="icon-bar"></span>'+
        '<span class="icon-bar"></span>'+
      '</button>'+
      '<IMG SRC="../images/situn2.png" WIDTH=90 HEIGHT=50  class="nav navbar-nav navbar-right" >'+
    '</div>'+

    '<!-- Collect the nav links, forms, and other content for toggling -->'+
    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style="margin-left:70px">'+
     '<ul class="nav navbar-nav">'+
      '<li ><a href="../HTML/Ingreso de Correspondencia"style="color:#FFFFFF;">Ingreso de Correspondencia </a></li>'+
      '<li><a href="../HTML/Enlace de Documentos"style="color:#FFFFFF;">Enlace Documentos</a></li>'+
        '<li><a href="../HTML/Busqueda"style="color:#FFFFFF;">Búsqueda</a></li>'+
        '<li><a href="../HTML/Reportes"style="color:#FFFFFF;">Reportes</a></li>';


        if(usr.tipo === '1')
          {
            enc+= '<li class="dropdown" >'+
          '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="color:#FFFFFF;">Usuarios <span class="caret"></span></a>'+
          '<ul class="dropdown-menu" style="background-color:#60161E; ">'+
            '<li><a href="../HTML/ingresaUser" style="color:#FFFFFF;">Agregar Usuario</a></li>'+
            '<li><a href="../HTML/BusquedaUsuarios" style="color:#FFFFFF;">Buscar Usuarios</a></li>'+
          '</ul>'+
        '</li>';


            
          }  

        enc+='<li><a href="" data-toggle="modal" data-target="#myAyuda" id="ayuda" style="color:#FFFFFF;">Ayuda</a></li>'+
                   '<li class="dropdown col-md-offset-0.6" >'+
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="color:#FFFFFF;">'+usr.nombre+' '+usr.apellido +'<span class="caret"></span></a>'+
            '<ul class="dropdown-menu" style="background-color:#60161E; ">'+
            '<li><a href="javascript:void(0)" style="color:#FFFFFF;" ng-click="editarPerfil()">Editar Perfil</a></li>'+
            '<li><button style="color:#FFFFFF;" ng-click="editarPerfil()">Editar Perfil</button></li>'+
            '<li><a href="../logout" style="color:#FFFFFF;">Cerrar sesion</a></li>'+
          '</ul>'+
        '</li>'+

      '</ul>'+
    '</div><!-- /.navbar-collapse -->'+
  '</div><!-- /.container-fluid -->'+
'</nav>';

//$('#menu').html(enc);
//var el = document.getElementById('menu');
	//angular.element(el).append( $compile(html)($scope) )
}



function editarPerfil()
{
	usuario = JSON.parse(localStorage.getItem('usuario'));
	console.log("Sol edicion perfil");
	asignarUsuario(usuario);
	$("#myModal").modal('show'); 

}

function asignarUsuario(cor)
 {	desactivar();
   limpiarValores();
   console.log(cor);
	 fetch( 'http://localhost:3000/api/TPTU/B', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TU_1=" + cor.Id
      }
	)	 
	.then(res => res.json())
	.then(obj => cargarDatos(obj.data[0])
			)
	.catch(err => console.log('Request failed', err));
 }


function cargarDatos(data){
  console.log(data);
     $("#IU1").val(data.tp_1);
     $("#IU2").val(data.tp_2);
     $("#IU3").val(data.tp_3);
	 $("#IU0").val(data.tu_1);
	 $("#IU4").val(data.tu_2);
	 if(data.tu_3 == 1)
		$("#administrador_checkbox").prop("checked", "checked");
	 
	 else
		$("#administrador_checkbox").prop("checked", "");

	$("#administrador_checkbox").attr("disabled", true);
 }

  function actualizarInfo($scope){ //Actualiza la informacion en la base de datos
  console.log('validacion '+validar());
    if(validar()){
	console.log('Entro despues de validacion'+validar()); // Quitar
	actualizarPersona();
	actualizarUsuario();
    //busquedaUsuario($scope);
	$('#myModal').modal('hide'); 
	}
  }
  
  function actualizarPersona(){ //actualiza la infromación del usuario en la tabla personas
    let a = $('#IU0').val().toUpperCase();
	let b = $('#IU1').val().toUpperCase();
	let c = $('#IU2').val().toUpperCase(); 
	let d = $('#IU3').val().toUpperCase(); 
 
   fetch( 'http://localhost:3000/api/TP/UD', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TP_1="+ b+ "&TP_2="+c+
	"&TP_3="+ d + "&TP_4="+ a 
      }
	  )
  .then(function(response) {
		return response.text().then(function(res) {
				console.log("Resultado: "+res);
					if(res.indexOf("error")==-1){
						$("#mensaje").text("Acción realizada con exito");
			}
				});
	})
  .catch(function(error) {  
   console.log('Request failed', error);  
  });
  }
  
  
  function actualizarUsuario(){ //actualiza la informaciòn del usuario
    let a = $('#IU0').val();
	let b = $('#IU4').val();
	
	let c = 0;
	if($("#administrador_checkbox").prop("checked"))
		c = 1;
		
		
    fetch( 'http://localhost:3000/api/TU/UD', {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "TU_1="+ a+ "&TU_2="+b+
	"&TU_3="+ c
      }
	  )
  .then(function(response) {
		return response.text().then(function(res) {
				console.log("Resultado: "+res);
					if(res.indexOf("error")==-1){
						$("#mensaje").text("Acción realizada con exito");
			}
				});
	})
  .catch(function(error) {  
   console.log('Request failed', error);  
  });
 
  }
  function validar(){ //Valiad los campos de entrada
	I2 = true;
	I3 = true;
	I4 = true;
	I5 = true;
	I6= true;

	if($("#IU1").val().length == 0){
		$("#div1").attr('class','form-group has-error') ;
		$("#IU1").attr('title','Campo Obligatorio') ;
		I2 = false;
	}
	else{
	  cambioClase1(1);
	$("#IU1").attr('title','');
	}
	if($("#IU2").val().length == 0){
		$("#div2").attr('class','form-group has-error') ;
		$("#IU2").attr('title','Campo Obligatorio') ;
		I3 = false;
	}
	else{
	 cambioClase1(2);
	$("#IU2").attr('title','');
	}
	if($("#IU3").val().length == 0){
		$("#div3").attr('class','form-group has-error') ;
		$("#IU3").attr('title','Campo Obligatorio') ;
		I4 = false;
	}
	else{
	 cambioClase1(3);
	$("#IU3").attr('title','');
	}
	if($("#IU4").val().length == 0){
		$("#div4").attr('class','form-group has-error') ;
		$("#IU4").attr('title','Campo Obligatorio') ;
		I5 = false;
	}
	else{
	 cambioClase1(4);
	$("#IU4").attr('title','');
	}
	if($( "#IU4" ).prop("disabled")!=true){ 
	if($("#IU5").val().length == 0){
		$("#div5").attr('class','form-group has-error') ;
		$("#IU5").attr('title','Campo Obligatorio') ;
		I6 = false;
	}
	else{
	 cambioClase1(5);
	$("#IU5").attr('title','');
	}
	}
	if($("#IU4").val()!=$("#IU5").val() && $( "#IU4" ).prop("disabled")!=true){
		$("#div4").attr('class','form-group has-error') ;
		$("#IU4").attr('title','La contraseña no coincide') ;
		$("#div5").attr('class','form-group has-error') ;
		$("#IU5").attr('title','La contraseña no coincide') ;
		$("#IU5").val("");
		$("#IU4").val("");
		I6 = false;
	}
	else{
	if(I6&&I5){
	 cambioClase1(4);
	$("#IU4").attr('title','');
	 cambioClase1(5);
	$("#IU5").attr('title','');
	}
	}

		return (I2  && I3  && I4 && I5 && I6 );	
}



function limpiarValores(){ //Limpia los valores de los campos de entrada
    $("#div5").attr('class','form-group') ;
	$("#IU5").attr('title','');
	$("#IU5").val("");
	let i =1;
	for(i=1;i<6;i++){
	   cambioClase1(i);
	}
}
  
  function cambioClase1(op){ //Realiza el cambio de clase de has-error a form-group
	switch(op){
		case 1:  $("#div1").attr('class','form-group'); break;
		case 2:	 $("#div2").attr('class','form-group'); break;
		case 3:  $("#div3").attr('class','form-group'); break;
		case 4:  $("#div4").attr('class','form-group'); break;
		case 5:  $("#div5").attr('class','form-group'); break;
	}
  }
  
  function activar(){
    $("#IU4").removeAttr("disabled");
    $("#LIU5").show();
    $("#IU5").show();	
    $("#btnCambiar").hide();
  }
  
  function desactivar(){
    $("#IU4").attr('disabled','disabled');
    $("#LIU5").hide();
    $("#IU5").hide();
	$("#btnCambiar").show();
  }
