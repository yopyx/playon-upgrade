import { useOutletContext } from "react-router-dom";
import { UiProps } from "../../types/props";

export function useUpdatedUi() {
  return useOutletContext<UiProps>();
}
