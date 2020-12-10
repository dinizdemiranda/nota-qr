function getData(numero) {
    fetch(`http://localhost:3000/api/${numero}`, {
        method: "get",
      }
    )
      .then(function (resp) {
        return resp.json();
      })
      .then(function (resp) {
        dados = resp;
        // console.log(dados)
      })
  }

  function uploadCanvas(dataURL, altura, largura) {
    var blobBin = atob(dataURL.split(',')[1]);
    var array = [];
    for(var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
    var formdata = new FormData();
    formdata.append("image", file);
    // console.log(array.length, (altura * largura * 4))
  }
  var input, canvas, context, output;

  input = document.getElementById("input");
  canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');
  output = document.getElementById("output");




  input.addEventListener("change", function() {
    console.log(this.files[0])
    var reader = new FileReader();

    reader.addEventListener("loadend", function(arg) {
      var src_image = new Image();

      src_image.onload = function() {
        canvas.height = src_image.height;
        canvas.width = src_image.width;
        context.drawImage(src_image, 0, 0);
        var dadoImagem = canvas.toDataURL("image/png"); 
        // console.log('isso aqui' + dadoImagem)
        output.src = dadoImagem;
        uploadCanvas(dadoImagem, canvas.height, canvas.width);
        


imageData = context.getImageData(0, 0, src_image.width, src_image.height);
// console.log(imageData.data);
// console.log(src_image.width * src_image.height * 4);


        // dadosNota = jsQR(imageData.data, src_image.width, src_image.height)
        // console.log('Url obtida: '+ dadosNota.data)
        // console.log('Numero do QR: '+ dadosNota.data.substring(dadosNota.data.indexOf('qrcode?p=') + 9))
        // console.log('obtendo dados da nota...')
        //getData(dadosNota.data.substring(dadosNota.data.indexOf('qrcode?p=') + 9))
      }

      //console.log(this.result)
      src_image.src = this.result;
      
    });
    //console.log(this.files[0])
    reader.readAsDataURL(this.files[0]);
  });