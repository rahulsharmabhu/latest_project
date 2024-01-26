import { useEffect, useRef } from "react";
import { drawRectanglesOnCanvas } from "../../../components/draw-rectangles";

const ImageWithCanvas = ({ image, originalImageWidth, originalImageHeight, customRectangles }) => {
    const canvasRef = useRef(null);

    const drawSavedRectangles = () => {
        // Check if the imageUrl matches
        if (customRectangles?.imageUrl !== image.imageUrl) {
            return;
        } 
        const savedRectangles = customRectangles.rectangles || [];
        // drawRectanglesOnCanvas(canvasRef, savedRectangles, originalImageWidth, originalImageHeight);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const scaleX = canvas.width / 465;
        const scaleY = canvas.height / 400;

        // Draw all rectangles from detections and mouse actions
        savedRectangles.forEach((rect) => {
            const { startPoint, endPoint } = rect;

            // Scale rectangle coordinates
            const scaledStartX = startPoint.x * scaleX;
            const scaledStartY = startPoint.y * scaleY;
            const scaledEndX = endPoint.x * scaleX;
            const scaledEndY = endPoint.y * scaleY;

            const width = scaledEndX - scaledStartX;
            const height = scaledEndY - scaledStartY;

            // Draw the scaled rectangle
            context.strokeStyle = "red";
            context.lineWidth = 2;
            context.strokeRect(scaledStartX, scaledStartY, width, height);
        });

    };

    useEffect(() => {
        if (image.detections) {
            drawRectanglesOnCanvas(canvasRef, image.detections, originalImageWidth, originalImageHeight);
        }
        drawSavedRectangles();
    }, [image.detections, image.imageUrl, customRectangles]);


    return (
        <div className="canvas-wrapper" style={{ position: 'relative' }}>
            <img src={image.imageUrl} height={200} width={269} alt="Detected" />
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '200px',
                    width: '269px',
                }}
            />
        </div>
    );
};

export default ImageWithCanvas;
