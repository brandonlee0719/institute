import React, { useState, useEffect } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import accordionService from "../../../../../../services/accordion.service";
import useAuth from "../../../../../../hooks/useAuth";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordionColor: {
    backgroundColor: "#F5F5F5",
    color: "#3B3B3B",
    border: "1px solid #A9A9A9"
  },
  accordionIcon: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#F9C802",
    marginRight: "15px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: "25px"
  },
}));

const AccordionSideBar = () => {

  const { user, logout } = useAuth();
  const classes = useStyles();
  const [accordianMenuDetails, setAccordianMenuDetails] = useState([]);
  const [accordionClassData, setAccordionClassData] = useState([]);


  async function fetchAccordianMenu() {
    const data = await accordionService.getAccordian();
    const classData = await accordionService.getAccordionClassdata(user.id);


    //id: 1
    // name: "Case Studies"
    // sort: 1

    //     completion_dt: null
    // id: 1
    // length: null
    // module_id: 23
    // sort: 10
    // title: "GI MAP Interpretive Guide.pdf"
    // type: "P"

    setAccordianMenuDetails(data);
    setAccordionClassData(classData);

  }

  useEffect(() => {
    fetchAccordianMenu();
  }, []);

  return (
    accordianMenuDetails.map((item, index) => (
      <div key={index} className={classes.root}>
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={index}
            id={index}
            className={classes.accordionColor}
          >
            <CheckCircleIcon className={classes.accordionIcon} />
            <Typography className={classes.heading}>{item.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    ))
  );
};

export default AccordionSideBar;
