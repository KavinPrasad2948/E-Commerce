import   { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import PropTypes from "prop-types";

function Accordian({ options = [] }) {
  const [open, setOpen] = useState("1"); // Initialize with string "1"
  const toggle = (id) => {
    setOpen(open === id ? null : id); // Toggle between id and null
  };

  return (
    <div>
      <Accordion open={open} toggle={toggle}>
        {options.map((option, index) => (
          <AccordionItem key={`${option.title}-${index}`}>
            <AccordionHeader targetId={index.toString()}>{/* Convert to string */}
              {option.title}
            </AccordionHeader>
            <AccordionBody accordionId={index.toString()}>{/* Convert to string */}
              {option.description}
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

Accordian.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default Accordian;
