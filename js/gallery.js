/*
var pictures = {
    "images/2018-02-07 16.04.15.jpg": {tulips: 1, first: 1, balcony: 1},
    "images/2018-02-07 13.56.31.jpg": {tulips: 1, david: 1},
    "images/2018-02-04 16.08.26.jpg": {tulips: 1, painting: 1},
    "images/2018-01-21 12.35.34.jpg": {balcony: 1},
};
*/


var npix = 4; /* max number of pictures to display on one page */
var s = Math.min(window.screen.width, window.screen.height); /* length of side of bounding box for photos */
var x = 0;    /* x (and y) coord of top left of bounding box */
var m = (0.5/16) * s;  /* padding */

d3.select("svg")
    .attr("height", s)
    .attr("width", s);

while(s > 10 && npix > 0) {
    d3.select("svg")
        .append("pattern")
        .attr("id", "bg" + npix)
            .append("image")
            .attr("xlink:href", "image.jpg");

	d3.select("svg")
    .append("rect")
        .attr("class", "picture")
        .attr("id", "iter" + npix)
        .attr("fill", "url(#bg" + npix + ")")
        .attr("x", x)
        .attr("y", x)
        .attr("height", s)
        .attr("width", s)
        .attr("padding", m)

    /*.append("image").attr("xlink:href", "2018-02-07 16.04.15.jpg").attr("height", s-m).attr("width", s-m);*/
	console.log("n=" + npix + " x=" + x + " s=" + s + " m=" + m)
	x = x + (9/16 * s);
	s = 7/16 * s;
	m = 7/16 * m;
	npix--;
}
