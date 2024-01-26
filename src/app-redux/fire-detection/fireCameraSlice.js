// const { createSlice } = require('@reduxjs/toolkit')
import { createSlice } from '@reduxjs/toolkit';
import Image1 from '../../assets/images/fire-detection/camera-1/IMG_3548.jpg'
import Image2 from '../../assets/images/fire-detection/camera-1/IMG_3549.jpg'
import Image3 from '../../assets/images/fire-detection/camera-1/IMG_3550.jpg'


export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})
const data = [
    {
        id: 1,
        camera_name: "brisbane",
        bearings: 0,
        elevation: 0,
        latitude: -31.3231,
        longitude: 12.111,
        ControlComment: "control comment",
        camera_status: true,
        camera_control: false,
        camera_control_comment: "control comment",
        detections: [
            {
                detectionId: 9294,
                confidenceScore: 0.93,
                detectionTime: "2023-02-03T05:31:12.473",
                notificationTime: "2023-02-03T16:31:05.387",
                frameId: 13717
            },
            {
                detectionId: 9295,
                confidenceScore: 0.24,
                detectionTime: "2023-02-03T05:31:13.88",
                notificationTime: "2023-02-03T16:31:13.803",
                frameId: 13717
            }
        ]
    },
    {
        id: 2,
        camera_name: "Brisbane 2",
        bearings: 0,
        elevation: 0,
        latitude: -31.3231,
        longitude: 12.111,
        ControlComment: "control comment",
        camera_status: true,
        camera_control: false,
        camera_control_comment: "control comment",
        detections: [
            {
                detectionId: 9294,
                confidenceScore: 0.40,
                detectionTime: "2023-02-03T05:31:12.473",
                notificationTime: "2023-02-03T16:31:05.387"
            },
            {
                detectionId: 9295,
                confidenceScore: 0.45,
                detectionTime: "2023-02-03T05:31:13.88",
                notificationTime: "2023-02-03T16:31:13.803"
            }
        ]
    }
]

const IMAGES = [
    {
        cameraId: 1,
        items: [
            {
                id: 13717,
                image: "image_724942_07-02-2023_06-48-21_AM.jpg",
                imageUrl: Image1,
                detections: [
                    {
                        id: 9294,
                        mark: {
                            x1: 345,
                            y1: 319,
                            x2: 370,
                            y2: 327,
                            type: "RECT"
                        },
                        comment: "",
                        isManual: false,
                        isEdited: false,
                        confidenceScore: 0.93
                    }
                ]
            },
            {
                id: 13718,
                image: "image_525782_07-02-2023_06-48-23_AM.jpg",
                imageUrl: Image2,
                detections: [
                    {
                        id: 9295,
                        mark: {
                            x1: 0,
                            y1: 319,
                            x2: 5,
                            y2: 356,
                            type: "RECT"
                        },
                        comment: "",
                        isManual: false,
                        isEdited: false,
                        confidenceScore: 0.93
                    }
                ]
            },
            {
                id: 13719,
                image: "image_525782_07-02-2023_06-48-23_AM.jpg",
                imageUrl: Image3,
                detections: [
                    {
                        id: 9295,
                        mark: {
                            x1: 0,
                            y1: 319,
                            x2: 5,
                            y2: 356,
                            type: "RECT"
                        },
                        comment: "",
                        isManual: false,
                        isEdited: false,
                        confidenceScore: 0.93
                    }
                ]
            }
        ]
    }
]

const detectionType = [
    {
        id: 1,
        title: "No smoke"
    },
    {
        id: 2,
        title: "Investigate"
    },
    {
        id: 3,
        title: "Missed detection"
    },
    {
        id: 4,
        title: "False detection"
    }
]


const fireCameraSlice = createSlice({
    name: 'camera',
    initialState: {
        imagesdata: IMAGES,
        cameradata: data,
        detectiontype: detectionType,
        imageViewer: { status: false, cameraId: null, imageId: null },
        selectedCamera: {},
        // selectedImage: {},
        detectiondialog: { status: false },
        camerastatus: STATUSES.IDLE,
        imagesstatus: STATUSES.IDLE,
        detectionstatus: STATUSES.IDLE
    },
    reducers: {
        selectCamera: (state, action) => {
            state.selectedCamera = action.payload
        },
        setImageViewer: (state, action) => {
            state.imageViewer = action.payload
        },
        opendetectionDialog(state) {
            state.detectiondialog = { status: true }
        },
        closedetectionDialog(state) {
            state.detectiondialog = { statue: false }
        }
    }
})

export const { selectCamera, opendetectionDialog, closedetectionDialog, setImageViewer } = fireCameraSlice.actions
export default fireCameraSlice.reducer
