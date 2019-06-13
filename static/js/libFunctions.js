
function first(){
    // Iterate through each UFO information in the table
    data.forEach( item  => {  
    // append each value of column (datetime, city, state,...) per each row
    Object.entries(item).forEach( ([myKey, value]) => { 
      if (myKey === 'city' && !(lCity.includes(value)) ){
          lCity.push(value);
      }
      if (myKey === 'state' && !(lStates.includes(value)) ){
          lStates.push(value);
      }
      if (myKey === 'shape' && !(lShapes.includes(value)) ){
          lShapes.push(value);
      }
      if (myKey === 'datetime' && !(lDates.includes(value)) ){
        lDates.push(value);
      }
      if (myKey === 'country' && !(lCountries.includes(value)) ){
        lCountries.push(value);
      }   
    });
    });

    // We fill values into input-select for each country, state, city; etc

    // lstrInputs= names for 'id's for each input-select box into html file
    lstrInputs = ["#inputCountry", "#inputState", "#inputCity", "#inputShape"];
    // lInputs: list of the valid enters for the filters
    lInputs = [lCountries, lStates, lCity, lShapes];
    
    lInputs.forEach( (ctnInput, i) => {
        d3.select( lstrInputs[i] ).append("option").text( "- All -" );
        ctnInput.forEach( element => {
            d3.select( lstrInputs[i] )
                .append("option")
                .text( element );
        });
    });



}

