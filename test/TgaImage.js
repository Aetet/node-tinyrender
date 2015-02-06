require('chai').should();
var TgaImage = require('../lib/TgaImage');
var TgaColor = require('../lib/TgaColor');
describe('TgaImage', function () {
	describe('constructor', function () {
		it('#args', function () {
			var image = new TgaImage(1400, 1200, TgaImage.format.RGB);
			image.header.should.be.deep.eql({
        "bytesPerPixel": 3,
        "colorMapDepth": 0,
        "colorMapLength": 0,
        "colorMapOrigin": 0,
        "colorMapType": 0,
        "dataTypeCode": 2,
        "height": 1200,
        "imageDescriptor": 0,
        "width": 1400,
        "xOrigin": 0,
        "yOrigin": 0,
        "runLengthEncoding": false
      });
		});

		it('#obj', function () {
			var image = new TgaImage({
				width: 1400,
				height: 1200,
				bytesPerPixel: TgaImage.format.RGB
			});

			image.header.should.be.deep.eql({
        "bytesPerPixel": 3,
        "colorMapDepth": 0,
        "colorMapLength": 0,
        "colorMapOrigin": 0,
        "colorMapType": 0,
        "dataTypeCode": 2,
        "height": 1200,
        "imageDescriptor": 0,
        "width": 1400,
        "xOrigin": 0,
        "yOrigin": 0,
        "runLengthEncoding": false
      });
		});

	});
	describe('#set', function () {
		it('correct', function () {
			var image = new TgaImage({
				width: 1400,
				height: 1200,
				bytesPerPixel: TgaImage.format.RGB
			});

			var red = new TgaColor(255, 0, 0, 0);
			image.set(10, 20, red);
			image.data[84032].should.be.eql(255);
		});
	});
	it('write', function () {

	});
});
