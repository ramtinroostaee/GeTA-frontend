import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { Button } from "@mui/material";
import { WrapperD } from "reusable/Dialogs/FormDialog";
import {
  driverSheba,
  paymentMethod,
  shebaPart,
  thirdPersonSheba,
} from "../arrays/forms";
import Form from "./Form";
import { addCommas } from "@persian-tools/persian-tools";
import { WaybillInfo } from "../../LadingBills/components/AllInOneDialog";
import { apiCallTry } from "reusable/axios";
import axios from "axios";
import { toast } from "react-toastify";
import { GetBills } from "../store/slice";
import { useDispatch } from "react-redux";

const Dialog = ({ formOpen, setFormOpen, bankAccounts }) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => setFormOpen(), []);
  const fref2 = useRef();
  const [sheba, setSheba] = useState();
  const [driver, setDriver] = useState();
  const [bank, setBank] = useState([]);
  const [sheba_mabda, set_sheba_mabda] = useState([]);
  const [driverBankAccounts, setDriverBankAccounts] = useState({});

  useEffect(() => {
    setBank(() => bankAccounts.map((e) => ({ id: e.id, value: e.sheba })));
  }, [bankAccounts]);

  const refChange1 = useCallback(
    (node) => {
      if (node !== null) {
        if (sheba !== node.values?.beneficiaryBankAccountId) {
          setSheba(node.values.beneficiaryBankAccountId);
        }
        if (driver !== node.values?.beneficiaryType) {
          setDriver(node.values.beneficiaryType);
        }
        if (sheba_mabda !== node.values?.ownerAccountId) {
          set_sheba_mabda(node.values.ownerAccountId);
        }
      }
    },
    [sheba, driver, sheba_mabda]
  );

  const spliceItem = useCallback(
    (the, item) => the.splice(6, 2, ..._.cloneDeep(item)),
    []
  );

  useEffect(() => {
    if (!formOpen) {
      setDriver();
      setSheba();
      set_sheba_mabda();
      setDriverBankAccounts();
    }
  }, [formOpen]);

  const shebaCalcApi = useCallback(async (iban) => {
    const response = await apiCallTry(() =>
      axios.post("api/wallet/shebaInquiry", { iban })
    );

    if (response) {
      fref2?.current?.setFieldValue(
        "shebaOwnerName",
        response?.data?.ownername
      );
    }
  }, []);

  const shebaCalc = useCallback(async () => {
    const errors = await fref2?.current?.validateForm();
    if (!errors?.newSheba) {
      shebaCalcApi(fref2?.current?.values?.newSheba);
    }
  }, [shebaCalcApi]);

  const form = useMemo(() => {
    if (!formOpen) {
      return;
    }

    const saved = formOpen?.owner_way_bill[0];
    const the = _.cloneDeep(paymentMethod);
    the[1].options = bank ?? [];
    the[1].init = saved?.owner_account_id ?? "";
    the[3].init = String(saved?.beneficiary_type) ?? "";
    the[3].options[0].disabled = !formOpen?.firstdrivernationalid;
    the[3].options[1].disabled = !formOpen?.seconddrivernationalid;

    if (driver === "3") {
      the[4].textfield.disabled = false;
      the[5].textfield.disabled = false;
      spliceItem(the, thirdPersonSheba);
    } else {
      the[4].textfield.disabled = true;
      the[5].textfield.disabled = true;
      const shebaArray = _.cloneDeep(shebaPart);
      const driverAccounts =
        driverBankAccounts?.bank_accounts?.map((e) => ({
          value: e.sheba,
          id: e.id,
        })) ?? [];

      shebaArray[0].options = [
        ...driverAccounts,
        { id: "new", value: "شبا جدید" },
      ];

      spliceItem(the, shebaArray);
    }

    return driver === "3" || sheba === "new" ? [...the, ...driverSheba] : the;
  }, [sheba, driver, bank, formOpen, driverBankAccounts]);

  useEffect(async () => {
    let the;
    if (driver === "1") {
      the = { name: formOpen?.name_d1, id: formOpen?.firstdrivernationalid };
    } else if (driver === "2") {
      the = { name: formOpen?.name_d2, id: formOpen?.seconddrivernationalid };
    }

    fref2?.current?.setFieldValue("thirdPartyName", the?.name ?? "");
    fref2?.current?.setFieldValue("thirdPartyNationalCode", the?.id ?? "");
    const saved = formOpen?.owner_way_bill[0];

    if (driver === "3") {
      fref2?.current?.setFieldValue("beneficiaryBankAccountId", "new");

      if (String(saved?.beneficiary_type) === "3") {
        fref2?.current?.setFieldValue(
          "thirdPartyName",
          saved?.beneficiary?.name ?? ""
        );
        fref2?.current?.setFieldValue(
          "thirdPartyNationalCode",
          saved?.beneficiary?.national_code ?? ""
        );

        if (saved?.beneficiaryBankAccount?.sheba) {
          fref2?.current?.setFieldValue(
            "newSheba",
            saved?.beneficiaryBankAccount?.sheba
          );
          shebaCalcApi(saved?.beneficiaryBankAccount?.sheba);
        }
      }
    } else if (driver && driver !== "3" && the?.id && the?.id !== "") {
      const response = await apiCallTry(() =>
        axios.get("api/beneficiary/" + the?.id)
      );

      if (!response || response.data.data?.bank_accounts?.length === 0) {
        fref2?.current?.setFieldValue("beneficiaryBankAccountId", "new");
        if (saved?.beneficiaryBankAccount?.sheba) {
          fref2?.current?.setFieldValue(
            "newSheba",
            saved?.beneficiaryBankAccount?.sheba
          );
          shebaCalcApi(saved?.beneficiaryBankAccount?.sheba);
        }
      }

      if (response && response.data.data?.bank_accounts?.length > 0) {
        if (driver === String(saved?.beneficiary_type)) {
          if (saved?.beneficiaryBankAccount?.sheba) {
            const theSheba = response.data.data?.bank_accounts.find(
              (e) => e.sheba === saved?.beneficiaryBankAccount?.sheba
            );
            console.log(theSheba);

            if (theSheba?.id) {
              fref2?.current?.setFieldValue(
                "beneficiaryBankAccountId",
                theSheba?.id
              );
            } else {
              fref2?.current?.setFieldValue("beneficiaryBankAccountId", "new");

              fref2?.current?.setFieldValue(
                "newSheba",
                saved?.beneficiaryBankAccount?.sheba
              );
              shebaCalcApi(saved?.beneficiaryBankAccount?.sheba);
            }
          }
        } else {
          fref2?.current?.setFieldValue(
            "beneficiaryBankAccountId",
            driverBankAccounts?.bank_accounts.find((e) => e.isDefault === true)
              ?.id ?? ""
          );
        }
      }

      response && setDriverBankAccounts(response.data.data);
    }
  }, [driver, formOpen]);

  useEffect(async () => {
    const id = bankAccounts.find((e) => e.id === sheba_mabda)?.id;
    if (id) {
      const response = await apiCallTry(() =>
        axios.get(`api/bankAccount/balance?accountId=${id}`)
      );

      if (response) {
        fref2?.current?.setFieldValue(
          "balance",
          addCommas(response?.data?.balance)
        );
      }
    }
  }, [sheba_mabda, bankAccounts]);

  const handleSubmit = useCallback(
    async (values, saveSubmit) => {
      const {
        balance,
        beneficiaryType,
        beneficiaryBankAccountId,
        thirdPartyNationalCode,
        thirdPartyName,
        thirdPartyFile,
        isOkay,
        ...rest
      } = values;

      if (saveSubmit) {
        if (isOkay === false) {
          toast.error("تایید اطلاعات را تیک بزنید.");
          return;
        }

        if (thirdPartyFile !== undefined && !thirdPartyFile) {
          toast.error("فایل شخص ثالث مورد نیاز است.");
          return;
        }
      }

      const the = {
        wayBillId: [formOpen.id],
        beneficiaryType,
        thirdPartyFile,
        ...rest,
      };

      Object.assign(
        the,
        beneficiaryBankAccountId === "new"
          ? { isSetNewSheba: 1 }
          : { beneficiaryBankAccountId, isSetNewSheba: 0 }
      );

      if (beneficiaryType !== "3") {
        const beneficiaryId = await apiCallTry(() =>
          axios.get("api/beneficiary/" + thirdPartyNationalCode)
        );

        if (beneficiaryId) {
          the.beneficiaryId = beneficiaryId?.data?.data?.id;
        }
      } else {
        the.isSetNewSheba = 1;
        Object.assign(the, { thirdPartyName, thirdPartyNationalCode });
      }

      const formData = new FormData();
      Object.keys(the).forEach(
        (e) =>
          the[e] !== undefined && the[e] !== "" && formData.append(e, the[e])
      );

      const response = await apiCallTry(() =>
        axios.post(
          "api/stateWayBill/" +
            (saveSubmit ? "selectPaymentMethod" : "savePaymentMethod"),
          formData
        )
      );

      if (response) {
        toast.success(response?.data?.message);
        handleClose();
        dispatch(GetBills());
      }
    },
    [formOpen, handleClose]
  );

  const submit = useCallback(
    (values) => handleSubmit(values, true),
    [handleSubmit]
  );
  const save = useCallback(
    () => handleSubmit(fref2?.current?.values, false),
    [handleSubmit]
  );

  return (
    <WrapperD
      maxWidth="lg"
      handleClose={handleClose}
      open={!!formOpen}
      title="روش پرداخت"
    >
      <div className="flex flex-col">
        <WaybillInfo all={formOpen} />

        <div className="flex flex-col items-center mx-8 my-16">
          <Form
            inputData={form}
            ref={fref2}
            shebaCalc={shebaCalc}
            onRefChange={refChange1}
            onSubmit={submit}
            grid={{ spacing: 2, className: "justify-center" }}
          />
        </div>

        <div className="flex justify-start items-center">
          <Button
            variant="contained"
            className="rounded-6 mt-16 mx-8"
            color="secondary"
            id="method_submit_save"
            onClick={save}
          >
            ذخیره
          </Button>
          <Button
            variant="contained"
            className="rounded-6 mt-16 mx-8"
            color="secondary"
            id="method_submit_submit"
            type="submit"
            onClick={() => fref2?.current?.handleSubmit()}
          >
            ذخیره و تایید اطلاعات
          </Button>
        </div>
      </div>
    </WrapperD>
  );
};

export default Dialog;
