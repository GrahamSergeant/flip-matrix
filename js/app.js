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
      let cellMatrix = document.createElement("div");
      document.body.appendChild(cellMatrix);
      cellMatrix.classList.add("cell-matrix");
      let flipCell = document.createElement("div");
      cellMatrix.appendChild(flipCell);
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
      //
      flipCellInner.onclick = function(){
                                  console.log('clicked');
                                  if (!flipCellInner.classList.contains("rotate")){
                                    flipCellInner.classList.add("rotate");
                                    flipCellInner.classList.remove("rotate-back");
                                    console.log("rotate");
                                  } else {
                                    flipCellInner.classList.add("rotate-back");
                                    flipCellInner.classList.remove("rotate");
                                    console.log("rotate back");
                                  }
                                };
    }
  };
  controller.init();
})();
