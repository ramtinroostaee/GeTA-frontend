import { useCallback, useMemo, useRef, useState } from "react";
import FormCreate from "../Form/FormCreate";
import { Icon, IconButton } from "@mui/material";

const EditableCell = ({
  value,
  column: { id, Header, FormCreateType, onEdit },
  row,
}) =>
  FormCreateType ? (
    <FormCell
      value={value}
      {...{ id, Header, FormCreateType, onEdit }}
      row={row}
    />
  ) : (
    <p>{value}</p>
  );

export default EditableCell;

const FormCell = ({ value, id, Header, FormCreateType, onEdit, row }) => {
  const [edit, setEdit] = useState(false);
  const FormikRef = useRef();
  const form_data = useMemo(
    () => [
      {
        init: value,
        name: id,
        label: Header,
        type: FormCreateType,
        grid: { className: "w-128" },
        autoFocus: true,
      },
    ],
    [value, id, FormCreateType, Header]
  );
  const onSubmit = useCallback(
    (value) => {
      setEdit(false);
      onEdit(value, row);
    },
    [onEdit, row]
  );
  const OpenEditable = useCallback(() => setEdit(true), []);
  const CloseEditable = useCallback(() => setEdit(false), []);

  // const shouldEdit = useMemo(() => {
  //   const keys = Object.keys(row.original.errors);
  //   if (keys.findIndex((e) => e === id) >= 0) {
  //     return true;
  //   }
  // }, [row, id]);

  return edit ? (
    <div className="flex justify-start items-center">
      <FormCreate onSubmit={onSubmit} inputData={form_data} ref={FormikRef} />
      <IconButton
        size="small"
        onClick={() => FormikRef?.current?.handleSubmit()}
      >
        <Icon fontSize="small">check</Icon>
      </IconButton>
      <IconButton size="small" onClick={CloseEditable}>
        <Icon fontSize="small">close</Icon>
      </IconButton>
    </div>
  ) : (
    <p className="w-192 py-20 pr-8 " onDoubleClick={OpenEditable}>
      {value}
    </p>
  );
};
