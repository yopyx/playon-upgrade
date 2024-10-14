import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/reduxHooks";
import { QuotaSliceState } from "../../types/slicesState";
import { updateQuota } from "../../redux/ui_slices/quotaSlice";

const useQuota = () => {
  const dispatch = useAppDispatch();
  const { quota, currentIndex } = useAppSelector(
    (store) => store.quota
  ) as QuotaSliceState;
  const keys: string[] = [
    import.meta.env.VITE_APP_YT_KEY,
    import.meta.env.VITE_APP_YT_KEY1,
    import.meta.env.VITE_APP_YT_KEY2,
    import.meta.env.VITE_APP_YT_KEY3,
    import.meta.env.VITE_APP_YT_KEY4,
    import.meta.env.VITE_APP_YT_KEY5,
    import.meta.env.VITE_APP_YT_KEY6,
  ];
  useEffect(() => {
    dispatch(updateQuota(0));
  }, [dispatch, quota]);
  return keys[currentIndex];
};
export default useQuota;
