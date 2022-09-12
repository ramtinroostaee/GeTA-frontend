import {useCallback, useEffect} from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import ActionsComponent from "./ActionsComponent";
import PropTypes from "prop-types";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import clsx from "clsx";
import EditableCell from "./Editable";
import RowWithCollapsable from "./Collapsable";

const defaultColumn = {
  Cell: EditableCell,
};

const Row = ({row, onRowClick}) => (
  <TableRow
    hover={true}
    onClick={(ev) => onRowClick(ev, row)}
    className="truncate cursor-pointer py-32"
  >
    {row.cells.map((cell) => {
      return (
        <TableCell
          {...cell.getCellProps()}
          className={clsx("p-4 py-32 md:p-12", cell.column.className)}
        >
          {cell.render("Cell")}
        </TableCell>
      );
    })}
  </TableRow>
);

const EnhancedTable = ({
                         columns,
                         data,
                         onRowClick,
                         actions,
                         disableAction,
                         editable,
                         collapsable,
                       }) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: {pageIndex, pageSize},
  } = useTable(
    {
      columns,
      data,
      defaultColumn: editable ? defaultColumn : undefined,
      autoResetPage: true,
      initialState: {pageSize: 10},
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      gotoPage(newPage);
    },
    [gotoPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const size = parseInt(event.target.value);
      actions.setPageConfig({perPage: size, page: 1});
      setPageSize(size);
    },
    [setPageSize]
  );

  useEffect(() => {
    if (disableAction) {
      setPageSize(data.length === 0 ? 10 : data.length);
    }
  }, [data, setPageSize, disableAction]);

  return (
    <Box className="flex flex-col min-h-full sm:border-1 sm:rounded-16 mb-40">
      <Paper
        className="rounded-0 lg:rounded-16 lg:shadow p-10 pt-10"
        elevation={3}
      >
        <TableContainer className="flex flex-1">
          <Table {...getTableProps()} className="simple">
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      className="whitespace-nowrap p-4 md:p-12"
                      {...(!column.sortable
                        ? column.getHeaderProps()
                        : column.getHeaderProps(column.getSortByToggleProps()))}
                    >
                      {column.render("Header")}
                      {column.sortable ? (
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? "desc" : "asc"}
                        />
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {page.map((row) => {
                prepareRow(row);
                const the = {onRowClick, row};

                return collapsable ? (
                  <RowWithCollapsable {...row.getRowProps()} {...the} />
                ) : (
                  <Row {...row.getRowProps()} {...the} />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          style={{justifyContent: "center"}}
          classes={{
            root: "flex mt-10",
          }}
          rowsPerPageOptions={
            disableAction
              ? []
              : [
                5,
                10,
                25,
                {
                  label: "همه",
                  value:
                    (actions.meta ? actions.meta.total : data.length) + 1,
                },
              ]
          }
          colSpan={5}
          count={actions.meta?.total ?? data.length}
          labelDisplayedRows={({from, to, count}) => {
            if (disableAction) return;

            const item = (actions.page - 1) * pageSize;
            return `${item + from}-${item + to} از ${count}`;
          }}
          labelRowsPerPage={"ردیف در هر صفحه:"}
          rowsPerPage={pageSize}
          page={pageIndex}
          SelectProps={{
            inputProps: {"aria-label": "rows per page"},
            native: false,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={(e) =>
            !disableAction && (
              <ActionsComponent {...e} actions={actions} data={data}/>
            )
          }
        />
      </Paper>
    </Box>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default EnhancedTable;
