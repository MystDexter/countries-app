import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles, createStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: `${theme.spacing(1)}px 0 ${theme.spacing(2)}px 0`,
    },
    paginationItem: {
      padding: theme.spacing(2),
      borderRadius: "50%",
      margin: `0 ${theme.spacing(0.25)}px`,
      color:
        theme.palette.type == "dark" ? "inherit" : theme.palette.primary.main,
    },
    paginationItemActive: {
      padding: theme.spacing(2),
      borderRadius: "50%",
      margin: `0 ${theme.spacing(0.25)}px`,
      pointerEvents: "none",
      color: theme.palette.type == "dark" ? "black" : "white",
      backgroundColor:
        theme.palette.type == "dark" ? "white" : theme.palette.primary.main,
    },
    direction: {
      margin: `0 ${theme.spacing(1)}px`,
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

  const pageButtons = () => {
    return getPaginationGroup().map((item, index) => (
      <Fragment key={index}>
        {item <= pages ? (
          <Button
            onClick={handleChangePage}
            variant={currentPage === item ? "contained" : "text"}
            color="primary"
            className={
              currentPage === item
                ? classes.paginationItemActive
                : classes.paginationItem
            }
            style={{ maxWidth: 16, maxHeight: 16, minWidth: 16, minHeight: 16 }}
          >
            {item <= pages ? item : ""}
          </Button>
        ) : (
          ""
        )}
      </Fragment>
    ));
  };

  return (
    <Fragment>
      <RenderComponent data={getPaginatedData()} />
      <div className={classes.pagination}>
        <Button
          onClick={goToPreviousPage}
          className={classes.direction}
          variant="outlined"
          size="small"
          disabled={currentPage === 1 ? true : false}
        >
          prev
        </Button>

        {pageButtons()}

        <Button
          onClick={goToNextPage}
          className={classes.direction}
          variant="outlined"
          disabled={
            currentPage === pages
              ? true
              : data.length / dataLimit <= currentPage
              ? true
              : false
          }
          size="small"
        >
          next
        </Button>
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
