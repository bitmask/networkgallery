/* initialization */

var max_pix = 5; /* max number of pictures to display on one page */
var s = Math.min(window.innerWidth, window.innerHeight); /* length of side of bounding box for photos */
var x = 0;    /* x (and y) coord of top left of bounding box */
var m = (0.5/16) * s;  /* padding */

d3.select("div")
    .attr("style", "height: " + s + "px; width: " + s + "px; position: relative; margin: auto;")


/* get data from files */

d3.tsv("similarities/all").then(function(similarities) {
    show(similarities);
});


function show(similarities) {
    console.log(similarities);
    rand = Math.floor(Math.random() * similarities.length);
    first_pic = similarities[rand];
    pictures = [];
    pictures.push(first_pic['img1']);

    /* get all links for that picture, unordered */
    similarities.forEach(function(d) {
        if (d['img1'] == first_pic['img1']) {
            if (pictures.indexOf(d['img2']) == -1) {  
                pictures.push(d['img2']);
            }
        }
    });
    

    var shown_pix = 0;
    while(s > 10 && shown_pix <= max_pix) {
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
}
