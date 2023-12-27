'use strict';

function LayupDrawer() {
    /**
     * Canvas element
     */
    this.canvas = null;
    this.PADDINGLEFT = 40;
    this.PADDINGRIGHT = 60;
    this.PADDINGTOP = 40;
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
        let paddingLeft = this.PADDINGLEFT;
        let paddingRight = this.PADDINGRIGHT;
        let paddingTop = this.PADDINGTOP;
        let canvasWidth = canvas.width - paddingLeft - paddingRight;

        let totalThickness = 0;

        // DRAW ANGLE 0 
        for (const key in layup) {
            if (layup.hasOwnProperty(key)) {
                const value = layup[key];
                const position = totalThickness + paddingTop;            
                if(value.angle == 0){
                    let imgAngle0 = new Image();
                    imgAngle0.onload = function(){
                        ctx.drawImage(imgAngle0, paddingLeft, position, canvasWidth, value.thickness);
                    };
                    imgAngle0.src = 'images/paralel-grain-0.jpg';
                }else if(value.angle == 90){
                    let imgAngle90 = new Image();
                    imgAngle90.onload = function() {
                        let widthHalfImage = imgAngle90.width / 2;
                        let heightImage = imgAngle90.height;
                    
                        ctx.drawImage(imgAngle90, widthHalfImage, 0, widthHalfImage, heightImage, paddingLeft, position, canvasWidth/8, value.thickness);
                        ctx.drawImage(imgAngle90, canvasWidth/8 - 0.1 + paddingLeft, position, canvasWidth/4, value.thickness);
                        ctx.drawImage(imgAngle90, canvasWidth/8 * 3 - 0.1 + paddingLeft, position, canvasWidth/4, value.thickness);
                        ctx.drawImage(imgAngle90, canvasWidth/8 * 5 - 0.1 + paddingLeft, position, canvasWidth/4, value.thickness);
                        ctx.drawImage(imgAngle90, 0, 0, widthHalfImage, heightImage, canvasWidth/8 * 7 - 0.1 + paddingLeft, position, canvasWidth/8, value.thickness);
                    };
                    imgAngle90.src = 'images/perpendicular-grain-90.jpg';            
                }
                totalThickness += value.thickness;
            }
        }
        
        // ctx.font = "8px Arial";
        // ctx.fillText("t2:" + layer2Thickness + " " + layup.t2.grade, canvasWidth + 45, positionTier2Y + (layer2Thickness/2));
        // ctx.fillText("t3:" + layer3Thickness + " " + layup.t3.grade, canvasWidth + 45, positionTier3Y + (layer3Thickness/2));
        // ctx.fillText("t4:" + layer4Thickness + " " + layup.t4.grade, canvasWidth + 45, positionTier4Y + (layer4Thickness/2));
        // ctx.fillText("t5:" + layer5Thickness + " " + layup.t5.grade, canvasWidth + 45, positionTier5Y + (layer5Thickness/2));
        // ctx.restore();
        
        // imgAngle0.onload = function(){
        //     // DRAW TIER 1
        //     ctx.drawImage(imgAngle0, paddingLeft, positionTier1Y, canvasWidth, layer1Thickness);
        //     // DRAW TIER 3
        //     ctx.drawImage(imgAngle0, paddingLeft, positionTier3Y, canvasWidth, layer3Thickness);
        //     // DRAW TIER 5
        //     ctx.drawImage(imgAngle0, paddingLeft, positionTier5Y, canvasWidth, layer5Thickness);
        // };

        // Draw Ruler Bottom 
        // this.drawTextRight(layup, canvasWidth);
        this.drawRulerBottom(totalThickness, canvasWidth);
        // Draw Ruler Left
        this.drawRulerLeft(totalThickness, canvasWidth);
        // Draw Note Right
        
    },

    /**
        * Add more functions as you need
    */

    /**  @param     totalThickness 
                    canvasWidth
    */
    drawRulerBottom : function (totalThickness, canvasWidth) {
        let canvas = this.canvas;
        let context = canvas.getContext("2d");
        let paddingTop = this.PADDINGTOP;
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = "#000";
        context.lineWidth = 0.1;

        context.beginPath();
        context.moveTo(30, totalThickness + paddingTop);
        context.lineTo(canvas.width, totalThickness + paddingTop);
        context.stroke();

        let numberRuler = 0;
        let posNumber = 0;
        for (let i = 0; i <= 25; i++) {
            let space = (canvasWidth/25);

            context.beginPath();
            context.moveTo((i*space) + 40, totalThickness + paddingTop);
            context.lineTo((i*space) + 40, totalThickness + 10 + paddingTop);
            context.stroke();
            
            if (i % 5 == 0) {
                posNumber = ((i*space) + 38);
                
                context.save(); 
                context.translate(posNumber, totalThickness + 25 + paddingTop);  
                context.rotate(7 * (Math.PI / 4)); 
                context.fillText(numberRuler.toString(), 0, 0);
                context.restore(); 
                numberRuler += 30;
            }
        }
        // Primary Direction
        context.fillText("Primary Direction", canvasWidth/2, totalThickness + 50 + paddingTop);
    },
    drawRulerLeft: function (totalThickness, canvasWidth) {
        let canvas = this.canvas;
        let context = canvas.getContext("2d");
        let paddingTop = this.PADDINGTOP;
        let height = totalThickness + paddingTop;
        let spacing = (totalThickness < 150 ? 40 : 30);
        let start = (totalThickness % spacing);

        // DRAW LINE VERTICAL 
        context.clearRect(0, 0, canvasWidth, height);
        context.strokeStyle = "#000";
        context.lineWidth = 0.1;
        context.beginPath();
        context.moveTo(40, paddingTop);
        context.lineTo(40, height);
        context.stroke();

        // TOP NUMBER OF RULER 
        let numberRuler = totalThickness - start;
        if(start != 0){
            context.beginPath();
            context.moveTo(34, paddingTop);
            context.lineTo(40, paddingTop);
            context.stroke();
            context.fillText(totalThickness, 20, paddingTop - 5);
        }

        // WRITE NUMBER IN RULER 
        for (var i = (start + paddingTop); i <= height; i += spacing) {
            context.beginPath();
            context.moveTo(34, i);
            context.lineTo(40, i);
            context.stroke();

            context.fillText(numberRuler.toString(), 20, i + 5);
            numberRuler -= spacing;
        }
        
        // Slab Thickness (mm)
        context.save();
        context.translate(0, totalThickness + 50); 
        context.rotate(3 * Math.PI/2);
        context.fillText("Slab Thickness (mm)", (totalThickness / 2) - this.PADDINGTOP, 10); 
        context.restore(); 
    },
    drawTextRight: function (layup, canvasWidth){
        let canvas = this.canvas;
        let ctx = canvas.getContext('2d');
        let totalThickness = 0;
        for (const key in layup) {
            if (layup.hasOwnProperty(key)) {
                const value = layup[key];
                const position = totalThickness + this.PADDINGTOP;     
                ctx.font = "8px Arial";
                ctx.fillText("t1:" + 200 + " " + 400, canvasWidth + 45, 0);
                ctx.restore();
                totalThickness += value.thickness;
            }
        }
    }
};