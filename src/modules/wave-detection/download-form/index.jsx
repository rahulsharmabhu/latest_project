import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as XLSX from 'xlsx';
import CInput from '../../../components/custom-input/index';
import { videoInfoValidations } from './validations';
import { useOnVideoClickState } from '../../../app-redux/hooks/useOnVideoClickState';
import { useOnDetectionClickState } from '../../../app-redux/hooks/useOnDetectionClickState';
import { useOnDownloadClickState } from '../../../app-redux/hooks/useOnDownloadClickState';
import { getFormattedDateTime } from '../../../components/utils/app.util';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Toast from '../../../components/toast'




const DownloadForm = () => {
  const [isFormik, setIsFormik] = useState(false);
  const { detectionState } = useOnDetectionClickState();
  const { videoState } = useOnVideoClickState();
  const { downloadState, setDownloadClickState } = useOnDownloadClickState();
  const [fileNameValue, setFileNameValue] = useState("");
  const [messages, setMessages] = useState("");

  const handleFileName = (e) => {
    setFileNameValue(e.target.value);
  };


  const formik = useFormik({
    initialValues: {
      fileName: "",
      datePicker: "",
      trainer: "",
      waveFrequency: "",
      waveFrequency: "",
      notes: "",
    },

    validationSchema: videoInfoValidations,
    onSubmit: (values) => {
      handleDownload();
    },
  });

  useEffect(() => {
    if (videoState) {
      // formik.setFieldValue('fileName', null);
      // formik.setFieldValue('trainer', null);
      // formik.setFieldValue('datePicker', null);
      formik.setValues({})
    }
  }, [videoState?.name]);


  useEffect(() => {
    if (Object.keys(formik.errors).length !== 0) {
      setIsFormik(true);
    } else {
      setIsFormik(false);
    }
  }, [formik.errors]);

  useEffect(() => {
    if (downloadState) {
      formik.handleSubmit();
      if (Object.keys(formik.errors).length !== 0) {
        Toast('Please complete the mandatory information.!', 'error');
        setDownloadClickState(null);
      }
    }
  }, [downloadState]);

  useEffect(() => {
    if (isFormik && downloadState) {
      Toast('Please complete the mandatory information.!', 'error');
      setDownloadClickState(null);
    }
  }, [isFormik]);

  const handleDownload = () => {
    const processedItem = {};
    // Camera Name
    processedItem["Camera Name"] = videoState.name || "";

    // DatePicker
    processedItem["TimeStamp"] = formik.values.datePicker;

    // Trainer
    processedItem["Trainer"] = formik.values.trainer;

    // WaveHeight
    processedItem["Wave Height"] = formik.values.waveHeight;

    // WaveFrequency
    processedItem["Wave Frequency"] = formik.values.waveFrequency;

    // notes
    processedItem["notes"] = formik.values.notes;

    const firstTable = [processedItem];
    const detectionTable = detectionState.map((row) => {
      const newRow = {
        ...row,
      };

      // if (row.angle !== "" && row.angle !== null) {
      //   newRow["Wave Height"] = formik.values.waveHeight;
      //   // newRow["Wave Frequency"] = formik.values.waveFrequency;
      // }

      return newRow;
    });

    if (firstTable.length === 0 && detectionTable.length === 0) {
      alert("Please fill data before downloading.");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(firstTable);
    const worksheet2 = XLSX.utils.json_to_sheet(detectionTable);

    const combinedData = [
      ...XLSX.utils.sheet_to_json(worksheet, { header: 1 }),
      [null],
      [null],
      ...XLSX.utils.sheet_to_json(worksheet2, { header: 1 }),
    ];

    const finalData = combinedData.filter(
      (row) => row.length > 0 || row.some((cell) => cell !== null)
    );

    const combinedWorksheet = XLSX.utils.aoa_to_sheet(finalData);

    XLSX.utils.book_append_sheet(
      workbook,
      combinedWorksheet,
      "Combined Tables"
    );
    const xlsxBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    const blob = new Blob([xlsxBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileNameValue + ".xlsx");
    link.click();

    URL.revokeObjectURL(url);
  };

  // const handleDateTimeChange = (e) => {
  //   const localDateTime = e.target.value;
  //   const momentDateTime = moment(localDateTime, 'YYYY-MM-DDTHH:mm').utc();
  //   const selectedDateTime = momentDateTime.format('YYYY-MM-DDTHH:mm');
  //   formik.setFieldValue('datePicker', selectedDateTime);
  //   formik.handleChange(e); // Call formik's handleChange to update formik's internal state
  // };

  return (
    <PerfectScrollbar>
      <div className='col-12 .bg-dark-subtle download_form_wrapper convention_13'>
        <form>
          <div className="form-group mt-1">
            <label className="text-secondary" htmlFor="exampleInputEmail1">
              File Name*
            </label>
            <CInput
              name="fileName"
              className="custom-input form-control form-control-sm text-white"
              value={formik.values.fileName}
              // onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.handleChange(e);
                handleFileName(e); // Call handleFileName function
              }}
              error={
                isFormik
                  ? { type: "formik", error: formik && formik }
                  : { type: "server", error: messages }
              }
              type="text"
            />
          </div>
          <div className="form-group mt-1">
            <label className="text-secondary" htmlFor="exampleInputPassword1">
              Timestamp*
            </label>
            <CInput
              name="datePicker"
              className="custom-input form-control form-control-sm text-white"
              value={getFormattedDateTime(
                formik.values.datePicker,
                "YYYY-MM-DDTHH:mm"
              )}
              // onChange={handleDateTimeChange}
              onChange={formik.handleChange}
              // pattern="\d{4}-\d{2}-\d{2}"
              onBlur={formik.handleBlur}
              error={
                isFormik
                  ? { type: "formik", error: formik && formik }
                  : { type: "server", error: messages }
              }
              type="datetime-local"
            />
          </div>
          <div className="form-group mt-1">
            <label className="text-secondary" htmlFor="exampleInputEmail1">
              Trainer*
            </label>
            <CInput
              name="trainer"
              className="custom-input form-control form-control-sm text-white"
              value={formik.values.trainer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                isFormik
                  ? { type: "formik", error: formik && formik }
                  : { type: "server", error: messages }
              }
              type="text"
            />
          </div>
          <div className="form-group mt-1">
            <label className="text-secondary" htmlFor="exampleInputPassword1">
              Tank Wave Height*
            </label>
            <CInput
              name="waveHeight"
              className="custom-input form-control form-control-sm text-white"
              value={formik.values.waveHeight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                isFormik
                  ? { type: "formik", error: formik && formik }
                  : { type: "server", error: messages }
              }
              type="text"
            />
          </div>
          <div className="form-group mt-1">
            <label className="text-secondary" htmlFor="exampleInputEmail1">
              Tank Wave Frequency*
            </label>
            <CInput
              name="waveFrequency"
              className="custom-input form-control form-control-sm text-white"
              value={formik.values.waveFrequency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                isFormik
                  ? { type: "formik", error: formik && formik }
                  : { type: "server", error: messages }
              }
              type="text"
            />
          </div>
          <div className="form-group mt-1">
            <label className="text-secondary" htmlFor="exampleInputPassword1">
              Notes
            </label>
            <CInput
              name="notes"
              className="custom-input form-control form-control-sm text-white"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                isFormik
                  ? { type: "formik", error: formik && formik }
                  : { type: "server", error: messages }
              }
              type="textarea"
            />
          </div>
        </form>
      </div>
    </PerfectScrollbar>
  );
};

export default DownloadForm;
