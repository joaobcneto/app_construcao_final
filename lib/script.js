function fotografar() {
	  console.log('passei em fotografar()');
	  takeImage();
}

function takeImage() {         
	  var opt = {
		 quality: 50,
		 destinationType: navigator.camera.DestinationType.FILE_URI,
		 sourceType : Camera.PictureSourceType.CAMERA, 
		 allowEdit : true,
		 encodingType: Camera.EncodingType.JPEG,
		 targetWidth: 100,
		 targetHeight: 100
	  };
	  return navigator.camera.getPicture(newImage, errorCB, opt);
	};
	
	function newImage(src) {
	  $img   =  src;
	};
	function showImage(id) {
	  var _Query  =   "select src from gerenciador where id = "+id;
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