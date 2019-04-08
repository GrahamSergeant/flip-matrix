(function(){
  let model = {
      init : function(){
        return ({
          matrixWidth : 5,
          matrixHeight : 7
        });
      }
  };
  
  let controller = {
    init : function(){
      let matrixSize = model.init();
      view.init(matrixSize);
    }
  };
  
  let view = {
    init : function(matrixSize){
      let cellMatrix = document.createElement("table");
      document.body.appendChild(cellMatrix);
      cellMatrix.classList.add("cell-matrix");
      let flipCellMatrixArray = [];
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
          let flipCellFront = document.createElement("div");
          flipCellInner.appendChild(flipCellFront);
          flipCellFront.classList.add("flip-cell-front");
          let cellSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          cellSVG.setAttribute("height", "100%");
          cellSVG.setAttribute("width", "100%");
          flipCellFront.appendChild(cellSVG);
          let svgCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
          svgCircle.setAttribute("cx", "50");
          svgCircle.setAttribute("cy", "50");
          svgCircle.setAttribute("r", "50");
          svgCircle.setAttribute("fill", "white");
          cellSVG.appendChild(svgCircle);
          flipCellRowArray.push(flipCellInner);
        }
        flipCellMatrixArray.push(flipCellRowArray);
      }
      //
      flipCellMatrixArray.forEach(function(flipCellRowArray){
        flipCellRowArray.forEach(function(flipCell){
          flipCell.onclick = function(){
                                  console.log('clicked');
                                  if (!flipCell.classList.contains("rotate")){
                                    flipCell.classList.add("rotate");
                                    flipCell.classList.remove("rotate-back");
                                    console.log("rotate");
                                  } else {
                                    flipCell.classList.add("rotate-back");
                                    flipCell.classList.remove("rotate");
                                    console.log("rotate back");
                                  }
                                };
        });
      });
    
    }
  };
  controller.init();
})();
