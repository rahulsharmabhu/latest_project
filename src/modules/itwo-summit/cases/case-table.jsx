import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Form,
  CardBody,
  Table,
  CardFooter,
} from "reactstrap";
import CInput from "../../../components/custom-input";
import { Icon } from "@iconify/react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useFormik } from "formik";
import Toast from "../../../components/toast";
import { useOnCaseSelectState } from "../../../app-redux/hooks/useOnCaseSelectState";
import { Layout } from "flexlayout-react";
import { useOnNewTabClickState } from "../../../app-redux/hooks/useOnNewTabClickState";
import { useOnRibbonClickState } from "../../../app-redux/hooks/useOnRibbonClickState";

const CaseTable = (props) => {
  const layoutRef = useRef();

  const { caselist, setCaseList } = props;
  const { caseState, setCaseSelectState } = useOnCaseSelectState();
  const { ribbonState, setRibbonClickState } = useOnRibbonClickState();
  const { setNewTabClickState } = useOnNewTabClickState();
  const [caseModal, setCaseModal] = useState(false);
  const [isFormik, setIsFormik] = useState(false);
  const [adding, setAdding] = useState(false);

  const [messages, setMessages] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const deleteCases = () => caselist.filter(val => {return val.id !== selectedRow});
  
  useEffect(() => {
  
  }, [caselist])
  

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleClick = (selectedCase) => {
  setCaseSelectState(selectedCase);
   // event.preventDefault();
   if (ribbonState.name !== 'Cases')
   {
    const obj = {
      id: "case-details",
      type: "active",
      name: "Case Details",
      component: "case-details",
      isCaseTab: true,
      text: undefined,
      icon: undefined,
    };
    setNewTabClickState(obj);
  }
  const obj = {
    id: "case-panel-close",
    type: "active",
    name: "Case-Panel-Close",
    component: "cases",
    isCaseTab: true,
    text: undefined,
    icon: undefined,
  };
  setRibbonClickState(obj)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = formik.values.title;
    const description = formik.values.description;
    if (title === "" || description === "") {
      Toast("Please add a Case Title and a Case Description!", "error");
    } else {
      const esmNewCase = {};
      const { length } = caselist;
      let lastIndex = 0;
      if (length) {
        lastIndex = caselist[length - 1].id;
      }
      esmNewCase.id = lastIndex + 1;
      const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      esmNewCase.caseId = `2023-${randomNumber}`;
      esmNewCase.title = title;
      esmNewCase.description = description;
      esmNewCase.threatLevel = 1;
      esmNewCase.keywords = [];
      esmNewCase.locations = [];
      esmNewCase.licensePlates = [];
      esmNewCase.weapons = [];
      caselist.push(esmNewCase);
      // Open the case details tab after submit
      setCaseSelectState(esmNewCase);
      // if (ribbonState.name !== 'Cases')
      // {
      // const obj = {
      //     id: "case-details",
      //     type: "active",
      //     name: "Case Details",
      //     component: "case-details",
      //     isCaseTab: true,
      //     text: undefined,
      //     icon: undefined,
      //   };
      // setNewTabClickState(obj);
      // } 
      const obj = {
          id: "case-panel-close",
          type: "active",
          name: "Case-Panel-Close",
          component: "cases",
          isCaseTab: true,
          text: undefined,
          icon: undefined,
        };
      setRibbonClickState(obj)
      // ---------------------------------------
      Toast("Case Created Successfully!", "success");
      (formik.values.title = ""),
        (formik.values.description = ""),
        setCaseModal(false);
    }
  };

  const renderCases = () => (
    <Table>
      {caselist && caselist.length ? (
        <tbody>
          {caselist.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <div className="form-check convention_13">
                  <span
                      className="case_list_wrapper"
                      onClick={(e) => {
                        handleClick(item);
                        // addNewNode(e, "va-enrich-panell", "Case Detail", "case-details", "active")
                      }}
                    >
                    <CInput
                      type="checkbox"
                      name={item.id}
                      className="mr-1 form-check-input"
                      checked={item.id === caseState?.id}
                      //   onChange={() => selectRow(item.id)}
                      onChange={() => {
                        setSelectedRow(item.id);
                      }}
                    />{" "}
                      Case ID : {item.caseId}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td>No Cases Found</td>
          </tr>
        </tbody>
      )}
    </Table>
  );

  return (
    <>
      <Modal
        isOpen={caseModal}
        toggle={() => setCaseModal(!caseModal)}
        className="modal-dialog-centered"
      >
        <Form
          id="form-modal-todo"
          className="todo-modal"
          onSubmit={handleSubmit}
        >
          <ModalHeader className="convention_14" toggle={() => setCaseModal(!caseModal)}>
            New Case
          </ModalHeader>
          <ModalBody className="convention_13">
            <div className="mb-2">
              <Label className="form-label" for="title">
                Case Title: <span className="text-danger">*</span>
              </Label>
              <CInput
                name="title"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                className="custom-input form-control form-control-sm text-white"
                type="text"
                error={
                  isFormik
                    ? { type: "formik", error: formik && formik }
                    : { type: "server", error: messages }
                }
              />
            </div>
            <div className="mb-2">
              <Label className="form-label" for="description">
                Case Description: <span className="text-danger">*</span>
              </Label>
              <CInput
                name="description"
                value={formik.values.description}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                className="custom-input form-control form-control-sm text-white"
                type="textarea"
                error={
                  isFormik
                    ? { type: "formik", error: formik && formik }
                    : { type: "server", error: messages }
                }
              />
            </div>
          </ModalBody>
          <ModalFooter className="convention_14">
            <Button
              color="primary"
              onClick={() => setCaseModal(!caseModal)}
              outline
            >
              Cancel
            </Button>{" "}
            <Button color="primary">Submit</Button>{" "}
          </ModalFooter>
        </Form>
      </Modal>
      <Card className="w-100">
        <CardHeader>
          <CardTitle>
            <Button className="add_case convention_13" color="primary" onClick={() => setCaseModal(!caseModal)}>
              <Icon
                className="text-white"
                icon="ic:baseline-plus"
                width="25"
                height="25"
              />
              <span className="align-middle ms-25">Add Case</span>
            </Button>
            {/* </Button.Ripple> */}
          </CardTitle>
        </CardHeader>
        <PerfectScrollbar
          className="list-group case_main_wrapper"
          options={{ wheelPropagation: false }}
          style={{ maxHeight: "440px" }}
          containerRef={(ref) => {
            if (ref) {
              ref._getBoundingClientRect = ref.getBoundingClientRect;
              ref.getBoundingClientRect = () => {
                const original = ref._getBoundingClientRect();
                return { ...original, height: Math.floor(original.height) };
              };
            }
          }}
        >
          <CardBody>
            {renderCases()}
          </CardBody>
          {/* <UILoader blocking={block}> */}
          <CardFooter className="text-end border-top-0">
            <Button size="sm" color="danger" onClick={() => deleteCases()}>
              <Icon
                className="text-white"
                icon="material-symbols:delete"
                width="16"
                height="16"
              />
              <span className="align-middle ms-25">Delete</span>
            </Button>
          </CardFooter>
        </PerfectScrollbar>
        {/* </UILoader> */}
      </Card>
    </>
  );
};

export default CaseTable;
