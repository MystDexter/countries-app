import React, { useState, useEffect, Fragment } from "react";
import { makeStyles, createStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing(2),
    },
    paginationItem: {
      // border: "2px solid",
      padding: theme.spacing(2),
      borderRadius: "50%",
      margin: `0 ${theme.spacing(0.25)}px`,
    },
    paginationItemActive: {
      border: "2px solid",
      padding: theme.spacing(2),
      borderRadius: "50%",
      margin: `0 ${theme.spacing(0.25)}px`,
      pointerEvents: "none",
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

        {getPaginationGroup().map((item, index) => (
          <Button
            key={index}
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
            {item}
          </Button>
        ))}

        <Button
          onClick={goToNextPage}
          className={classes.direction}
          variant="outlined"
          disabled={currentPage === pages ? true : false}
          size="small"
        >
          next
        </Button>
      </div>
    </Fragment>
  );
}

export default Pagination;
