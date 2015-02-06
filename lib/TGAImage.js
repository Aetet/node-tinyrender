var fs = require('fs');
var b = require('binary')();
var TGAColor = require('./TGAColor');
var Put = require('put');
var TGAHeader = require('./TGAHeader');
var format = require('./format');

function TgaImage (w, h, bpp) {
	this.header = this.setHeader(w,h,bpp);
	this.data = new Buffer(
		new Array(this.header.width * this.header.height * this.header.bytesPerPixel)
	);
	this.format = format;
}

TgaImage.prototype = {
	/**
	 * set tga header
	 * @param {Object} obj object with header data
	 */
	setHeader: function (w, h, bytesPerPixel, rle) {
		/*
		{
			colorMapType
			dataTypeCode
			colorMapOrigin
			colorMapLength
			colorMapDepth
			xOrigin
			yOrigin
			width
			height
			bitsPerPixel
			imageDescriptor
		}
		*/

		switch(typeof w) {
			case 'object': {
				this.header = this._headerObj(w);
				break;
			}
			case 'number': {
				this.header = this._headerArgs(w, h, bytesPerPixel, !!rle)
				break;
			}
			case 'string': {
				this.header = this._headerArgs(+w, +h, +bytesPerPixel, !!rle);
				break;
			}
			default: {
				throw new Error('bad width/height for tga file');
			}
		}

		return this.header;
	},

	_parseRawHeader: function (raw) {
		throw Error('Not implemented yet');
	},

	set: function (x, y, c) {
		var header = this.header;
    if (!this.data || x < 0 || y < 0 || x >= header.width || y >= header.height) {
        return false;
    }
    var bufa = c.bgra.copy(this.data, (x + y * header.width) * header.bytesPerPixel)
	},

	_headerArgs: function (w, h, bytesPerPixel, rle) {
		this.validateHeader(w, h, bytesPerPixel);
		var header = {
			runLengthEncoding: rle,
			colorMapType: 0,
			dataTypeCode: (bytesPerPixel===format.GRAYSCALE?(rle?11:3):(rle?10:2)),
			colorMapOrigin: 0,
			colorMapLength: 0,
			colorMapDepth: 0,
			xOrigin: 0,
			yOrigin: 0,
			width: w,
			height: h,
			bytesPerPixel: bytesPerPixel,
			imageDescriptor: 0
		};
		return header;
	},

	_headerObj: function (obj) {
		var bytesPerPixel = obj.bytesPerPixel;
		this.validateHeader(obj.width, obj.height, bytesPerPixel);
		var header = {
			runLengthEncoding: !!obj.rle,
			colorMapType: 0,
			dataTypeCode: (obj.bytesPerPixel===format.GRAYSCALE?(obj.rle?11:3):(obj.rle?10:2)),
			colorMapOrigin: 0,
			colorMapLength: 0,
			colorMapDepth: 0,
			xOrigin: 0,
			yOrigin: 0,
			width: obj.width,
			height: obj.height,
			bytesPerPixel: obj.bytesPerPixel,
			imageDescriptor: 0
		};
		return header;
	},
	validateHeader: function (w, h, bytesPerPixel) {
		if (w <= 0 || h <= 0 ||
			 (bytesPerPixel !== format.GRAYSCALE &&
				bytesPerPixel !== format.RGB &&
				bytesPerPixel !== format.RGBA)) {
			throw new Error('bad width/height for tga file');
		}
	},

	readFile: function (fileName) {
		var self = this;
		var marbles = fs.createReadStream('fixture/MARBLES.TGA');

		var result = b
		.buffer('header', 18)
		.tap(function (vars) {
			var rawHeader = vars.header;
			var obj = TGAHeader.unpack(rawHeader);
			self._parseRawHeader(obj);

			var nbytes = header.bytesPerPixel * header.width * header.height;
			if (3 === header.dataTypeCode || 2 === header.dataTypeCode) {
				this.buffer('data', nbytes);
			} else if (10 === header.dataTypeCode || 11 === header.dataTypeCode) {
				if (!loadRleData(this)) {
					throw new Error('Error while reading data');
				}
			} else {
				throw new Error('Unknown file format');
			}

		})
		.tap(function (vars) {
			console.log('vars:', vars.data)
		})


		marbles.pipe(result);
	},
	loadRleData: function (ctx) {
		var header = this.header;
		var pixelCount = header.width * header.height;
		var currentPixel = 0;
		var currentByte = 0;
	},
	writeFile: function (fileName) {

		var developerAreaRef = new Buffer([0,0,0,0]);
		var extensionAreaRef = new Buffer([0,0,0,0]);

		var footer = new Buffer('TRUEVISION-XFILE-\0');
		var fileStream = fs.createWriteStream(fileName);

		var header = TGAHeader.pack({
			bitsPerPixel: this.header.bytesPerPixel << 3,
			width: this.header.width,
			height: this.header.height,
			dataTypeCode: (this.header.bytesPerPixel === this.format.GRAYSCALE) ? 3 : 2,
			imageDescriptor: 0x20
		});

		Put()
		.put(header)
		.put(this.data)
		.put(developerAreaRef)
		.put(extensionAreaRef)
		.put(footer)
		.write(fileStream)
	}
};

module.exports = exports = TgaImage;
exports.format = format;


// var image = new TgaImage();
// image.writeFile('john.tga');

// image.readFile('fixture/MARBLES.TGA');




