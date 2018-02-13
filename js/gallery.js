var pictures = [
/*
    "https://c1.staticflickr.com/8/7745/27694747621_7c051145f8_b.jpg",
    "https://c1.staticflickr.com/8/7745/27694747621_7c051145f8_b.jpg",
    "https://c1.staticflickr.com/8/7322/27158064733_a45333ffbf_b.jpg",
    "https://c1.staticflickr.com/8/7322/27158064733_a45333ffbf_b.jpg",
    "https://c1.staticflickr.com/8/7322/27158064733_a45333ffbf_b.jpg",
    */
    
    "images/2018-02-07 16.04.15.jpg",
    "images/2018-02-07 13.56.31.jpg",
    "images/2018-02-04 16.08.26.jpg",
    "images/2018-01-21 12.35.34.jpg",
    
];

var attributes = {
};
    


var max_pix = 5; /* max number of pictures to display on one page */
var s = Math.min(window.innerWidth, window.innerHeight); /* length of side of bounding box for photos */
var x = 0;    /* x (and y) coord of top left of bounding box */
var m = (0.5/16) * s;  /* padding */

d3.select("div")
    .attr("style", "height: " + s + "px; width: " + s + "px; position: relative; margin: auto;")

var shown_pix = 0;
while(s > 10 && shown_pix <= max_pix) {
/*
    d3.select("svg")
        .append("pattern")
        .attr("id", "bg" + shown_pix)
            .append("image")
            .attr("xlink:href", pictures[shown_pix-1])
            */

	d3.select("div")
    .append("div")
        .attr("class", "picture")
        .attr("id", "iter" + shown_pix)
        .attr("style", "position: absolute; position: absolute; left: " + x + "px; top: " + x + "px; height: " + s + "px; width: " + s + "px; padding: " + 0 + "px; z-index: " + shown_pix + "; ")
        /*.html("foo")*/
        .append("img")
            .attr("src", pictures[shown_pix])
            .attr("style", "height: auto; width: auto; max-height: " + s + "px; max-width: " + s + "px; min-height: " + 9/16*s + "px; mix-width: " + 9/16*s + "px; outline: 3px white solid; outline-offset: -3px;")

    /*.append("image").attr("xlink:href", "2018-02-07 16.04.15.jpg").attr("height", s-m).attr("width", s-m);*/
	console.log("n=" + shown_pix + " x=" + x + " s=" + s + " m=" + m)
	x = x + (9/16 * s);
	s = 7/16 * s;
	m = 7/16 * m;
	shown_pix++;
}
