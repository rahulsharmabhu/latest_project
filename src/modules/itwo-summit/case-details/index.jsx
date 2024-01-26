import React, { useEffect } from 'react'
import { useOnCaseSelectState } from '../../../app-redux/hooks/useOnCaseSelectState'
import { Card, CardHeader, CardTitle, CardBody, CardFooter, Label, Button } from "reactstrap"
import CInput from '../../../components/custom-input'
import { useFormik } from 'formik';
import Toast from '../../../components/toast'
import { useOnRibbonClickState } from '../../../app-redux/hooks/useOnRibbonClickState';

const CaseDetails = () => {   

 const { setRibbonClickState } = useOnRibbonClickState();
 const { caseState, setCaseStateEmpty } = useOnCaseSelectState();
 const formik = useFormik({
  initialValues: {
    title: "",
    description: ""
    },
    onSubmit: (values) => {
        handleSubmit();
    },
  });

  const closeCase = () => {
    if (confirm("Are you sure you want to close ALL case windows?")) {
      Toast('Case closed!','success')
      setCaseStateEmpty()
      const obj = {
         id : "va-enrich-panel",
         name: 'Home',
         component: "logo",
         type: "active"
       };
       setRibbonClickState(obj);
    }
  }

  return (
       <Card className="w-100 mt-3">
       <CardBody className="case_wrapper overflow-auto convention_13 d-flex">
                  <div className='col-md-9'>
                      <div className='mb-2'>
                      <Label className='form-label' for='title'>
                          Case ID :
                      </Label>
                      <CInput
                          name='title'
                          value={caseState?.caseId}
                          readOnly
                          onBlur={formik.handleBlur}
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          className="custom-input form-control form-control-sm text-white"
                          type='text'
                      />
                      </div>
                      <div className='mb-2'>
                      <Label className='form-label' for='title'>
                          Case Title :
                      </Label>
                      <CInput
                          name='title'
                          value={caseState?.title}
                          readOnly
                          onBlur={formik.handleBlur}
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          className="custom-input form-control form-control-sm text-white"
                          type='text'
                      />
                      </div>
                      <div className='mb-2'>
                          <Label className='form-label' for='description'>
                            Case Description :
                          </Label>
                          <CInput
                              name='description'
                              rows={8}
                              readOnly
                              value={caseState?.description}
                              onBlur={formik.handleBlur}
                              onChange={(e) => {
                                formik.handleChange(e);
                              }}
                              className="custom-input form-control form-control-sm text-white"
                              type='textarea'
                          />
                      </div>
                  </div>
                { caseState && <div className='col-md-3'>
                      <div className="close_case_wrapper">
                        <Button size='sm'>Report</Button>
                        <Button size='sm' onClick={() => closeCase()}>Close Case</Button>
                      </div>
                </div> }
                </CardBody>
                <CardFooter className="text-end border-top-0"></CardFooter>
        </Card>
  )
}

export default CaseDetails