// Renders the info box of the passed in character.
/* Override this by using the addProperty, addBlock, addOrderedList, and/or
 * addUnorderedList functions.
 */
function render(char) {
    // Will render with label and as 'undefined' if fields don't exist.
    addProperty(char.name,"Name");
    addProperty(char.age,"Age");
    addProperty(char.species,"Species");
    addProperty(char.gender,"Gender");
    // Will only render if the fields do exist.
    if('height' in char) {
    	render_height(char.height);
    }
    if('weight' in char) {
    	render_weight(char.weight);
    }
    if('history' in char) {
    	addBlock(char.history, "History");
    }
    if('appearance' in char) {
    	addBlock(char.appearance, "Appearance");
    }
    if('personality' in char) {
    	addBlock(char.personality, "Personality");
    }
}

/* Given a height in the format: {unit: "", value: 0, abbrev: "", prop: ""}
 * prop (or proportional) is optional.
 * Formats as:
 * Height:
 *     [Unit1]: [Value] [abbrev]
 *     [Unit2]: [Value] [abbrev] (PropValue Proportionally)
 * Note: "inches" is treated specially, calculated from the inches, 
 * and is displayed as:
 *     Imperial: [Feet]'[Inches]" ([PropValue] Proportionally)
 * Second Note: "centimeters" is treated specially, converting the unit into
 * m (or km in addition if >= 100000 cm) if greater than 100 cm:
 *     Metric: [km] km [m] m [cm] cm
 */
function render_height(height) {
    // Anonymous function to get the special case of imperial heights.
    var get_imperial = function(inches) {
        inches /= 12;
        var feet = Math.floor(inches);
        inches = Math.round((inches - feet) * 12);

            return feet + "'" + inches + "\"";
    };

    var get_metric = function(centi) {
        var text = centi;
        if(centi > 100) {
            text = ""
            units = ['m','km'];
            centi *= 10;
            for(var i = Math.floor(Math.log(centi) / Math.log(1000)) - 1; i >= 0; i--) {
                value = centi / 1000;
                if(value < 1.0) break;
                if(i > 0) {
                    value = Math.floor(value);
                    centi -= value;
                }
                text += value + " " + units[i];
                if(i > 0) text += " ";
            }
        }
        else {
            text += " cm";
        }

        return text;
    }

    var div = document.createElement("DIV");
    var span = document.createElement("SPAN");
    span.className = "label";
    span.appendChild(document.createTextNode("Height:"));
    div.appendChild(span);
    var list = [];
    for(var i = 0; i < height.length; i++) {
        var value = height[i].value;
        var unit = height[i].unit.capitalizeFirst();
        // If unit is 'Inches', use 'Imperial' as the label and
        // omit the abbreviation.
        var label = "";
        var text = "";
        switch(unit) {
            case("Inches"):
                label += "Imperial";
                text += get_imperial(value);
                break;
            case("Centimeters"):
                label += "Metric";
                text += get_metric(value);
                break;
            default:
                label += unit;
                text += value + " " + height[i].abbrev;
                break;
        }
        // If it has a proportional height, add the info in paranetheses.
        if(height[i].hasOwnProperty('prop')) {
            text += " (";
            // If 'Inches', then omit the abbreviation.
            switch(unit) {
                case("Inches"):
                    text += get_imperial(height[i].prop);
                    break;
                case("Centimeters"):
                    text += get_metric(height[i].prop);
                    break;
                default:
                    text += height[i].prop + " " + height[i].abbrev;
                    break;
            }
            text += " Proportionally)";
        }
        list.push({name: label, value: text});
    }
    div.appendChild(addUnorderedList(list));
    document.getElementById("info").appendChild(div);
}

/* Given a weight in the format: {unit: "", value: 0, abbrev: "", prop: ""}
 * prop (or proportional) is optional.
 * Formats as:
 * Weight:
 *     [Unit1]: [Value] [abbrev]
 *     [Unit2]: [Value] [abbrev] (PropValue Proportionally)
 */
function render_weight(weight) {
    var div = document.createElement("DIV");
    var span = document.createElement("SPAN");
    span.className = "label";
    span.appendChild(document.createTextNode("Weight:"));
    div.appendChild(span);
    var list = [];
    for(var i = 0; i < weight.length; i++) {
        var unit = weight[i].unit.capitalizeFirst();
        var text = weight[i].value + " " + weight[i].abbrev;
        // If it has a proportional weight, add the info in paranetheses.
        if(weight[i].hasOwnProperty('prop')) {
            text += " " + weight[i].prop + " " + weight[i].abbrev + 
                " Proportionally)";
        }

        list.push({name: unit, value: text});
    }
    div.appendChild(addUnorderedList( list));
    document.getElementById("info").appendChild(div);
}

// Convenience method to capitalize the first letter.
String.prototype.capitalizeFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}