// verify the correct .js file is being referenced
console.log("app.js is live!");

// create a function to draw the bar graph
// code taken from office hours with instructor
function DrawBargraph(sampleID) {
    console.log(`DrawBargraph(${sampleID})`);

    d3.json("samples.json").then((data) => {
        
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        // code taken from office hours with instructor
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

// function for the demographic info panel
function populateDemographicInfo(sampleID) {
    console.log(`Demographic info for ${sampleID}`);

    d3.json("samples.json").then((data) => {
        // get the metadata from the json for the id selected
        var metaData = data.metadata;
        var resultArray = metaData.filter(md => md.id == sampleID);
        var result = resultArray[0];

        var panel = d3.select(`#sample-metadata`);
        // clear data from previous entries from the panel to avoid duplication
        panel.html("");

        // print out the key and value of the metadata on separate rows
        Object.entries(result).forEach(([key, value]) => {
            var category = key;
            var information = value;
            panel.append("h6").text(`${category}: ${value}`);
        })

    });

}

// create a guage function for belly button washing
function washFrequencyGuage(sampleID) {
    console.log(`Time to wash the belly button of ${sampleID}`);

    // pull the wash frequency from the metadata
    d3.json("samples.json").then((data) => {
        
        var metaData = data.metadata;
        var resultArray = metaData.filter(md => md.id == sampleID);
        var result = resultArray[0];

        var washFrequency = result.wfreq;

        var GuageData = [
            {
              type: "indicator",
              mode: "gauge+number",
              value: washFrequency,
              title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
              subtitle: {text: "Scrubs per Week"},
            //   delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
              gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "black" },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 1]},
                  { range: [1, 2]},
                  { range: [2, 3]},
                  { range: [3, 4]},
                  { range: [4, 5]},
                  { range: [5, 6]},
                  { range: [6, 7]},
                  { range: [7, 8]},
                  { range: [8, 9]}
                ],
              }
            }
          ];
          
          var guageLayout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
          };
          
          Plotly.newPlot('gauge', GuageData, guageLayout);

    });

}

// function to update all graphs and other information with new selection
// code from office hours with instructor
function optionChanged(newSampleID) {
    console.log(`User selected ${newSampleID}`);

    DrawBargraph(newSampleID);
    DrawBubblechart(newSampleID);
    populateDemographicInfo(newSampleID);
    washFrequencyGuage(newSampleID);
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
        washFrequencyGuage(sampleID);
    });
}

InitDashboard();