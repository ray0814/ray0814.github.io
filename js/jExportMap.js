var exportmap = (function () {
  const dims = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [297, 210],
    a5: [210, 148]
  };

  function WebMapExport() {
    const format = document.getElementById('format').value;
    const resolution = parseInt(document.getElementById('resolution').value);
    const imageformat = document.getElementById('imageformat').value;

    const dim = dims[format];
    const width = Math.round((dim[0] * resolution) / 25.4); // mm to px
    const height = Math.round((dim[1] * resolution) / 25.4);

    const mapContainer = document.getElementById('map');
    const originalSize = {
      width: mapContainer.style.width,
      height: mapContainer.style.height
    };

    // Resize map container
    mapContainer.style.width = width + 'px';
    mapContainer.style.height = height + 'px';
    map.invalidateSize();

    const exportOptions = {
      width: width,
      height: height,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      }
    };

    const ExportImageName = 'MapExport_' + new Date().toISOString().replace(/[:.]/g, '-');

    function restoreMapSize() {
      mapContainer.style.width = originalSize.width;
      mapContainer.style.height = originalSize.height;
      map.invalidateSize();
    }

    if (imageformat === 'PDF') {
      domtoimage.toJpeg(mapContainer, exportOptions).then(function (dataUrl) {
        const pdf = new jsPDF('landscape', undefined, format);
        pdf.addImage(dataUrl, 'JPEG', 0, 0, dim[0], dim[1]);
        pdf.save(ExportImageName + '.pdf');
        restoreMapSize();
      });
    } else if (imageformat === 'JPEG') {
      domtoimage.toJpeg(mapContainer, exportOptions).then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = ExportImageName + '.jpeg';
        link.href = dataUrl;
        link.click();
        restoreMapSize();
      });
    } else {
      domtoimage.toPng(mapContainer, exportOptions).then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = ExportImageName + '.png';
        link.href = dataUrl;
        link.click();
        restoreMapSize();
      });
    }
  }

  return {
    WebMapExport: WebMapExport
  };
})();
