// verify the correct .js file is being referenced
console.log("This is app.js");

// create a function to draw the bar graph
function DrawBargraph(sampleID) {
    console.log(`DrawBargraph(${sampleID})`);

    var trace1 = {
        x: sampleID.map(row => row.sample_values),
        y: sampleID.map(row => row.otu_ids),
        text: sampleID.map(row => row.otu_ids),
        name: "OTU",
        type: "bar",
        orientation: "h" 
    };
}

// create a function to draw the bubble chart
function DrawBubblechart(sampleID) {
    console.log(`DrawBubblechart(${sampleID})`);
}

function populateDemographicInfo(sampleID) {
    console.log(`Demographic info for ${sampleID}`);
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