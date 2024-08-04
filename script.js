document.addEventListener("DOMContentLoaded", () => {

    let cellObj = {};
    const fonts = {
        "Default...": "Arial, Helvetica, sans-serif",
        "Arial": "Arial, Helvetica, sans-serif",
        "Arial Black": "Arial Black, Gadget, sans-serif",
        "Times New Roman": "Times New Roman, Times, serif",
        "Courier": "Courier, monospace",
        "calibri": "calibri, sans-serif",
        "calibri body": "calibri body",
        "Algerian": "Algerian, sans-serif",
        "Verdana": "Verdana, Geneva, sans-serif",
        "Bahnschrift": "Bahnschrift, sans-serif",
        "Bahnschrift Condensed": "Bahnschrift Condensed, sans-serif",
        "Georgia": "Georgia, serif",
        "Garamond": "Garamond, serif",
        "Palatino": "Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, Georgia, serif",
        "Impact": "Impact, Charcoal, sans-serif",
        "Tahoma": "Tahoma, Geneva, sans-serif",
        "Berlin Sans FB": "Berlin Sans FB, sans-serif",
        "Berlin Sans FB Demi": "Berlin Sans FB Demi, sans-serif",
        "Playwrite ES Deco": "Playwrite ES Deco, cursive",
        "Oswald": "Oswald, sans-serif",
        "Brush Script MT": "Brush Script MT, cursive",
        "Trebuchet MS": "Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
        "Lucida Console": "Lucida Console, Monaco, monospace",
        "Courier New": "Courier New, Courier, monospace",
        "Monaco": "Monaco, monospace",
        "Consolas": "Consolas, monaco, monospace",
        "Roboto": "Roboto, sans-serif",
        "Noto Sans": "Noto Sans, sans-serif",
        "Open Sans": "Open Sans, sans-serif",
        "Lato": "Lato, sans-serif",
        "Raleway": "Raleway, sans-serif",
        "PT Sans": "PT Sans, sans-serif",
        "PT Serif": "PT Serif, serif",
        "Ubuntu": "Ubuntu, sans-serif",
        "Roboto Mono": "Roboto Mono, monospace",
        "Inconsolata": "Inconsolata, monospace"
    };



    let container = document.getElementById("container");

    let collectionOfCells = new Set();
    let selectedRow = new Set();
    let selectedColumn = new Set();

    for (let i = 0; i <= 26; i++) {
        let columnHeader = document.createElement("div");
        columnHeader.className = i == 0 ? "slno stk" : "cell-header sticky";
        columnHeader.innerText = i == 0 ? " " : String.fromCharCode(64 + i);
        container.append(columnHeader);
    }

    for (let row = 1; row <= 30; row++) {
        let rowHeader = document.createElement("div");
        rowHeader.className = `slno sticky2 row${row}`;
        container.append(rowHeader);

        for (let col = 1; col <= 26; col++) {
            let cell = document.createElement("div");
            cell.className = `cell ${String.fromCharCode(64 + col)} row${row}`;
            cell.style.textWrap = "true";
            cell.name = String.fromCharCode(64 + col) + row;
            cell.id = String.fromCharCode(64 + col) + row;
            container.append(cell);
        }
    }

    const add = document.getElementById("add-cell");

    add.addEventListener("click", () => {
        let container = document.getElementById("container");
        let numberOfCells = document.getElementById("add-cell-no").value;

        let rows = document.querySelectorAll(".sticky2");

        for (let row = 1; row <= numberOfCells; row++) {
            let rowHeader = document.createElement("div");
            rowHeader.className = `slno sticky2 row${row}`;
            container.append(rowHeader);

            for (let col = 1; col <= 26; col++) {

                let cell = document.createElement("div");
                cell.className = `cell  ${String.fromCharCode(64 + col)} row${rows.length + row}`;
                cell.style.textWrap = "true";
                cell.name = String.fromCharCode(64 + col) + `${rows.length + row}`;
                cell.id = String.fromCharCode(64 + col) + `${rows.length + row}`;
                container.append(cell);
            }
        }
        selectedColumnSetClear();
        selectedRowSetClear();
        rowsNumber();
        cellManupulation();
    })
    rowsNumber();
    function rowsNumber() {
        let rows = document.querySelectorAll(".sticky2");

        for (let i = 0; i < rows.length; i++) {
            rows[i].innerText = i + 1;
        }

    }

    // font colors
    const fontColorIcon = document.querySelector("#font-color-icon");
    const fontColorInput = document.getElementById('font-color');

    fontColorIcon.addEventListener('click', () => {
        fontColorInput.click();
    });

    fontColorInput.addEventListener('change', () => {
        let useColor = fontColorInput.value;
        let currID = window.localStorage.getItem("cellID");
        let currentCell = document.getElementById(currID);

        currentCell.style.color = useColor;

        collectionOfCells.forEach((cell) => {
            cell.style.color = useColor;
        });
    });

    //background color
    const fontColorIcon2 = document.querySelector(".font-color-icon2");
    const fontColorInput2 = document.querySelector(".font-color2");

    fontColorIcon2.addEventListener('click', () => {
        fontColorInput2.click();
    });


    fontColorInput2.addEventListener('change', () => {
        let useColor = fontColorInput2.value;
        let currID = window.localStorage.getItem("cellID");
        let currentCell = document.getElementById(currID);

        currentCell.style.backgroundColor = useColor;
        collectionOfCells.forEach((cell) => {
            cell.style.backgroundColor = useColor;
        });
    });


    function cellManupulation() {
        let cellName = document.getElementById("cell-name");

        cellName.addEventListener("click", () => {
            cellName.contentEditable = "true";
        })

        cellName.addEventListener("focusout", () => {
            cellName.contentEditable = "false";
            let cell = document.getElementById(cellName.innerText);
            cell.classList.add("singleSelectedCell");
            window.localStorage.setItem("cellID", cell.id);
        });

        cellName.addEventListener("keydown", (event) => {
            if (event.key === 'Enter') {
                collectionOfCells.forEach((cell) => {
                    cell.classList.remove("singleSelectedCell");
                    cell.classList.remove("multiSelectedCell");
                });
                collectionOfCells.clear();
                cellName.contentEditable = "false";
                let cellID = cellName.textContent.toUpperCase();
                let cell = document.getElementById(cellID);
                cell.classList.add("singleSelectedCell");
                cell.innerHTML = ``;
                cell.focus();
                collectionOfCells.add(cell);
                window.localStorage.setItem("cellID", cell.id);
            }
        });

        let AllCells = document.querySelectorAll(".cell");
        let copycollectionsOfCells = new Set();

        AllCells.forEach((cell) => {

            let editContent = false;
            cell.addEventListener("dblclick", () => {
                editContent = true;
                cell.contentEditable = "true";
                cell.focus();
            });

            cell.addEventListener("click", selectedCell);

            cell.addEventListener("mousedown", (event) => {
                copycollectionsOfCells.clear();
                if (!event.ctrlKey && !event.metakey) {

                    collectionOfCells.forEach((cell) => {
                        cell.classList.remove("multiSelectedCell");
                        cell.style.border = "1px solid rgb(173, 167, 167)";
                    })


                    event.preventDefault();
                    let selCel = event.target;
                    let selcelId = selCel.id;

                    let col = selcelId.charCodeAt(0);
                    let row = parseInt(selcelId.slice(1));

                    window.localStorage.setItem("cellcollection", "true");

                    let multiSelectedCell = document.querySelectorAll(".multiSelectedCell");
                    multiSelectedCell.forEach((cell) => {
                        cell.classList.remove("multiSelectedCell");
                    });
                    window.localStorage.setItem("col", col);
                    window.localStorage.setItem("row", row);

                }

                for (let t in cellObj) {
                    let cellId = t;
                    let cell = document.getElementById(cellId);
                    if (cell) {
                        let borders = cellObj[cellId];
                        cell.style.borderTop = borders['top'];
                        cell.style.borderLeft = borders['left'];
                        cell.style.borderRight = borders['right'];
                        cell.style.borderBottom = borders['bottom'];
                    }
                }

            });

            cell.addEventListener('mouseenter', (event) => {
                event.preventDefault();
                if (!event.ctrlKey && !event.metakey) {

                    let getCellCollection = window.localStorage.getItem("cellcollection");
                    if (getCellCollection === "true") {
                        let selCel = event.target;
                        let selcelId = selCel.id;
                        let colen = selcelId.charCodeAt(0);
                        let rowen = parseInt(selcelId.slice(1));
                        let colst = window.localStorage.getItem("col");
                        let rowst = window.localStorage.getItem("row");
                        collectionOfCells.forEach((cell) => {
                            cell.classList.remove("multiSelectedCell");
                            cell.style.border = "1px solid rgb(173, 167, 167)";
                        })
                        collectionOfCells.clear();
                            
                        for (let i = colst; i <= colen; i++) {

                            for (let j = rowst; j <= rowen; j++) {


                                let col = String.fromCharCode(i);

                                let row = String(j);
                                let cellId = col + row;
                                let cell = document.getElementById(cellId);
                                copycollectionsOfCells.add(cellId);
                                if (j == rowst) {
                                    cell.style.borderTop = "2px dashed #4286e6";
                                    if (i == colst) {
                                        cell.style.borderLeft = "2px dashed #4286e6";
                                    }
                                    if (i == colen) {
                                        cell.style.borderRight = "2px dashed #4286e6";
                                    }
                                }
                                else if (j == rowen) {
                                    cell.style.borderBottom = "2px dashed #4286e6";
                                    if (i == colst) {
                                        cell.style.borderLeft = "2px dashed #4286e6";
                                    }
                                    if (i == colen) {
                                        cell.style.borderRight = "2px dashed #4286e6";
                                    }
                                }
                                else if (colen == colst) {
                                    cell.style.borderRight = "2px dashed #4286e6";
                                    cell.style.borderLeft = "2px dashed #4286e6";
                                }
                                else if (i == colst) {
                                    cell.style.borderLeft = "2px dashed #4286e6";
                                }
                                else if (i == colen) {
                                    cell.style.borderRight = "2px dashed #4286e6";
                                }

                                if (cell.classList.contains("singleSelectedCell")) {
                                    cell.classList.remove("singleSelectedCell");
                                    cell.classList.add("multiSelectedCell");
                                    collectionOfCells.add(cell);
                                }
                                else {
                                    cell.classList.add("multiSelectedCell");
                                    collectionOfCells.add(cell);
                                }

                                if(rowst==rowen){
                                    cell.style.borderBottom = "2px dashed #4286e6";
                                }
                            }
                        }
                    }


                }
            });

            cell.addEventListener("mouseup", (event) => {
                if (!event.ctrlKey && !event.metaKey) {
                    event.preventDefault();
                    if (window.localStorage.getItem("cellcollection") === "true") {
                        if (!event.target.classList.contains("multiSelectedCell")) {
                            event.target.classList.add("multiSelectedCell");
                        }

                        window.localStorage.setItem("cellcollection", "false");
                        window.localStorage.removeItem("col");
                        window.localStorage.removeItem("row");
                    }
                }

                collectionOfCells.forEach((cell) => {
                    copycollectionsOfCells.add(cell);
                });
                console.log(copycollectionsOfCells);
            });

            cell.addEventListener("keydown", (event) => {
                
                if (event.key === 'Delete') {
                    event.preventDefault();
                    let currCell = event.target;
                    currCell.innerText = '';
                    copycollectionsOfCells.forEach((cellId) => {
                        let cell = document.getElementById(cellId);
                        if (cell) {
                            cell.innerText = '';
                        }
                    });
                }
            });
        });

        function selectedCell(event) {

            let selCel = event.target;
            cellName.innerText = selCel.name;
           console.log(selCel);
            let range = document.createRange();
            let selection = window.getSelection();

            // Focus on the cell
            selCel.focus();

            // Move cursor to the end of the text
            range.selectNodeContents(selCel);
            range.collapse(false); // Collapse to end
            selection.removeAllRanges();
            selection.addRange(range);
           
            if (selectedRow.size > 0) {
                selectedRowSetClear();
            }
            if (selectedColumn.size > 0) {
                selectedColumnSetClear();
            }
            let prevID = window.localStorage.getItem("cellID");
            if (prevID != null) {
                let prevCell = document.getElementById(prevID);

                if (prevCell) {
                    prevCell.classList.remove("singleSelectedCell");
                    prevCell.contentEditable = "false";
                }
                window.localStorage.removeItem("cellID");
            }


            window.localStorage.setItem("cellID", selCel.id);


            let currID = window.localStorage.getItem("cellID");
            let currentCell = document.getElementById(currID);


            if (currentCell) {
                currentCell.classList.add("singleSelectedCell");
            }


            if (!event.ctrlKey && !event.metaKey) {
                collectionOfCells.forEach((cell) => {
                    cell.classList.remove("multiSelectedCell");
                });
                collectionOfCells.clear();
                collectionOfCells.add(selCel);
            } else {
                if (collectionOfCells.has(selCel)) {
                    selCel.classList.remove("multiSelectedCell");
                    collectionOfCells.delete(selCel);
                } else {
                    collectionOfCells.add(selCel);
                    collectionOfCells.forEach((cell) => {
                        cell.classList.remove("singleSelectedCell");
                        cell.classList.add("multiSelectedCell");
                    });
                }
            }
        }


    }


    // chenge font family

    let fontFamily = document.getElementById("text-fonts");

    for (let t in fonts) {
        let option = document.createElement("option");
        option.classList.add("tft");
        option.style.fontFamily = fonts[t];
        option.value = t;
        option.innerText = t;
        fontFamily.appendChild(option);
    }

    fontFamily.addEventListener("change", (event) => {
        let TextFont = fontFamily.value;
        let textFamily = fonts[TextFont];
        let currCell = window.localStorage.getItem("cellID");
        let currentCell = document.getElementById(currCell);
        currentCell.style.fontFamily = textFamily;

        collectionOfCells.forEach((cell) => {
            cell.style.fontFamily = textFamily;
        })
    });

    // font weight and font style
    let Bold = document.getElementById("bold");
    let Italic = document.getElementById("italic");
    let Underline = document.getElementById("underline");



    Bold.addEventListener("click", (event) => {
        collectionOfCells.forEach((cell) => {
            if (cell.style.fontWeight == "bold") {
                cell.style.fontWeight = "normal";
            }
            else {
                cell.style.fontWeight = "bold";
            }
        });
    });



    Italic.addEventListener("click", () => {
        collectionOfCells.forEach((cell) => {
            if (cell.style.fontStyle == "italic") {
                cell.style.fontStyle = "normal";
            }
            else {
                cell.style.fontStyle = "italic";
            }
        });
    });


    Underline.addEventListener("click", () => {
        collectionOfCells.forEach((cell) => {
            if (cell.style.textDecoration == "underline") {
                cell.style.textDecoration = "none";
            }
            else {
                cell.style.textDecoration = "underline";
            }
        });
    });

    // font size
    const plus = document.getElementById("plus");
    const minus = document.getElementById("minus");
    let fontInput = document.getElementById("font-size-input");

    plus.addEventListener("click", () => {
        fontInput.value = parseInt(fontInput.value) + 1;
        updateFontSize();
    });

    minus.addEventListener("click", () => {
        if (parseInt(fontInput.value) > 1) {
            fontInput.value = parseInt(fontInput.value) - 1;
        }
        updateFontSize();
    });

    fontInput.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            updateFontSize();
        }
    });
    function updateFontSize() {
        let currCell = window.localStorage.getItem("cellID");
        let currentCell = document.getElementById(currCell);

        currentCell.style.fontSize = parseInt(fontInput.value) + "px";

        collectionOfCells.forEach((cell) => {
            cell.style.fontSize = parseInt(fontInput.value) + "px";
        })
    }


    // text align
    const left = document.getElementById("left");
    const center = document.getElementById("center");
    const right = document.getElementById("right");
    const justify = document.getElementById("justify");
    const top = document.getElementById("top");
    const middle = document.getElementById("middle");
    const bottom = document.getElementById("bottom");

    left.addEventListener("click", () => updateTextAlign("left"));
    center.addEventListener("click", () => updateTextAlign("center"));
    right.addEventListener("click", () => updateTextAlign("right"));
    justify.addEventListener("click", () => updateTextAlign("justify"));
    function updateTextAlign(alignType) {

        collectionOfCells.forEach((cell) => {
            cell.style.textAlign = alignType;
        });
    }

    top.addEventListener("click", () => updateVerticalAlign("flex-start"));
    middle.addEventListener("click", () => updateVerticalAlign("center"));
    bottom.addEventListener("click", () => updateVerticalAlign("flex-end"));

    function updateVerticalAlign(alignType) {
        let currCell = window.localStorage.getItem("cellID");

        collectionOfCells.forEach((cell) => {
            cell.style.justifyContent = alignType;
        });
    }

    // text caseing
    let textCase = document.getElementById("case");
    
    textCase.addEventListener("change", (event) => {
        let useCase = textCase.value;

        collectionOfCells.forEach((cell) => {
            cell.contentEditable = "true";
            let txt = cell.innerText;

            switch (useCase) {
                case "upper":
                    txt = txt.toUpperCase();
                    break;
                case "lower":
                    txt = txt.toLowerCase();
                    break;
                case "capitalize":
                    let words = txt.split(" ");
                    for (let i = 0; i < words.length; i++) {
                        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
                    }
                    txt = words.join(" ");
                    break;
                case "sentence":
                    txt = txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
                    for (let i = 1; i < txt.length; i++) {
                        if (txt.charAt(i - 1) === " " && txt.charAt(i) >= 'a' && txt.charAt(i) <= 'z' &&
                            txt.charAt(i) == 'i' && (txt.charAt(i + 1) === " " || txt.charAt(i + 1) === "")) {
                            txt = txt.slice(0, i) + txt.charAt(i).toUpperCase() + txt.slice(i + 1);
                        }
                    }
                    break;
                default:
                    break;
            }
            cell.innerText = txt;
        });

        textCase.value = "Normal";
    });


   // sorting
const sortNum = document.getElementById("sortNum");
const sort=document.getElementById("sort");

sortNum.addEventListener("click", () => {
    // Convert collectionOfCells to an array if it's not already
    let cellsArray = Array.from(collectionOfCells);

    for(let i=0;i<cellsArray.length;i++){
        let flag=false;
        for(let j=1;j<cellsArray.length-i;j++){

            let value1=cellsArray[j].innerText;
            let value2=cellsArray[j-1].innerText;
            let compValue1="";
            let compValue2="";

            for(let y=0;y<value1.length;y++){
                compValue1+=value1.charCodeAt(y);

            }
            for(let y=0;y<value2.length;y++){
                compValue2+=value2.charCodeAt(y);
            }

            if(parseInt(compValue1) < parseInt(compValue2)){
                let rid1=cellsArray[j].id;
                let rid2=cellsArray[j-1].id;

                let rclass1=`row${rid1.slice(1)}`
                let rclass2=`row${rid2.slice(1)}`

                let row1= document.querySelectorAll(`.${rclass1}`);
                let row2= document.querySelectorAll(`.${rclass2}`);
                
                for(let k=0;k<row1.length;k++){
                    let temp=row1[k].innerText;
                    row1[k].innerText=row2[k].innerText;
                    row2[k].innerText=temp;
                }
                flag=true;
            }
            
        }
        if(!flag) break;
    }
    
    rowsNumber();
});

sort.addEventListener("click", () => {
    // Convert collectionOfCells to an array if it's not already
    let cellsArray = Array.from(collectionOfCells);

    for(let i=0;i<cellsArray.length;i++){
        let flag=false;
        for(let j=1;j<cellsArray.length-i;j++){

            let value1=cellsArray[j].innerText;
            let value2=cellsArray[j-1].innerText;

            if(value1 < value2){
                let rid1=cellsArray[j].id;
                let rid2=cellsArray[j-1].id;

                let rclass1=`row${rid1.slice(1)}`
                let rclass2=`row${rid2.slice(1)}`

                let row1= document.querySelectorAll(`.${rclass1}`);
                let row2= document.querySelectorAll(`.${rclass2}`);
                
                for(let k=0;k<row1.length;k++){
                    let temp=row1[k].innerText;
                    row1[k].innerText=row2[k].innerText;
                    row2[k].innerText=temp;
                }
                flag=true;
            }
            
        }
        if(!flag) break;
    }
    
    rowsNumber();
});


    // border
    const borderColor = document.getElementById("border-color");
    const borderSelect = document.getElementById("borders");
    const borderSize = document.getElementById("border-size-input");

    let borderSizeInput = "1px";
    borderSize.addEventListener("change", () => {
        borderSizeInput = `${borderSize.value}px`;
    });

    window.localStorage.setItem("borderColor", "black");

    borderColor.addEventListener("change", () => {
        window.localStorage.setItem("borderColor", borderColor.value);

    });

    borderSelect.addEventListener("change", () => {
        let currCell = window.localStorage.getItem("cellID");
        let currentCell = document.getElementById(currCell);


        const selectedBorderColor = window.localStorage.getItem("borderColor") || "rgb(173, 167, 167)";

        switch (borderSelect.value) {
            case "none":
                currentCell.style.border = "1px solid rgb(173, 167, 167)";
                collectionOfCells.forEach((cell) => {
                    cell.style.border = "1px solid rgb(173, 167, 167)";
                });
                break;
            case "top":
                currentCell.style.borderTop = `${borderSizeInput} solid ${selectedBorderColor}`;
                currentCell.style.borderLeft = "1px solid rgb(173, 167, 167)";
                currentCell.style.borderRight = "1px solid rgb(173, 167, 167)";
                currentCell.style.borderBottom = "1px solid rgb(173, 167, 167)";

                collectionOfCells.forEach((cell) => {
                    cell.style.borderTop = `${borderSizeInput} solid ${selectedBorderColor}`;
                    cell.style.borderLeft = "1px solid rgb(173, 167, 167)";
                    cell.style.borderRight = "1px solid rgb(173, 167, 167)";
                    cell.style.borderBottom = "1px solid rgb(173, 167, 167)";
                });
                break;
            case "bottom":
                currentCell.style.borderTop = "1px solid rgb(173, 167, 167)";
                currentCell.style.borderLeft = "1px solid rgb(173, 167, 167)";
                currentCell.style.borderRight = "1px solid rgb(173, 167, 167)";
                currentCell.style.borderBottom = `${borderSizeInput} solid ${selectedBorderColor}`;

                collectionOfCells.forEach((cell) => {
                    cell.style.borderTop = "1px solid rgb(173, 167, 167)";
                    cell.style.borderLeft = "1px solid rgb(173, 167, 167)";
                    cell.style.borderRight = "1px solid rgb(173, 167, 167)";
                    cell.style.borderBottom = `${borderSizeInput} solid ${selectedBorderColor}`;
                });
                break;
            case "left":
                currentCell.style.borderTop = "1px solid rgb(173, 167, 167)";
                currentCell.style.borderLeft = `${borderSizeInput} solid ${selectedBorderColor}`;
                currentCell.style.borderRight = "1px solid rgb(173, 167, 167)";
                currentCell.style.borderBottom = "1px solid rgb(173, 167, 167)";

                collectionOfCells.forEach((cell) => {
                    cell.style.borderTop = "1px solid rgb(173, 167, 167)";
                    cell.style.borderLeft = `${borderSizeInput} solid ${selectedBorderColor}`;
                    cell.style.borderRight = "1px solid rgb(173, 167, 167)";
                    cell.style.borderBottom = "1px solid rgb(173, 167, 167)";
                });
                break;
            case "right":
                currentCell.style.borderTop = "1px solid rgb(173, 167, 167)";
                currentCell.style.borderLeft = "1px solid rgb(173, 167, 167)";
                currentCell.style.borderRight = `${borderSizeInput} solid ${selectedBorderColor}`;
                currentCell.style.borderBottom = "1px solid rgb(173, 167, 167)";

                collectionOfCells.forEach((cell) => {
                    cell.style.borderTop = "1px solid rgb(173, 167, 167)";
                    cell.style.borderLeft = "1px solid rgb(173, 167, 167)";
                    cell.style.borderRight = `${borderSizeInput} solid ${selectedBorderColor}`;
                    cell.style.borderBottom = "1px solid rgb(173, 167, 167)";
                });
                break;
            case "all":
                currentCell.style.borderTop = `${borderSizeInput} solid ${selectedBorderColor}`;
                currentCell.style.borderBottom = `${borderSizeInput} solid ${selectedBorderColor}`;
                currentCell.style.borderLeft = `${borderSizeInput} solid ${selectedBorderColor}`;
                currentCell.style.borderRight = `${borderSizeInput} solid ${selectedBorderColor}`;
                collectionOfCells.forEach((cell) => {
                    cell.style.borderTop = `${borderSizeInput} solid ${selectedBorderColor}`;
                    cell.style.borderBottom = `${borderSizeInput} solid ${selectedBorderColor}`;
                    cell.style.borderLeft = `${borderSizeInput} solid ${selectedBorderColor}`;
                    cell.style.borderRight = `${borderSizeInput} solid ${selectedBorderColor}`;
                });

                break;
        }
        borderSelect.value = "Border";

        collectionOfCells.forEach((cell) => {
            if (cellObj.hasOwnProperty(cell.id)) { // Check if cellObj already has the key
                cellObj[cell.id] = { // Correct syntax for updating an object property
                    top: cell.style.borderTop,
                    right: cell.style.borderRight,
                    bottom: cell.style.borderBottom,
                    left: cell.style.borderLeft,
                    all: cell.style.border
                };
            } else {
                cellObj = {
                    ...cellObj,
                    [cell.id]: {
                        top: cell.style.borderTop,
                        right: cell.style.borderRight,
                        bottom: cell.style.borderBottom,
                        left: cell.style.borderLeft,
                        all: cell.style.border
                    }
                };
            }
        });

    });

    let AllRows = document.querySelectorAll(".sticky2");

    function selectedRowSetClear() {
        selectedRow.forEach((cell) => {
            if (cell.classList.contains("sticky2")) {
                cell.style.backgroundColor = "white";
                cell.style.border = "2px solid rgb(223, 213, 213)";
            }
            else {
                cell.style.backgroundColor = "white";
                cell.style.borderTop = "1px solid rgb(173, 167, 167)";
                cell.style.borderBottom = "1px solid rgb(173, 167, 167)";
                cell.style.borderLeft = "1px solid rgb(173, 167, 167)";
                cell.style.borderRight = "1px solid rgb(173, 167, 167)";
            }

        })
        selectedRow.clear();
    }


    AllRows.forEach((row) => {
        row.addEventListener("click", (event) => {
            selectedColumnSetClear();
            let rowHead = event.target;
            let classRow = rowHead.innerText;
            let AllRowCells = document.querySelectorAll(`.row${classRow}`);

            if (selectedRow.size > 0) {
                selectedRowSetClear();

            }

            selectedRow.add(rowHead);
            rowHead.style.backgroundColor = "#c2d9f9";
            rowHead.style.border = "2px solid #4286e6";

            AllRowCells.forEach((cell) => {
                selectedRow.add(cell);
                cell.style.backgroundColor = "#c2d9f9";
                cell.style.borderTop = "2px solid #4286e6";
                cell.style.borderBottom = "2px solid #4286e6";
            });
        });
    });

    let AllColumns = document.querySelectorAll(".cell-header");

    function selectedColumnSetClear() {
        selectedColumn.forEach((cell) => {
            cell.style.backgroundColor = "white";
            cell.style.borderTop = "1px solid rgb(173, 167, 167)";
            cell.style.borderBottom = "1px solid rgb(173, 167, 167)";
            cell.style.borderLeft = "1px solid rgb(173, 167, 167)";
            cell.style.borderRight = "1px solid rgb(173, 167, 167)";
        });
    }

    AllColumns.forEach((column) => {
        column.addEventListener("click", (event) => {
            selectedRowSetClear()
            let colHead = event.target;
            let classCol = colHead.innerText;
            let AllColCells = document.querySelectorAll(`.${classCol}`);

            if (selectedColumn.size > 0) {
                selectedColumnSetClear();
            }

            AllColCells.forEach((cell) => {
                selectedColumn.add(cell);
                cell.style.backgroundColor = "#c2d9f9";
                cell.style.borderLeft = "2px solid #4286e6";
                cell.style.borderRight = "2px solid #4286e6";
            });
        });
    })
    document.body.addEventListener("keydown", (event) => {
        if (event.key === "Delete") {
            selectedRow.forEach((cell) => {
                cell.remove();
            });
            selectedColumn.forEach((cell) => {
                cell.textContent = "";
            });
            selectedRow.clear();
            selectedColumnSetClear();
            rowsNumber();
        }
    });

    cellManupulation();
})



