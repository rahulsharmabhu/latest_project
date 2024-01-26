import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './fire-modal.css';
import { drawRectanglesOnCanvas } from '../../../components/draw-rectangles';

const CustomImageInnovator = ({ isOpen, toggle, detections, onRectanglesChange }) => {
    const [rectangles, setRectangles] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [currentRect, setCurrentRect] = useState(null);
    const [mode, setMode] = useState(null); // 'create', 'edit', or null
    const [selectedRectIndex, setSelectedRectIndex] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const savedRectangles = rectangles || [];
            setRectangles(savedRectangles);
            onRectanglesChange(rectangles)
            setMode(null); // Start with no mode selected
        }
    }, [isOpen, detections?.imageUrl]);

    useLayoutEffect(() => {
        if (isOpen) {
            drawImageOnce();
        }
    }, [isOpen, detections?.imageUrl, rectangles]);


    const drawImageOnce = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const img = new Image();
        img.src = detections?.imageUrl;

        img.onload = () => {
            context?.clearRect(0, 0, canvas.width, canvas.height);
            context?.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawDetectionRectangles();
            drawRectangles();
        };
    };

    const drawDetectionRectangles = () => {
        const detectionData = detections?.detections || [];
        const originalImageWidth = 465;
        const originalImageHeight = 400;
        drawRectanglesOnCanvas(canvasRef, detectionData, originalImageWidth, originalImageHeight);
    };

    const drawRectangles = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Draw all rectangles from detections and mouse actions
        rectangles.forEach((rect, index) => {
            const { startPoint, endPoint } = rect;
            const width = endPoint.x - startPoint.x;
            const height = endPoint.y - startPoint.y;

            // Draw a box around the selected rectangle
            if (selectedRectIndex !== null && selectedRectIndex === index) {
                const boxPadding = 5; // Padding for the box
                context.strokeStyle = "blue";
                context.lineWidth = 2;
                context.strokeRect(
                    startPoint.x - boxPadding,
                    startPoint.y - boxPadding,
                    width + boxPadding * 2,
                    height + boxPadding * 2
                );
            }

            // Draw the original rectangle
            context.strokeStyle = "red";
            context.lineWidth = 2;
            context.strokeRect(startPoint.x, startPoint.y, width, height);
        });
    };

    const handleMouseDown = (e) => {
        if (mode !== 'create') return;
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setCurrentRect({ startPoint: { x: mouseX, y: mouseY }, endPoint: { x: mouseX, y: mouseY } });
        setDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (mode === 'edit' && drawing && selectedRectIndex !== null) {
            const rect = canvasRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Update the size and position of the selected rectangle
            const updatedRectangles = rectangles.map((rect, index) => {
                if (index === selectedRectIndex) {
                    const { startPoint } = rect;
                    return {
                        startPoint,
                        endPoint: { x: mouseX, y: mouseY },
                    };
                }
                return rect;
            });

            setRectangles(updatedRectangles);
        } else if (mode === 'create' && drawing) {
            const rect = canvasRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            setCurrentRect({ ...currentRect, endPoint: { x: mouseX, y: mouseY } });
        }
    };

    const handleMouseUp = () => {
        if (mode !== 'create') return;
        if (currentRect) {
            setRectangles([...rectangles, currentRect]);
        }
        setCurrentRect(null);
        setDrawing(false);
    };

    const handleSave = () => {
        setRectangles(rectangles)
        const rectanglesData = { imageUrl: detections?.imageUrl, rectangles: rectangles };
        onRectanglesChange(rectanglesData);
        console.log("rectanglesData",rectanglesData);
        // localStorage.setItem(detections?.imageUrl, JSON.stringify(rectangles));
    };

    const handleCreateMode = () => {
        setMode('create');
    };



    const handleClear = () => {
        // localStorage.removeItem(detections?.imageUrl)
        setRectangles([])
    }

    const closeModal = () => {
        setRectangles([]);
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={closeModal} contentClassName='custom-firemodal'>
            <ModalHeader toggle={closeModal}>
                Image Details
            </ModalHeader>
            <ModalBody>
                <div className='canvas-wrapper' style={{ position: 'relative' }}>
                    {detections && (
                        <>
                            <img src={detections?.imageUrl} height={320} width={465} alt="Detected" />
                            <canvas
                                ref={canvasRef}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                // onClick={handleRectangleSelection}
                                width={465}
                                height={320}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    // border: '1px solid black' // Added for visibility
                                }}
                            />
                        </>
                    )}
                </div>
            </ModalBody>
            <ModalFooter>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="d-flex justify-content-end">
                            <button className='btn-primary btn' type='button' onClick={handleCreateMode}>Create</button>
                            {/* <button className='btn-primary btn' type='button' onClick={handleEditMode}>Edit</button> */}
                            <button className='btn-primary btn' onClick={handleSave}>Save</button>
                            <button className='btn-primary btn' onClick={handleClear}>Clear</button>
                        </div>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default CustomImageInnovator;



// For rectangle selection
// const handleRectangleSelection = (e) => {
//     if (mode !== 'edit') return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     const clickedRectIndex = rectangles.findIndex(({ startPoint, endPoint }) => {
//         return (
//             clickX >= Math.min(startPoint.x, endPoint.x) &&
//             clickX <= Math.max(startPoint.x, endPoint.x) &&
//             clickY >= Math.min(startPoint.y, endPoint.y) &&
//             clickY <= Math.max(startPoint.y, endPoint.y)
//         );
//     });

//     if (clickedRectIndex !== -1) {
//         setSelectedRectIndex(clickedRectIndex);
//     }
// };