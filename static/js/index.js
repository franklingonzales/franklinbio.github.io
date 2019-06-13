var txtComboCountry = d3.select("#inputCountry");
var txtComboState = d3.select("#inputState");
var txtComboCity = d3.select("#inputCity");
var txtComboShape = d3.select("#inputShape");


var lCountryFiltered = [];
var lStateFiltered = [];
var lCityFiltered = [];
var lShapeFiltered = [];


var lMyHeads = ["datetime", "city", "state", "country", "shape", "durarion", "comments"]

// Use D3 to select the table body
var tbody = d3.select("tbody");

// Use D3 to select the table head
var thead = d3.select("thead");

// Use D3 to select the table
var table = d3.select("table");

// Use D3 to select the button btnFilter
var btnFilter = d3.select("#btnFilter");


var lCity = [];
var lStates = [];
var lShapes = [];
var lDates = [];
var lCountries = [];


var lDataFiltered = [];
var lDateCriteria = ['1/1/2010', '1/13/2010'];
var lShapeCriteria = [];
var lStateCriteria = [];
var lCityCriteria = [];
var lCountryCriteria = [];


btnFilter.on("click", function() {

    tbody.selectAll("tr").remove();
    lDataFiltered = data;

    console.log("Criterias:");
    console.log("Country");
    console.log(lCountryCriteria);
    console.log("State");
    console.log(lStateCriteria);
    console.log("City");
    console.log(lCityCriteria);
    console.log("Shape");
    console.log(lShapeCriteria);
    
    
    // We get tue values of the dates
    var dateFirst = d3.select("#inputDateStart").property("value");
    var dateLast = d3.select("#inputDateFinal").property("value");
    
    
    if ( dateFirst !== ""){
      lDateCriteria[0] = dateFirst;
    }
    else{
      lDateCriteria[0] = "1/1/2010";
    }

    if ( dateLast !== ""){
      lDateCriteria[1] = dateLast;
    }
    else{
      lDateCriteria[1] = "1/13/2010";
    }

    if ( new Date(dateFirst) > new Date(dateLast) ){
      var temp = lDateCriteria[0];
      lDateCriteria[0] = lDateCriteria[1];
      lDateCriteria[1] = temp;
    }

    console.log("DateFirst = " + lDateCriteria[0]);
    console.log("DateLast = " + lDateCriteria[1]);
    
    // Use D3 to set the table class to `table table-striped`
    table.attr("class", "table table-striped");

    // We create heads to table
    var row = tbody.append("tr");
    lMyHeads.forEach( head => {
        row.append("td")
          .style("font-weight", "bold")
          .text(head);
    });
    
    if ( lDateCriteria.length > 0  ) {
        lDataFiltered = lDataFiltered.filter( item => ( new Date(item.datetime) >= new Date(lDateCriteria[0]) ) &&
                                            ( new Date(item.datetime) <= new Date(lDateCriteria[1]) ) );
        console.log("Datetime");
    }
    if( lStateCriteria.length > 0 ) {
        lDataFiltered = lDataFiltered.filter( item => lStateCriteria.includes(item.state) ); 
        console.log("State");
    }
    if ( lShapeCriteria.length > 0 ) {
        lDataFiltered = lDataFiltered.filter( item => lShapeCriteria.includes(item.shape) ); 
        console.log("Shape");
    }
    if ( lCityCriteria.length > 0 ) {
        lDataFiltered = lDataFiltered.filter( item => lCityCriteria.includes(item.city) ); 
        console.log("City");
    }
    if ( lCountryCriteria.length > 0 ) {
        lDataFiltered = lDataFiltered.filter( item => lCountryCriteria.includes(item.country) ); 
        console.log("Country");
    }

    // We filtered 
    lDataFiltered.forEach( (value) => {
      // Append one table row per record
      var row = tbody.append("tr");
      Object.entries(value).forEach( ([_,val]) => {
        row.append("td").text(val);
      } )
    });
});

txtComboCountry.on("change", function() {
    lCountryCriteria = [];
    if (this.value !== "- All -"){
        lCountryCriteria.push(this.value);
    
        lStateFiltered = ["- All -"];
        data.forEach( element => {
            if ( ( element.country === this.value ) && !(lStateFiltered.includes(element.state)) ){
                lStateFiltered.push(element.state)
            }
        });
        console.log( lStateFiltered );
        d3.select( "#inputState" ).selectAll("option").remove();
        
        lStateFiltered.forEach( element => {
          d3.select( "#inputState" )
              .append("option")
              .text(element);
        });
    }
});

txtComboState.on("change", function() {
  lStateCriteria = [];
  if(this.value !== "- All -"){
        lStateCriteria.push(this.value);
        lCityFiltered = ["- All -"];
        data.forEach( element => {
            if ( (element.state === this.value) && !(lCityFiltered.includes(element.city)) ){
              lCityFiltered.push(element.city);
            }
        });

        d3.select( "#inputCity" ).selectAll("option").remove();
        lCityFiltered.forEach( element => {
            d3.select( "#inputCity" )
                .append("option")
                .text(element);
          });
    }
});

txtComboCity.on("change", function() {
  lCityCriteria = [];
  if(this.value !== "- All -"){
      lCityCriteria.push(this.value);
  }
});

txtComboShape.on("change", function() {
  lShapeCriteria = [];
  if(this.value !== "- All -"){
      lShapeCriteria.push(this.value);
  }
});
