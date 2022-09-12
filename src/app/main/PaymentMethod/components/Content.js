import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import {createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {Button, Paper, Checkbox} from "@mui/material";
import {motion} from "framer-motion";
import EnhancedTable from "reusable/Table";
import FormCreate from "reusable/Form/FormCreate";
import {checkAll, checkItem, GetBills, setPageConfig} from "../store/slice";
import {primaryFilters, secondaryFilters} from "../arrays/filters";
import {columns} from "../arrays/table";
// import Dialog from "./Dialog";
// import Info from "../../LadingBills/components/InfoDialog";
import {apiCallTry} from "reusable/axios";

const selectMaker = (data) =>
  createSelector(
    ({PaymentMethod}) => PaymentMethod.slice[data],
    (data) => data
  );

const buttonStuff = {
  variant: "contained",
  className: "rounded-6 min-w-96 mx-10",
  color: "secondary",
};

const PaymentMethodContent = () => {
  const [info, setInfo] = useState();
  const [formOpen, setFormOpen] = useState();
  const FormikRef = useRef();
  const dispatch = useDispatch();
  const links = useSelector(selectMaker("links"));
  const meta = useSelector(selectMaker("meta"));
  const page = useSelector(selectMaker("page"));
  const tableData = useSelector(selectMaker("data"));
  const sort = useSelector(selectMaker("sort"));
  const [bankAccounts, setBankAccounts] = useState([]);
  const [moreFilters, setMoreFilters] = useState(false);

  const TheColumns = useMemo(
    () => [
      {
        id: "checkbox",
        Header: (
          <Checkbox
            className="p-0 m-0"
            onChange={(e) => dispatch(checkAll({checked: e.target.checked}))}
          />
        ),
        sortable: false,
        Cell: ({row}) => (
          <Checkbox
            className="px-0 mx-0"
            onChange={(e) =>
              dispatch(
                checkItem({index: row.index, checked: e.target.checked})
              )
            }
            checked={!!row?.original?.checked}
          />
        ),
      },
      {
        id: "collapse",
        collapsable: true,
        Header: "",
        sortable: false,
        Cell: ({row}) =>
          [
            {
              set: (the) => setFormOpen(the),
              hover: "تعیین شیوه پرداخت",
            },
          ].map((e) => (
            <Button
              key={e.hover}
              variant="contained"
              color="primary"
              onClick={() => row && e.set(row.original)}
              className="mx-6 my-12"
            >
              <span>{e.hover}</span>
            </Button>
          )),
      },
      {
        Header: "شماره بارنامه",
        accessor: (row) => (
          <div
            className="underline text-blue-300 cursor-pointer"
            onClick={() => row && setInfo(row)}
          >
            {row["shomareh_barnameh"] + " -- " + row["serial_barnameh"]}
          </div>
        ),
        sortable: true,
      },
      ...columns,
    ],
    []
  );

  useEffect(async () => {
    const response = await apiCallTry(() =>
      axios.get("api/bankAccount?perPage=20&page=1")
    );

    if (response) {
      setBankAccounts(response.data.data);
    }
  }, []);

  const onSubmit = useCallback((formValue) => {
    let filters = "";
    for (let key in formValue) {
      if (formValue[key] !== "" && formValue[key] !== undefined) {
        filters += `&${key}=${formValue[key]}`;
      }
    }
    dispatch(setPageConfig({filters, page: 1}));
    dispatch(GetBills());
  }, []);

  const inputData = useMemo(
    () =>
      moreFilters
        ? [..._.cloneDeep(primaryFilters), ..._.cloneDeep(secondaryFilters)]
        : _.cloneDeep(primaryFilters),
    [moreFilters]
  );

  return (
    <>
      <Paper
        elevation={0}
        className="flex items-center justify-center flex-wrap w-full py-16 px-16 mb-16"
      >
        <FormCreate
          grid={{spacing: 3, className: "justify-center", columns: 8}}
          onSubmit={onSubmit}
          inputData={inputData}
          ref={FormikRef}
        />
        <div className="flex items-center mt-5">
          <Button
            variant="contained"
            className="rounded-6 min-w-96 mx-5"
            color="secondary"
            onClick={() => FormikRef?.current?.handleSubmit()}
          >
            اعمال فیلتر
          </Button>
          <Button
            className="underline"
            onClick={() => setMoreFilters((pre) => !pre)}
          >
            <span className="mx-5">
              فیلتر های {moreFilters ? " کمتر" : "بیشتر"}
            </span>
          </Button>
        </div>
      </Paper>

      <Paper
        elevation={0}
        className="flex justify-end items-center flex-wrap w-full py-16 px-16 mb-16"
      >
        <Button disabled {...buttonStuff}>
          خروجی اکسل
        </Button>
      </Paper>

      <motion.div
        initial={{y: 100, opacity: 0}}
        animate={{y: 0, opacity: 1, transition: {delay: 0.4}}}
      >
        <EnhancedTable
          columns={TheColumns}
          data={tableData}
          onRowClick={() => {
          }}
          collapsable
          actions={{
            sort,
            page,
            meta,
            links,
            setPageConfig: (config) => {
              dispatch(setPageConfig(config));
              dispatch(GetBills());
            },
          }}
        />
      </motion.div>

      {/*<Dialog*/}
      {/*  bankAccounts={bankAccounts}*/}
      {/*  formOpen={formOpen}*/}
      {/*  setFormOpen={setFormOpen}*/}
      {/*/>*/}
      {/*<Info info={info} setInfo={setInfo} />*/}
    </>
  );
};

export default PaymentMethodContent;
