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
        let paddingLeft = 40;
        let paddingRight = 60;
        let canvasWidth = canvas.width - paddingLeft - paddingRight;

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
            ctx.drawImage(imgAngle0, paddingLeft, positionTier1Y, canvasWidth, layer1Thickness);
            // DRAW TIER 3
            ctx.drawImage(imgAngle0, paddingLeft, positionTier3Y, canvasWidth, layer3Thickness);
            // DRAW TIER 5
            ctx.drawImage(imgAngle0, paddingLeft, positionTier5Y, canvasWidth, layer5Thickness);
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
            ctx.drawImage(imgAngle90, widthHalfImage, 0, widthHalfImage, heightImage, paddingLeft, positionTier2Y, canvasWidth/8, layer2Thickness);
            ctx.drawImage(imgAngle90, canvasWidth/8 - 0.1 + paddingLeft, positionTier2Y, canvasWidth/4, layer2Thickness);
            ctx.drawImage(imgAngle90, canvasWidth/8 * 3 - 0.1 + paddingLeft, positionTier2Y, canvasWidth/4, layer2Thickness);
            ctx.drawImage(imgAngle90, canvasWidth/8 * 5 - 0.1 + paddingLeft, positionTier2Y, canvasWidth/4, layer2Thickness);
            ctx.drawImage(imgAngle90, 0, 0, widthHalfImage, heightImage, canvasWidth/8 * 7 - 0.1 + paddingLeft, positionTier2Y, canvasWidth/8, layer2Thickness);
            // DRAW TIER 4
            ctx.drawImage(imgAngle90, widthHalfImage, 0, widthHalfImage, heightImage, paddingLeft, positionTier4Y, canvasWidth/8, layer4Thickness);
            ctx.drawImage(imgAngle90, canvasWidth/8 - 0.1 + paddingLeft, positionTier4Y, canvasWidth/4, layer4Thickness);
            ctx.drawImage(imgAngle90, canvasWidth/8 * 3 - 0.1 + paddingLeft, positionTier4Y, canvasWidth/4, layer4Thickness);
            ctx.drawImage(imgAngle90, canvasWidth/8 * 5 - 0.1 + paddingLeft, positionTier4Y, canvasWidth/4, layer4Thickness);
            ctx.drawImage(imgAngle90, 0, 0, widthHalfImage, heightImage, canvasWidth/8 * 7 - 0.1 + paddingLeft, positionTier4Y, canvasWidth/8, layer4Thickness);
        };
        // Source Image 
        imgAngle0.src = 'images/paralel-grain-0.jpg';
        imgAngle90.src = 'images/perpendicular-grain-90.jpg';
        
        // Draw Line Bottom 
        let bottom = layup.t1.thickness + layup.t2.thickness + layup.t3.thickness + layup.t4.thickness + layup.t5.thickness;
        this.drawLine(0, bottom + 1, canvas.width, bottom + 1, '#000', 0.1);

        this.drawRuler(0, 500, bottom, 30);

        // Draw Ruler Bottom 
        this.drawRulerBottom(bottom, canvasWidth);
        // Draw Ruler Left
        this.drawRulerLeft(bottom, canvasWidth);
    },

    /**
     * Add more functions as you need
     */

    /**  @param     x1 = x Start 
                    y1 = y start
                    x2 = x finish
                    y2 = y finish
                    stroke = color line
                    width = thickness of line 
    */
    drawLine : function (x1, y1, x2,y2, stroke = '#000', width = 1) {
        let canvas = this.canvas;
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = width;
        ctx.stroke();
    },
    // @param      x1 = x start
    //             x2 = x finish
    //             space = interval 
    //             stroke = warna 
    //             lineWidth = width line
    drawRuler : function (x1, x2, y, space, stroke='#000',lineWidth=0.1, startY = 700) {
        let canvas = this.canvas;
        let context = canvas.getContext('2d');
        let spacing = 20;
        context.lineWidth= lineWidth;
        context.strokeStyle = stroke;
        context.beginPath();
        for(let interval = 40; interval < 450; interval+= 10)
        {
            context.moveTo(interval*spacing+0.5, y);
            context.lineTo(interval*spacing+0.5, y+15);
            context.stroke();
        }
    },
    drawRulerBottom : function (totalThickness, canvasWidth) {
        let canvas = this.canvas;
        let context = canvas.getContext("2d");
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = "#000";
        context.lineWidth = 0.5;

        context.beginPath();
        context.moveTo(30, totalThickness);
        context.lineTo(canvas.width, totalThickness);
        context.stroke();

        let numberRuler = 0;
        let posNumber = 0;
        for (let i = 0; i <= 25; i++) {
            let space = (canvasWidth/25);

            context.beginPath();
            context.moveTo((i*space) + 40, totalThickness);
            context.lineTo((i*space) + 40, totalThickness + 10);
            context.stroke();
            
            if (i % 5 == 0) {
                if(numberRuler == 0){
                    posNumber = ((i*space) + 38);
                }else if(numberRuler < 99){
                    posNumber = ((i*space) + 34);
                }else{
                    posNumber = ((i*space) + 30);
                }
                context.fillText(numberRuler.toString(), posNumber, totalThickness + 20);
                numberRuler += 30;
            }
        }
        // Primary Direction
        context.fillText("Primary Direction", canvasWidth/2, totalThickness + 50);
    },
    drawRulerLeft: function (totalThickness, canvasWidth) {
        let canvas = this.canvas;
        let context = canvas.getContext("2d");
        let height = totalThickness;
        // Bersihkan canvas
        context.clearRect(0, 0, canvas.width, height);

        // Atur properti garis
        context.strokeStyle = "#000";
        context.lineWidth = 0.5;

        // Gambar garis utama
        context.beginPath();
        context.moveTo(15, 0);
        context.lineTo(15, height);
        context.stroke();

        // Gambar garis-garis kecil setiap 10 piksel
        for (var i = 0; i <= height; i += 10) {
            context.beginPath();
            context.moveTo(10, i);
            context.lineTo(20, i);
            context.stroke();

            // Tambahkan angka pada setiap 50 piksel
            context.fillText(i.toString(), 5, i + 5);
        }
    }
};