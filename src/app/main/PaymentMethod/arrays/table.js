import { addCommas } from "@persian-tools/persian-tools";

export const columns = [
  {
    Header: "تاریخ صدور بارنامه",
    accessor: (row) => row.tarikh_sodoor.split(" ")[0],
    sortable: true,
  },
  {
    Header: "راننده اول",
    accessor: (row) => (
      <>
        <span>{row?.name_d1}</span>
        <br />
        <span>{`(${row?.firstdrivernationalid})`}</span>
      </>
    ),
    sortable: true,
  },
  {
    Header: "فرستنده / گیرنده",
    accessor: (row) => row["sendname"] + " / " + row["receivename"],
    sortable: true,
  },
  {
    Header: "تاریخ تخلیه",
    accessor: "unload_date",
    sortable: true,
  },
  {
    Header: "کرایه قابل پرداخت",
    accessor: "owner_way_bill[0].agreed_fare",
  },
];

export const subColumns = [
  {
    Header: "انعام",
    accessor: "bonus",
  },
  {
    Header: "روش محاسبه",
    accessor: "calculation_method",
  },
  {
    Header: "جریمه",
    accessor: "",
  },
  {
    Header: "شرکت حمل",
    accessor: "sherkat_name",
  },
  {
    Header: "کد رهگیری",
    accessor: "rahgiry",
  },
  {
    Header: "مبدا",
    accessor: "mabda_name",
  },
  {
    Header: "مقصد",
    accessor: "maghsad_name",
  },
  {
    Header: "بارگیر",
    accessor: "bargir_name",
  },
  {
    Header: "کدملی گیرنده",
    accessor: "receivecode",
  },
  {
    Header: "کدملی فرستنده",
    accessor: "sendcode",
  },
  {
    Header: "کدپستی گیرنده",
    accessor: "receiveposti",
  },
  {
    Header: "کدپستی فرستنده",
    accessor: "sendposti",
  },
];

export const billwayInfo = [
  {
    Header: "راننده اول",
    accessor: "name_d1",
  },
  {
    Header: "کدملی راننده اول",
    accessor: "firstdrivernationalid",
  },
  {
    Header: "پلاک",
    accessor: "pelak",
  },
  {
    Header: "تاریخ صدور بارنامه",
    accessor: (row) => row.tarikh_sodoor.split(" ")[0],
  },
  {
    Header: "کالا",
    accessor: "kala_name",
  },
  {
    Header: "کرایه بارنامه",
    accessor: (row) => addCommas(row.kerayeh),
  },
  {
    Header: "وزن بارنامه (کیلوگرم)",
    accessor: (row) => addCommas(row.vazn),
  },
  {
    Header: "فرستنده",
    accessor: "sendname",
  },
  {
    Header: "گیرنده",
    accessor: "receivename",
  },
];

export const rentalStatement = [
  {
    Header: "کسری/اضافه:",
    accessor: "",
  },
  {
    Header: "بیمه",
    accessor: "",
  },
  {
    Header: "حق کارگزاری",
    accessor: "",
  },
  {
    Header: "حق کمیسیون",
    accessor: "",
  },
  {
    Header: "+ کسری/اضافه دستی",
    accessor: "",
  },
  {
    Header: "کرایه قابل پرداخت(ریال)",
    accessor: "",
  },
];
