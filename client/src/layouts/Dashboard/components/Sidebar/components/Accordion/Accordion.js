/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";


import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons//RadioButtonUncheckedOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import { NavLink as RouterLink, useHistory, useLocation } from "react-router-dom";

import HoverPopover from "../../../../../../components/HoverPopover";
import useAuth from "../../../../../../hooks/useAuth";
import accordionService from "../../../../../../services/accordion.service";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordionColor: {
    backgroundColor: "#F5F5F5",
    color: "#3B3B3B",
    border: "1px solid #A9A9A9",
  },
  accordionIcon: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#F9C802",
    marginRight: "15px",
  },
  accordionSubIcon: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#F9C802",
    marginRight: "15px",
  },
  accordionSubText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "5px",
  },
  accordionListIcon: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightRegular,
    color: "black",
  },
  listView: {
    marginBottom: "10px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: "25px",
  },
  finishedClassHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: "25px",
    marginLeft: "auto",
  },
  subLink: {
    color: "black",
    textDecoration: "none",
  },
  subText: {
    fontSize: "10px",
    color: "black",
  },
}));

const AccordionSideBar = () => {
  const { user, logout } = useAuth();
  const classes = useStyles();
  const [accordianMenuDetails, setAccordianMenuDetails] = useState([]);
  const [accordionClassData, setAccordionClassData] = useState([]);
  const [consolidatedData, setConsolidatedData] = useState([]);

  const history = useHistory();

  const loc = useLocation();

  async function fetchAccordianMenu() {
    const filteredData = [];
    const data = await accordionService.getAccordian();
    const classData = await accordionService.getAccordionClassdata(user.id);


    data.map((e) => {
      const matchedClass = classData.filter((curr) => curr.module_id === e.id);
      const totalNumberOfClass = matchedClass.length;
      const classesFinished = matchedClass.filter((item) => item.completion_dt !== null);

      e.totalNumberOfClass = totalNumberOfClass;
      e.classesFinished = classesFinished.length;
      e.class = matchedClass;
    });

    const sortedModuleData = data.sort((a, b) => a.sort - b.sort);
    const classSort = sortedModuleData.map((curr) => {
      curr.class = curr.class.sort((item1, item2) => item1.sort - item2.sort);
      return curr;
    });

    setAccordianMenuDetails(classSort);
    setAccordionClassData(classData);
  }


  useEffect(() => {
    fetchAccordianMenu();
  }, []);

  return (
    accordianMenuDetails.map((item, index) => (
      <div key={index} className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={index}
            id={index}
            className={classes.accordionColor}
          >
            {
              item.class.length > 0
                ? item.class[0].completion_dt === null ? <RadioButtonUncheckedOutlinedIcon className={classes.accordionIcon} /> : <CheckCircleOutlineOutlinedIcon className={classes.accordionIcon} />
                : <RadioButtonUncheckedOutlinedIcon className={classes.accordionIcon} />
            }

            <Typography className={classes.heading}>{item.name}</Typography>

            <Typography className={classes.finishedClassHeading}>
              {item.classesFinished}
              /
              {item.totalNumberOfClass}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ maxWidth: "250px" }}>
              {

                item.class.map((e) => (

                  <div>
                    <Grid container>

                      <Grid item md={1} xs={1} />
                      <Grid item md={2} xs={2}>
                        {
                          e.completion_dt === null
                            ? <RadioButtonUncheckedOutlinedIcon className={classes.accordionSubIcon} />
                            : <CheckCircleOutlineOutlinedIcon className={classes.accordionSubIcon} />
                        }

                      </Grid>

                      <Grid item md={9} xs={9}>

                        <RouterLink className={classes.subLink} to={`/client/class/${e.id}`}>
                          <HoverPopover
                            bodyElement={e.title}
                          >
                            <p className={classes.accordionSubText}>{e.title}</p>
                          </HoverPopover>
                        </RouterLink>

                      </Grid>

                    </Grid>
                    {
                      e.type === "P" ? (
                        <Grid container>
                          <Grid item md={3} xs={3} />
                          <Grid item md={1} xs={1}>
                            <p className={classes.listView}><PictureAsPdfOutlinedIcon className={classes.accordionListIcon} /></p>
                          </Grid>

                          <Grid item md={5} xs={5}>
                            <p className={classes.subText}>PDF</p>
                          </Grid>
                        </Grid>
                      )
                        : (
                          <Grid container spacing={1}>
                            <Grid item md={3} xs={3} />
                            <Grid item md={1} xs={1}>
                              <p className={classes.listView}><VideocamOutlinedIcon className={classes.accordionListIcon} /></p>
                            </Grid>

                            <Grid item md={5} xs={5}>
                              <p className={classes.subText}>
                                VIDEO -
                                {e.length}
                                {" "}
                                MIN
                              </p>
                            </Grid>
                          </Grid>
                        )
                    }

                  </div>
                ))
              }
            </Typography>

          </AccordionDetails>
        </Accordion>
      </div>
    ))
  );
};

export default AccordionSideBar;
