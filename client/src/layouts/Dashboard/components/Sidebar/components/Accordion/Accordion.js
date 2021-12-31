import React, { useState, useEffect } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import accordionService from "../../../../../../services/accordion.service";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AccordionSideBar = () => {
  const classes = useStyles();
  const [accordianMenuDetails, setAccordianMenuDetails] = useState([]);


  async function fetchAccordianMenu() {
    const data = await accordionService.getAccordian();


    setAccordianMenuDetails(data);
  }

  useEffect(() => {
    fetchAccordianMenu();
  }, []);
  return (
    accordianMenuDetails.map((item) => (
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
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
    // <div className={classes.root}>
    //     {/* {
    //         accordianMenuDetails.map(item => {
    //             <Accordion>
    //                 <AccordionSummary
    //                     expandIcon={<ExpandMoreIcon />}
    //                     aria-controls="panel1a-content"
    //                     id="panel1a-header"
    //                 >
    //                     <Typography className={classes.heading}>{item.name}</Typography>
    //                 </AccordionSummary>
    //                 <AccordionDetails>
    //                     <Typography>
    //                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
    //                         sit amet blandit leo lobortis eget.
    //                     </Typography>
    //                 </AccordionDetails>
    //             </Accordion>
    //         })
    //     } */}
    //     <Accordion>
    //         <AccordionSummary
    //             expandIcon={<ExpandMoreIcon />}
    //             aria-controls="panel1a-content"
    //             id="panel1a-header"
    //         >
    //             <Typography className={classes.heading}>Accordion 1</Typography>
    //         </AccordionSummary>
    //         <AccordionDetails>
    //             <Typography>
    //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
    //                 sit amet blandit leo lobortis eget.
    //             </Typography>
    //         </AccordionDetails>
    //     </Accordion>
    //     <Accordion>
    //         <AccordionSummary
    //             expandIcon={<ExpandMoreIcon />}
    //             aria-controls="panel2a-content"
    //             id="panel2a-header"
    //         >
    //             <Typography className={classes.heading}>Accordion 2</Typography>
    //         </AccordionSummary>
    //         <AccordionDetails>
    //             <Typography>
    //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
    //                 sit amet blandit leo lobortis eget.
    //             </Typography>
    //         </AccordionDetails>
    //     </Accordion>
    //     <Accordion disabled>
    //         <AccordionSummary
    //             expandIcon={<ExpandMoreIcon />}
    //             aria-controls="panel3a-content"
    //             id="panel3a-header"
    //         >
    //             <Typography className={classes.heading}>Disabled Accordion</Typography>
    //         </AccordionSummary>
    //     </Accordion>
    // </div>
  );
};

export default AccordionSideBar;
