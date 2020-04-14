/*
 *  Made by Oscar Freij on April 14 - 2020
 */

var dimX;
var dimY;

var finalCodeEXT;

// Creating elements
function CreateGrid()
{
    dimX = document.getElementById("width").value;
    dimY = document.getElementById("height").value;
    globalThis.dimX = dimX;
    globalThis.dimY = dimY;
    var display = document.createElement("div");
    display.className = "display";
    display.setAttribute("style","width: max-content; height: max-content; display: grid; grid-template-rows: repeat("+dimY+", 1fr); grid-template-columns: repeat("+dimX+", 1fr);");

    for (let indexY = 0; indexY < dimY; indexY++) {
        for (let indexX = 0; indexX < dimX; indexX++) {

            var led = document.createElement("button");
            led.setAttribute( "onClick", "ToggleLight("+indexX+","+indexY+")" );
            led.className = "led";
            led.id = (indexX+":"+indexY);
            display.appendChild(led);
            
        }
        
    }


    var bottomLine = document.getElementById("bottom"); 
    var displayNode = document.getElementById("bottom").parentNode;

    displayNode.insertBefore(display,bottomLine);
}

function RemoveGrid()
{
    var element = document.getElementsByClassName("display")[0];
    element.parentNode.removeChild(element);
}

function SaveGrid()
{
    if(dimY != null && dimX != null)
    {
        var finalCode = "";
        var frame = document.getElementById("frame").value;
    
        for (let indexY = 0; indexY < globalThis.dimY; indexY++) {
            for (let indexX = 0; indexX < globalThis.dimX; indexX++) {
    
                var led = document.getElementById(indexX+":"+indexY);
    
                
                if ( led.style.backgroundColor == "white")
                {
                    finalCode = finalCode.concat("display.pixel("+indexX+","+indexY+", color=0, blink=None, frame="+frame+")","\n");
                    //console.log("display.pixel("+indexX+","+indexY+", color=0, blink=None, frame=1)");
                }
                else
                {
                    finalCode = finalCode.concat("display.pixel("+indexX+","+indexY+", color=165, blink=None, frame="+frame+")","\n");
                    //console.log("display.pixel("+indexX+","+indexY+", color=165, blink=None, frame=1)");
                }
                
            }
    
            finalCode = finalCode.concat("\n");
            
        }
        
        finalCode = finalCode.concat("\n");
        finalCode = finalCode.concat("display.frame("+frame+",true)");
        //console.log("display.frame(1,true)");
        alert("Coded build completed!");
        document.getElementById("textOutput").innerText = finalCode;
        //console.log(finalCode);
        globalThis.finalCodeEXT = finalCode;
    }
    else
    {
        alert("No object to build code from.\nCreate a grid to build code!");
    }

}

function ToggleLight(X,Y)
{
    try
    {
        var led = document.getElementById(X+":"+Y);
    }
    catch (error)
    {
        console.error("Error: LED not found!");
        return;
    }

    if ( led.style.backgroundColor == "red")
    {
        led.style.backgroundColor = "white";
    }
    else
    {
        led.style.backgroundColor = "red";
    }

    return;
}


function copyStringToClipboard()
{
    if(finalCodeEXT != null)
    {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = finalCodeEXT;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
        alert("Code copied!");
    }
    else
    {
        alert("No code to copy!");
    }

} 
