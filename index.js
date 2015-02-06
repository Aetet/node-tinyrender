var TGAColor = require('./lib/TGAColor');
var TGAImage = require('./lib/TGAImage');

var image = new TGAImage(100, 100, TGAImage.format.RGB);

var red = new TGAColor(255, 0, 0, 0);
image.set(10, 20, red);
image.writeFile('red-point.tga');
