/*
 * Created by John Armstrong, 2014;
 * 
 * If you are looking at this maybe you should check out my portfolio: http://portfolio.johnarmstrong.co
 */

//Width and height of SVG
var width = 700;
var height = 700;

//Bar chart vars
var barHeight = height - 150;	//Bar height has to be less than height to fit inside donut chart
var scaleY = null;	//Set the y scale once with max height so that each language can be easily compared.
var xOffset = 170;	//Offset to the left to center in donut.

/*
 * Draw a donut chart with arcs representing the amount of job for each language.
 */
function drawDonutChart(data) {
    var radius = Math.min(width, height) / 2;
    var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(radius - 70);
    var pie = d3.layout.pie().sort(null).value(function(d) {
        return d[1];
    });
    var svg = d3.select("#charts").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc").on("mouseover", function(d) {
        d3.select(this).style("opacity", 0.6);
        //Tooltip
        d3.select("#tooltip_d3").style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px").style("opacity", 1).select("#value").text(function() {
            return "Count: " + d.data[1];
        })
        d3.select("#tooltip_d3").select("#title").text(d.data[0])
        d3.select(this).attr("transform", "scale(1.02)");
        selectedLang = d.data[0];
        drawBarChart(getSelected(selectedLang));
        
    }).on("mouseout", function() {
        d3.select(this).style("opacity", 1);
        d3.select("#tooltip_d3").style("opacity", 0);
        d3.select(this).attr("transform", "scale(1)");
    });
    g.append("path").transition().duration(0).delay(function(d, i) {
        return i * 50;
    }).ease("elastic").attr("d", arc).style("fill", function(d) {
        return color(d.data[0]);
    });
}

/*
 * Draw a bar chart with each bar representing a salary range for a particular language.
 */
function drawBarChart(newdata) {    
    
    var bars = d3.select("#charts").selectAll("rect");
    
    bars.data(newdata)
    .exit()
    .remove();
    
   
    bars = d3.select("#charts").selectAll("rect").data(newdata);
    
    bars.enter().append("rect").attr("width", 20).attr("x", function(d, i) {
        return xOffset + (i * 21); //Bar width of 20 plus 1 for padding
    });
    
    bars.transition().duration(800).delay(function(d, i) {
        return i * 20;
    }).attr("y", function(d) {        
        return barHeight - scaleY(d.count); //Height minus data value
    }).attr("height", function(d) {
      	return scaleY(d.count);
    }).attr("fill", function(d) {        
        return color(d.language);
    });
    
    d3.select("#charts").selectAll("rect")
        .on("mouseover", function(d) {
            d3.select(this).style("opacity", 0.6);
            //Tooltip
            d3.select("#tooltip_d3").style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px").style("opacity", 1).select("#value").text(function() {
                return "$" + d.salary_min + " - $" + d.salary_max;
            })
            d3.select("#tooltip_d3").select("#title").text(d.count)
        }).on("mouseout", function() {
            d3.select(this).style("opacity", 1);
            d3.select("#tooltip_d3").style("opacity", 0);
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

/*
 * Setup some global vars
 */
function setup(maxValue) {    
    scaleY = d3.scale.linear()
				.domain([0, maxValue])
				.range([0, barHeight - 100]);    
}