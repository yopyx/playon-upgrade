import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/reduxHooks";
import { QuotaSliceState } from "../../types/slicesState";
import { updateQuota } from "../../redux/ui_slices/quotaSlice";

const useQuota = () => {
  const dispatch = useAppDispatch();
  const { quota, keys } = useAppSelector(
    (store) => store.quota
  ) as QuotaSliceState;
  useEffect(() => {
    dispatch(updateQuota(0));
  }, [dispatch, quota]);
  return keys[0];
};
export default useQuota;
