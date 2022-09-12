import React, {Fragment, useRef, useState} from "react";
import {
  Box,
  Collapse,
  Icon,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";

const RowWithCollapsable = ({row, onRowClick}) => {
  const [open, setOpen] = useState(false);
  const statusRef = useRef({});

  // const _onRowClick = useCallback(
  //   (ev, row) => {
  //      setOpen((pre) => !pre);
  //
  //     onRowClick(ev, row);
  //   },
  //   [onRowClick]
  // );

  return (
    <Fragment>
      <TableRow
        onClick={(ev) => onRowClick(ev, row)}
        hover={true}
        className="truncate"
      >
        {row.cells.map((cell, i) => {
          if (cell?.column?.collapsable) {
            statusRef.current = cell;

            return (
              <TableCell {...statusRef.current?.getCellProps()}>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen((pre) => !pre)}
                >
                  <Icon color="primary">
                    {open
                      ? "arrow_drop_down_circle_sharp"
                      : "arrow_drop_down_circle_sharp"}
                    {
                      // keyboard_arrow_up
                    }
                  </Icon>
                </IconButton>
              </TableCell>
            );
          } else
            return (
              <TableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </TableCell>
            );
        })}
      </TableRow>
      <TableRow className="truncate" hover={true}>
        <TableCell colSpan={100} style={{paddingBottom: 0, paddingTop: 0}}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{margin: 1}}>
              {statusRef.current?.render("Cell")}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default RowWithCollapsable;
