import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  createStyles,
  Button,
  ButtonGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: `${theme.spacing(1)}px 0 ${theme.spacing(2)}px 0`,
    },
    paginationItemActive: {
      pointerEvents: "none",
      color: theme.palette.type == "dark" ? "black" : "white",
      backgroundColor:
        theme.palette.type == "dark" ? "white" : theme.palette.primary.main,
    },
  })
);

function Pagination({
  data,
  RenderComponent,
  pageLimit,
  dataLimit,
  isFiltered,
}) {
  const classes = useStyles();

  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isFiltered) {
      setCurrentPage(1);
    }
  }, [isFiltered]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  const handleChangePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <Fragment>
      <RenderComponent data={getPaginatedData()} />
      <div className={classes.pagination}>
        <ButtonGroup variant="outlined">
          {/* <Button>«</Button> */}
          <Button
            onClick={goToPreviousPage}
            className={classes.direction}
            disabled={currentPage === 1 ? true : false}
          >
            Prev
            {/* ‹ */}
          </Button>

          {getPaginationGroup().map((item, index) => (
            <Button
              onClick={handleChangePage}
              className={
                currentPage === item ? classes.paginationItemActive : null
              }
              style={{ display: item <= pages ? "inherit" : "none" }}
            >
              {item <= pages ? item : ""}
            </Button>
          ))}

          <Button
            onClick={goToNextPage}
            className={classes.direction}
            disabled={
              currentPage === pages
                ? true
                : data.length / dataLimit <= currentPage
                ? true
                : false
            }
          >
            Next
            {/* › */}
          </Button>
          {/* <Button>»</Button> */}
        </ButtonGroup>
      </div>
    </Fragment>
  );
}

Pagination.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  RenderComponent: PropTypes.func.isRequired,
  pageLimit: PropTypes.number.isRequired,
  dataLimit: PropTypes.number.isRequired,
};

export default Pagination;
