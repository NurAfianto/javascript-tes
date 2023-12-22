'use strict';

function LayupDrawer() {
    /**
     * Canvas element
     */
    this.canvas = null;
}

LayupDrawer.prototype = {
    /**
     * Configure the canvas
     *
     * @param {HTMLCanvasElement} canvas  Canvas element
     */
    init : function (canvas) {
      this.canvas = canvas;
    },

    /**
     * Draw a layup configuration on the canvas
     *
     * @param {Object} layup Layup object structure
     * @param {Number} length Layup length in mm
     */
    drawLayup : function (layup, length) {
        let canvas = this.canvas;
        let ctx = canvas.getContext('2d');

        let imgAngle0 = new Image();
        let imgAngle90 = new Image();

        // TIER 1 
        let layer1Thickness = layup.t1.thickness;
        let positionTier1Y = 0;
        // TIER 3 
        let layer3Thickness = layup.t3.thickness;
        let positionTier3Y = layup.t1.thickness + layup.t2.thickness;
        // TIER 5
        let layer5Thickness = layup.t5.thickness;
        let positionTier5Y = layup.t1.thickness + layup.t2.thickness + layup.t3.thickness + layup.t4.thickness;
        imgAngle0.onload = function(){
            // DRAW TIER 1
            ctx.drawImage(imgAngle0, 0, positionTier1Y, canvas.width, layer1Thickness);
            // DRAW TIER 3
            ctx.drawImage(imgAngle0, 0, positionTier3Y, canvas.width, layer3Thickness);
            // DRAW TIER 5
            ctx.drawImage(imgAngle0, 0, positionTier5Y, canvas.width, layer5Thickness);
        };

        // TIER 2
        let layer2Thickness = layup.t2.thickness;
        let positionTier2Y = layup.t1.thickness;
        // TIER 4 
        let layer4Thickness = layup.t4.thickness;
        let positionTier4Y = layup.t1.thickness + layup.t2.thickness + layup.t3.thickness;
        imgAngle90.onload = function() {
            let widthHalfImage = imgAngle90.width / 2;
            let heightImage = imgAngle90.height;
            // DRAW IMAGE TIER 2
            ctx.drawImage(imgAngle90, widthHalfImage, 0, widthHalfImage, heightImage, 0, positionTier2Y, canvas.width/8, layer2Thickness);
            ctx.drawImage(imgAngle90, canvas.width/8 - 0.1, positionTier2Y, canvas.width/4, layer2Thickness);
            ctx.drawImage(imgAngle90, canvas.width/8 * 3 - 0.1, positionTier2Y, canvas.width/4, layer2Thickness);
            ctx.drawImage(imgAngle90, canvas.width/8 * 5 - 0.1, positionTier2Y, canvas.width/4, layer2Thickness);
            ctx.drawImage(imgAngle90, 0, 0, widthHalfImage, heightImage, canvas.width/8 * 7 - 0.1, positionTier2Y, canvas.width/8, layer2Thickness);
            // DRAW TIER 4
            ctx.drawImage(imgAngle90, widthHalfImage, 0, widthHalfImage, heightImage, 0, positionTier4Y, canvas.width/8, layer4Thickness);
            ctx.drawImage(imgAngle90, canvas.width/8 - 0.1, positionTier4Y, canvas.width/4, layer4Thickness);
            ctx.drawImage(imgAngle90, canvas.width/8 * 3 - 0.1, positionTier4Y, canvas.width/4, layer4Thickness);
            ctx.drawImage(imgAngle90, canvas.width/8 * 5 - 0.1, positionTier4Y, canvas.width/4, layer4Thickness);
            ctx.drawImage(imgAngle90, 0, 0, widthHalfImage, heightImage, canvas.width/8 * 7 - 0.1, positionTier4Y, canvas.width/8, layer4Thickness);
        };
        
        imgAngle0.src = 'images/paralel-grain-0.jpg';
        imgAngle90.src = 'images/perpendicular-grain-90.jpg';
        let bottom = layup.t1.thickness + layup.t2.thickness + layup.t3.thickness + layup.t4.thickness + layup.t5.thickness;
        this.drawLine(0, bottom, canvas.width, bottom, '#000', 1.5);
    },

    /**
     * Add more functions as you need
     */

    drawLine : function (x1, y1, x2,y2, stroke = 'black', width = 1) {
        let canvas = this.canvas;
        let ctx = canvas.getContext('2d');
        // start a new path
        ctx.beginPath();

        // place the cursor from the point the line should be started 
        ctx.moveTo(x1, y1);

        // draw a line from current cursor position to the provided x,y coordinate
        ctx.lineTo(x2, y2);

        // set strokecolor
        ctx.strokeStyle = stroke;

        // set lineWidht 
        ctx.lineWidth = width;

        // add stroke to the line 
        ctx.stroke();
    }
};