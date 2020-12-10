let dados = []


let notas = []

function uploadCanvas(dataURL, altura, largura) {
  var blobBin = atob(dataURL.split(',')[1]);
  var array = [];
  for(var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
  }
  var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
  var formdata = new FormData();
  formdata.append("image", file);
}

var filesInput, canvas, context, output, notasValidas;

filesInput = document.getElementById("input");
canvas = document.getElementById("canvas");
context = canvas.getContext('2d');
output = document.getElementById("output");
notasValidas = document.getElementById("notas-validas");



filesInput.addEventListener("change", function(event) {
  var files = event.target.files; //FileList object
  teste(files)
});

function teste(imagens) {

  for (let index = 0; index < imagens.length; index++) {
    

  var reader = new FileReader();

  reader.addEventListener("loadend", function(arg) {
    var src_image = new Image();

    src_image.onload = function() {
      canvas.height = src_image.height;
      canvas.width = src_image.width;
      context.drawImage(src_image, 0, 0);
      var dadoImagem = canvas.toDataURL("image/png"); 
      uploadCanvas(dadoImagem, canvas.height, canvas.width);
      
      

      imageData = context.getImageData(0, 0, src_image.width, src_image.height);


      dadosNota = jsQR(imageData.data, src_image.width, src_image.height)
      createList(dadoImagem, dadosNota.data)


      
    }

    
    src_image.src = this.result;
    
  });

  

  reader.readAsDataURL(imagens[index]);

    
}
};

async function createList(imagem, linkNota) {
  let value, key;
   await getData(linkNota.substring(linkNota.indexOf('qrcode?p=') + 9)).then(response => {
    notas.push(response)
    key = response.chave
    value = response.valor
   })
  //  console.log(value)
  //  console.log(key)

  let thumb = document.createElement("img")
  thumb.src = imagem

  notasValidas.appendChild(thumb)

  

  let info = document.createElement("div")
  info.classList.add('info-nota')
  let chave = document.createElement("span")
  chave.innerText = `Chave: ${key}`
  let valor = document.createElement("span")
  valor.innerText = `Valor da nota: ${value}`
  info.appendChild(chave)
  info.appendChild(valor)

  let botaoLink = document.createElement("a")
  botaoLink.href = linkNota
  botaoLink.setAttribute("target", "_blank")
  botaoLink.innerHTML = 'Ver nota'
  info.appendChild(botaoLink)

  notasValidas.appendChild(info)
  
  exportCSVFile(headers, notas, fileTitle)
  document.getElementById('legenda').innerText = `${notas.length} notas válidas de ${filesInput.files.length} imagens enviadas`

}


async function getData(numero) {
  return fetch(`http://localhost:3000/api/${numero}`, {
      method: "get",
    }
  )
    .then(function (resp) {
      return resp.json();
    })
}