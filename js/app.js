//todo:
//make pixel size = character size and compose matrix of pixels

(function(){
  let model = {
      init : function(characters){
                let spacing = 1;
                let characterWidth = 4;
                let lines = 1
                return ({
                  matrixWidth : characters * (characterWidth + spacing),
                  matrixHeight : (7 * lines)
        });
      },
      characterData : characterData()
  };
  
  let controller = {
    init : function(){
      let message = "ABC ABC ABC"
      let matrixSize = model.init(message.length);
      view.init(matrixSize);
      view.display(message)
    },
    getCharacterData : function(character){
      return model.characterData[character];
    }
  };
  
  let view = {
    flipCellMatrixArray : [],
    init : function(matrixSize){
      let cellSize = 20;
      //build out initial html for a cell matrix with each cell switch off
      let cellMatrix = document.createElement("table");
      document.body.appendChild(cellMatrix);
      cellMatrix.classList.add("cell-matrix");
      for (let row = 1; row <= matrixSize.matrixHeight; row++){
        let flipCellRowArray = [];
        let cellRow = document.createElement("tr");
        cellMatrix.appendChild(cellRow);
        for (let cell = 1; cell <= matrixSize.matrixWidth; cell++){
          let flipCell = document.createElement("td");
          cellRow.appendChild(flipCell);
          flipCell.classList.add("flip-cell");
          let flipCellInner = document.createElement("div");
          flipCell.appendChild(flipCellInner);
          flipCellInner.classList.add("flip-cell-inner");
          flipCellInner.classList.add("rotate"); //cell on/off
          let flipCellFront = document.createElement("div");
          flipCellInner.appendChild(flipCellFront);
          flipCellFront.classList.add("flip-cell-front");
          let cellSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          cellSVG.setAttribute("height", "" + cellSize);
          cellSVG.setAttribute("width", "" + cellSize);
          flipCellFront.appendChild(cellSVG);
          let svgCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
          svgCircle.setAttribute("cx", "" + (cellSize / 2));
          svgCircle.setAttribute("cy", "" + (cellSize / 2));
          svgCircle.setAttribute("r", "" + (cellSize / 2));
          svgCircle.setAttribute("fill", "white");
          cellSVG.appendChild(svgCircle);
          flipCellRowArray.push(flipCellInner);
        }
        this.flipCellMatrixArray.push(flipCellRowArray);
      }
    },
    //
    display : function(message, line){
      let space = " ";
      let spaceIndices = [];
      let index = message.indexOf(space);
      while (index != -1) {
          spaceIndices.push(index);
          index = message.indexOf(space, index + 1);
      }
      //draw charact starting at register - increment after each character is drawn to add kerning
      let register = 0;
      //iterate over each character in passed in message
      for (let character = 0; character < message.length; character++){
        let currentCharacter;
        //get character data stored in an array of row arrays of binary (1 = cell on/ 0 = cell off)
        if(spaceIndices.includes(character)){
          spaceIndices.shift();
          currentCharacter = controller.getCharacterData("space");
          console.log(currentCharacter);
        } else {
                  currentCharacter = controller.getCharacterData(message[character]);
                  console.log(currentCharacter);
        }
        //iterate over each row
        for (let row = 0; row < currentCharacter.length; row++){
          //iterate over each cell in each row
          for (let cell = 0; cell < currentCharacter[row].length; cell++){
            //switch cell off if 0 else switch on if 1
            if (currentCharacter[row][cell] === 0){
                this.flipCellMatrixArray[row][cell + register].classList.add("rotate");
                this.flipCellMatrixArray[row][cell + register].classList.remove("rotate-back");
            } else {
              this.flipCellMatrixArray[row][cell + register].classList.add("rotate-back");
              this.flipCellMatrixArray[row][cell + register].classList.remove("rotate");
            }
          }
        }
        //move register
        register = register + 4;
        //add kerning
        for (let i = 0; i < 7; i++ ){
          this.flipCellMatrixArray[i][register].classList.add("rotate");
        }
        //move register after kerning
        register++;
      }
      
    }
  };
  controller.init();
})();