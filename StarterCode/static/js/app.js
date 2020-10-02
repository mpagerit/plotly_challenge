// verify the correct .js file is being referenced
console.log("This is app.js");

// create a function to draw the bar graph
function DrawBargraph(sampleID) {
    console.log(`DrawBargraph(${sampleID})`);

    d3.json("samples.json").then((data) => {
        
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(), 
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }
    
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }
    
        Plotly.newPlot("bar", [barData], barLayout);


    });

}

// create a function to draw the bubble chart
function DrawBubblechart(sampleID) {
    console.log(`DrawBubblechart(${sampleID})`);

    d3.json("samples.json").then((data) => {
        // reusing the same code to get otu_ids, otu_labels, and sample_values
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;


        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              color: [0, 50, 100, 150, 200, 250, 300],
              size: sample_values
            }
          };
          
          var sampleData = [trace1];
          
          var layout = {
            title: 'Sample Sizes',
            showlegend: false,
            height: 600,
            width: 1200
          };
          
          Plotly.newPlot('bubble', sampleData, layout);

    });
    
    
}

function populateDemographicInfo(sampleID) {
    console.log(`Demographic info for ${sampleID}`);

    d3.json("samples.json").then((data) => {
        
        var metaData = data.metadata;
        var resultArray = metaData.filter(md => md.id == sampleID);
        var result = resultArray[0];

        var panel = d3.select(`#sample-metadata`);
        panel.html("");

        Object.entries(result).forEach(([key, value]) => {
            var category = key;
            var information = value;
            panel.append("h6").text(`${category}: ${value}`);
        })

    });

}

// create a function that will update the graph and the chart based on a new selection
function optionChanged(newSampleID) {
    console.log(`User selected ${newSampleID}`);

    DrawBargraph(newSampleID);
    DrawBubblechart(newSampleID);
    populateDemographicInfo(newSampleID);
}

function InitDashboard()
{
    console.log('calling InitDashboard');
    // select the selector ID
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);

        var sampleNames = data.names;

        // populate the slector with all sample IDs
        sampleNames.forEach((sampleID) => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID);
            
        });
        var sampleID = sampleNames[0];
        console.log("Starting Sample: ", sampleID);

        DrawBargraph(sampleID);
        DrawBubblechart(sampleID);
        populateDemographicInfo(sampleID);
    });
}

InitDashboard();