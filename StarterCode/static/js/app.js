console.log("This is app.js");

function DrawBargraph(sampleID) {
    console.log(`DrawBargraph(${sampleID})`);
}

function optionChanged(newSampleID) {
    console.log(`User selected ${newSampleID}`);

    DrawBargraph(newSampleID);
}

function InitDashboard()
{
    console.log('calling InitDashboard');

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);

        var sampleNames = data.names;

        // populate hte slector with all sample IDs
        sampleNames.forEach((sampleID) => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID);
            
        });
        var sampleID = sampleNames[0];
        console.log("Starting Sample: ", sampleID);

        DrawBargraph(sampleID);
        // DrawBubblechart(sampleID);
    });
}

InitDashboard();