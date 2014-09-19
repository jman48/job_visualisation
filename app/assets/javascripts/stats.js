var svg = null;
var width = 800;
var height = 800;
var barHeight = height - 150;
var bars = null;
var scaleY = null;
var xOffset = 200;

function drawDonut(data) {
    data = data;
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
            return d.data[1];
        })
        d3.select("#tooltip_d3").select("#title").text(d.data[0])
        d3.select(this).attr("transform", "scale(1.03)");
        selectedLang = d.data[0];
        updateBar(getSelected(selectedLang));
        
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
    /*
      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return d; });
          */
}

function updateBar(newdata) {
    
    bars.data(newdata)
    .exit()
    .remove();
    
   
    bars = svg.selectAll("rect").data(newdata);
    
    bars.enter().append("rect").attr("width", 20).attr("x", function(d, i) {
        return xOffset + (i * 21); //Bar width of 20 plus 1 for padding
    });
    
    bars.transition().duration(800).delay(function(d, i) {
        return i * 20;
    }).attr("y", function(d) {        
        return bHeight - scaleY(d.count); //Height minus data value
    }).attr("height", function(d) {
        console.log("height", scaleY(d.count));
      	return scaleY(d.count);
    }).attr("fill", function(d) {        
        return color(d.language);
    });
    
    svg.selectAll("rect")
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
 * Setup the y axis scale so we can easily compare different data sets (languages)
 */
function setup(maxValue) {    
    scaleY = d3.scale.linear()
				.domain([0, maxValue])
				.range([0, bHeight - 100]);
    
    svg = d3.select("#charts").attr("width", width).attr("height", height);
    bars = svg.selectAll("rect").data(data);
}