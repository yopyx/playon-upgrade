import { useOutletContext } from "react-router";
import { UiProps } from "../../types/props";

export function useUpdatedUi() {
  return useOutletContext<UiProps>();
}
