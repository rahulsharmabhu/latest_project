export function drawRectanglesOnCanvas(canvasRef, detections, originalImageWidth, originalImageHeight) {
    if (canvasRef.current && detections && detections.length > 0) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const scaleX = canvas.width / 465;
        const scaleY = canvas.height / 400;

        const drawRectangle = (det) => {
            if (det.mark && det.mark.type === 'RECT') {
                const scaledX1 = Math.min(canvas.width, Math.max(0, det.mark.x1 * scaleX));
                const scaledY1 = Math.min(canvas.height, Math.max(0, det.mark.y1 * scaleY));
                const scaledX2 = Math.min(canvas.width, Math.max(0, det.mark.x2 * scaleX));
                const scaledY2 = Math.min(canvas.height, Math.max(0, det.mark.y2 * scaleY));

                ctx.beginPath();
                ctx.rect(scaledX1, scaledY1, scaledX2 - scaledX1, scaledY2 - scaledY1);
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        };

        detections.forEach(det => {
            if (det.mark) {
                // Single image detections
                drawRectangle(det);
            } else if (det.detections && Array.isArray(det.detections)) {
                // Multiple images detections
                det.detections.forEach(innerDet => drawRectangle(innerDet));
            }
        });
    }
}


