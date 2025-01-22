import { IconDisc } from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";
import { useTransform } from "../../../hooks";

export default function LocateTargetPosition({ position }) {
  const { t } = useTranslation();
  const { locateTargetPosition } = useTransform();

  return <IconDisc
    className="me-1 hover:text-blue-500"
    title={t("locate")}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      if (typeof position === 'function') {
        const { x, y } = position();
        locateTargetPosition(x, y);
      } else {
        locateTargetPosition(position.x, position.y);
      }
    }}
  />
}