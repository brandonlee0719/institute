/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { makeStyles, Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import parse from "html-react-parser";
import { useSnackbar } from "notistack";
import { pdfjs, Document, Page } from "react-pdf";
import ReactPlayer from "react-player";
import { NavLink as RouterLink, useHistory, useLocation } from "react-router-dom";

import GI_MAP from "../../../assets/docs/GI-MAP-Interpretive-Guide.pdf";
import pdfFile from "../../../assets/docs/sample.pdf";
import SampleDocViewer from "../../../components/common/SampleDocViewer";
import useAuth from "../../../hooks/useAuth";
import ClassService from "../../../services/class.service";
import { isEmpty, dateTimeFormat } from "../../../utils/helpers";
import PDFComponent from "./Pdf-Render";


pdfjs
  .GlobalWorkerOptions
  .workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(2),
    color: "DarkSlateGray",
    fontSize: "18px",
  },
  root: {
    flexGrow: 1,
    padding: "30px 0px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5px",
    fontSize: "14px",
    width: 200,
  },
  headerWrap: {
    display: "flex",
    justifyContent: "space-between",
  },
  Logo: {
    width: 240,
    height: 240,
  },
  PDFViewer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  highlightValue: {
    color: "gray",
    fontWeight: "400",
    fontSize: "small",
    whiteSpace: "pre-line", // will break lines where they break in code
    marginTop: "10px",
    overflow: "auto",
  },
  highlighTitle: {
    color: "black",
    fontSize: "14px",
  },
  html: {
    overflowY: "scroll",
  },

}));


export default function Class() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user, logout } = useAuth();

  const [selectedProvider, setSelectedProvider] = useState({});

  const [completed, setCompleted] = useState(false);
  const [classData, setClassData] = useState([]);
  const [classId, setClassId] = useState();
  const [clientId, setClientId] = useState();
  const [pdfVal, setPDFVal] = useState("");

  const loc = useLocation();

  const history = useHistory();

  const id = loc.pathname.split("/")[3];

  const handleSwitchChange = async (event) => {
    const data = {
      clientId,
      classId,
      classUpdate: event.target.checked,
    };

    classData.completion_dt = new Date();
    setCompleted(event.target.checked);

    try {
      const updateClass = await ClassService.updateClassCompletion(data);


      if (updateClass === "") {
        enqueueSnackbar(`Could not find your class details.`, {
          variant: "warning",
        });
      } else {
        enqueueSnackbar(`Successfully updated the class details.`, {
          variant: "success",
        });

        history.go(0);
      }
    } catch (error) {
      setErrors(error.response.data.message);
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
      });
    }
  };


  const handlePrevious = () => {
    const prevId = parseInt(classId) - 1;
    history.push(`/client/class/${prevId}`);
  };

  const handleNext = () => {
    const nextId = parseInt(classId) + 1;
    history.push(`/client/class/${nextId}`);
  };

  useEffect(() => {
    setClassId(id);
    setClientId(user.id);
    ClassService.getClass(id).then(
      (response) => {
        if (response) {
          const fileName = response[0].url.split("/").pop();

          setPDFVal(fileName);
          setCompleted(response[0].completion_dt !== null);
          setClassData(response[0]);
        }
      },
      (error) => {
        if (error.response) {
          setErrors(error.response.data.message);
        }
      },
    );
  }, []);

  let highlightsVal = "";
  if (classData.length !== 0 && classData.highlight !== null) {
    const temp = classData.highlight;


    const test = temp.replaceAll("\n<!--", "<!--"); // removes the blank lines, david Feb 2 2022
    highlightsVal = test; // temp.substr(0, firstPart) + temp.substr(secondPart);
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={7} xs={12} className={classes.headerWrap}>
          <Typography color="textPrimary" className={classes.pageTitle}>
            {classData.title}
            {" "}
            {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
          </Typography>
        </Grid>
      </Grid>


      <Grid container spacing={1}>
        <Grid item md={9} xs={9}>
          <Grid container spacing={1}>
            {
              classData.type === "V"
                ? (
                  <Grid item md={8} xs={8}>
                    <ReactPlayer
                      url={classData.url}
                      width={500}
                      controls
                    />
                  </Grid>
                )
                : classData.type === "P"
                  ? (
                    <Grid item md={8} xs={8} style={{ overflow: "auto", height: "75vh" }}>
                      <PDFComponent pdfFileName={pdfVal} />
                    </Grid>
                  )
                  : null
            }

            <Grid item md={3} xs={3} style={{ marginLeft: "20px" }}>

              {/* Commented out because not working, David Feb 18 2022
                            <Grid item md={12} xs={12} >
                                <FormControlLabel
                                    label="Completed: "
                                    labelPlacement="start"
                                    style={{ marginLeft: "0px" }}
                                    control={
                                        <Switch
                                            checked={completed}
                                            onChange={handleSwitchChange}
                                            name="completed"
                                            color="primary"

                                        />
                                    }
                                />
                            </Grid>

                            <Grid item md={12} xs={12}>
                                <label style={{ fontSize: "14px", color: "#37474f" }}>Completion Date: {classData.completion_dt === null ? '-' : dateTimeFormat(classData.completion_dt)}</label>
                            </Grid>
                            */}

              <Grid item md={12} xs={12}>
                <Button
                  style={{ backgroundColor: "#2979ff", marginTop: "20px" }}
                  variant="contained"
                  color="secondary"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Button
                  style={{ backgroundColor: "#2979ff", marginTop: "20px", marginLeft: "15px" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Grid>

            </Grid>

          </Grid>

          {
            classData.type === "V"
              ? (
                <Grid container spacing={1} style={{ marginTop: "20px", overflow: "auto" }}>
                  <Grid item md={12} xs={12}>
                    <Typography className={classes.highlighTitle}> Highlights</Typography>
                    <Typography
                      className={classes.highlightValue}
                      dangerouslySetInnerHTML={{ __html: `${highlightsVal}` }}
                    />
                  </Grid>
                </Grid>
              )
              : null
          }

        </Grid>


      </Grid>

    </div>
  );
}
