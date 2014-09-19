var svg = null;
var width = 500;
var height = 500;
var constant = 3; //Anumber to scale bar height by. Will replace with d3 scale

function drawDonut(data) {
    var width = 500,
        height = 500,
        radius = Math.min(width, height) / 2;
    var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(radius - 70);
    var pie = d3.layout.pie().sort(null).value(function(d) {
        return d[1];
    });
    var svg = d3.select("#chart2").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc").on("mouseover", function(d) {
        d3.select(this).style("opacity", 0.6);
        //Tooltip
        d3.select("#tooltip_d3").style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px").style("opacity", 1).select("#value").text(function() {
            return d.data[1];
        })
        d3.select("#tooltip_d3").select("#title").text(d.data[0])
        selectedLang = d.data[0];
        updateBar(getSelected(selectedLang));
    }).on("mouseout", function() {
        d3.select(this).style("opacity", 1);
        d3.select("#tooltip_d3").style("opacity", 0);
    });
    g.append("path").transition().duration(0).delay(function(d, i) {
        return i * 50;
    }).ease("elastic").attr("d", arc).style("fill", function(d) {
        return color(d.data[0]);
    });
    /*
      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return d; });
          */
}
var bars = null;

function updateBar(data) {
    bars.exit().remove();
    bars = svg.selectAll("rect").data(data);
    bars.enter().append("rect").attr("width", 20).attr("x", function(d, i) {
        return i * 21; //Bar width of 20 plus 1 for padding
    });
    
    bars.transition().duration(800).delay(function(d, i) {
        return i * 20;
    }).attr("y", function(d) {
        return height - (d.count * constant); //Height minus data value
    }).attr("height", function(d) {
        return(d.count * constant);
    }).attr("fill", function(d, i) {
        return color(d.language);
    }).ease("elastic")
}

function drawBar(data) {
    var type = data[0].language;
    if(svg == null) {
        svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height);
    }
    bars = svg.selectAll("rect").data(data);
    bars.enter().append("rect").attr("width", 20).attr("x", function(d, i) {
        return i * 21; //Bar width of 20 plus 1 for padding
    }).attr("y", height).attr("height", 0).on("mouseover", function(d) {
        d3.select(this).style("opacity", 0.6);
        //Tooltip
        d3.select("#tooltip_d3").style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px").style("opacity", 1).select("#value").text(function() {
            return "$" + d.salary_min + " - $" + d.salary_max;
        })
        d3.select("#tooltip_d3").select("#title").text(d.language)
    }).on("mouseout", function() {
        d3.select(this).style("opacity", 1);
        d3.select("#tooltip_d3").style("opacity", 0);
    });
    bars.transition().duration(800).delay(function(d, i) {
        return i * 50;
    }).attr("y", function(d) {
        return height - (d.count * constant); //Height minus data value
    }).attr("height", function(d) {
        return(d.count * constant);
    }).ease("elastic")
}

function drawPie(data) {
    //data = [["wer", 89]];
    var thickness = 40;
    var width = 500 + thickness;
    var height = 500 + thickness;
    var radius = 250;
    var color = d3.scale.category20();
    var svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height).attr("id", "canvas");
    var group = svg.append("g").attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");
    var arc = d3.svg.arc().innerRadius(radius - thickness).outerRadius(radius)
    var pie = d3.layout.pie().value(function(d) {
        d[1];
    });
    var arcs = group.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc").on("mouseover", function(d) {
        d3.select("#tooltip_d3").style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px").style("opacity", 1).select("#value").text(d);
        d3.select("#tooltip_d3").select("#title").text(d);
        d3.select(this).attr("transform", "scale(1.03)");
    }).on("mouseout", function() {
        d3.select("#tooltip_d3").style("opacity", 0);
        d3.select(this).attr("transform", "scale(1)");
    });
    arcs.append("path").attr("id", function(d, i) {
        i;
    }).attr("d", arc).attr("fill", function(d, i) {       
        return color(d);
    });
}
/*
 *Find all the data on a particular language.
 *param 'lang' : The language to find all the data on
 *return : An array with all the data on the lang
 */

function getSelected(lang) {
    for(var i = 0; i < allLangs.length; i++) {
        if(allLangs[i][0].language == lang) {
            return allLangs[i];
        }
    }
}