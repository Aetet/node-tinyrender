/**
 * Color representation
 * @param  {Number | Object} r red
 * @param  {Number} [g] green
 * @param  {Number} [b] blue
 * @param  {Number} [a] alpha-channel
 */
module.exports = TGAColor;
function TGAColor(r, g, b, a) {
	if (typeof r === 'object') {
		this.bgra = new Buffer([r.b, r.g, r.r, r.a]);
	} else {
		this.bgra = new Buffer([b, g, r, a]);
	}
}
