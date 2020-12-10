function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ';'

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    let arrHeaders = []
    arrHeaders.push(headers)
    let imprimir = arrHeaders.concat(items)
    // if (headers) {
    //     items.unshift(headers);
    // }
    // Convert Object to JSON
    var jsonObject = JSON.stringify(imprimir);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("target", "_blank");
            link.setAttribute("download", exportedFilenmae);
            link.innerText = 'Baixar CSV'
            document.getElementById("download-btn").innerHTML = ''
            document.getElementById("download-btn").appendChild(link);
        }
    }
}

var headers = {
    chave: 'Chave',
    valor: "Valor"
};


var fileTitle = 'notas'; // or 'my-unique-title'

; // call the exportCSVFile() function to process the JSON and trigger the download