import * as Yup from 'yup'

export const videoInfoValidations = Yup.object({
    fileName: Yup.string().required("Filename is required."),
    datePicker: Yup.date().required('Date is required'),
    trainer: Yup.string().required("Trainer name is Required."),
    waveHeight: Yup.string().required("Wave height is Required."),
    waveFrequency: Yup.string().required("Wave frequency is Required."),
});
