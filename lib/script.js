var $img   =   'default.jpg';
var lat    =   null;
var lon    =   null;

function fotografar() {
	var opt = {
		quality: 50,
		destinationType: navigator.camera.DestinationType.FILE_URI,
		sourceType : Camera.PictureSourceType.CAMERA, 
		allowEdit : true,
		encodingType: Camera.EncodingType.JPEG,
		targetWidth: 100,
		targetHeight: 100
	};
	return navigator.camera.getPicture(novaImagem, errorCB, opt);
};
	
function novaImagem(src) {
	$img   =  src;
	//updateStatus("valor de $img em novaImagem(src): "+$img);
};

function showImage(id) {
	var _Query  =   "select src from obra where id = "+id;
	getDB().transaction(function(tx){
	dbInit(tx);
	tx.executeSql(_Query, [],
				  function(qr,rs){
				
						var len = rs.rows.length;
						
						for (var i=0; i<len; i++){
						  $('#_photo').attr('src',rs.rows.item(i).src);
						  $("#sql_console").append("<br/> IMAGE SRC: "+rs.rows.item(i).src);
						}
					  }, errorCB);
	  }, errorCB, successCB);
	};
	
	function errorCB(err) {
	  console.log("Error processing SQL: "+err.code);
	  alert('code: '    + err.code    + '\n' +
	  'message: ' + err.message + '\n');
	};