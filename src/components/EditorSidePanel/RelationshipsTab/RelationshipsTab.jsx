import Empty from "../Empty";
import SearchBar from "./SearchBar";
import RelationshipInfo from "./RelationshipInfo";
import LocateTargetPosition from "../../Tools/LocateTargetPosition";
import { Collapse } from "@douyinfe/semi-ui";
import { useTranslation } from "react-i18next";
import { useSelect, useDiagram } from "../../../hooks";
import { ObjectType } from "../../../data/constants";

export default function RelationshipsTab() {
  const { tables, relationships } = useDiagram();
  const { selectedElement, setSelectedElement } = useSelect();
  const { t } = useTranslation();

  return (
    <>
      <SearchBar />
      {relationships.length <= 0 ? (
        <Empty
          title={t("no_relationships")}
          text={t("no_relationships_text")}
        />
      ) : (
        <Collapse
          activeKey={
            selectedElement.open &&
              selectedElement.element === ObjectType.RELATIONSHIP
              ? `${selectedElement.id}`
              : ""
          }
          keepDOM={false}
          lazyRender
          onChange={(k) =>
            setSelectedElement((prev) => ({
              ...prev,
              open: true,
              id: parseInt(k),
              element: ObjectType.RELATIONSHIP,
            }))
          }
          accordion
          className="overflow-auto"
        >
          {relationships.map((r) => (
            <div id={`scroll_ref_${r.id}`} key={"relationship_" + r.id}>
              <Collapse.Panel
                header={
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
                    <LocateTargetPosition
                      position={() => {
                        const startTable = tables[r.startTableId];
                        const endTable = tables[r.endTableId];
                        return {
                          x: Math.min(startTable.x, endTable.x),
                          y: Math.min(startTable.y, endTable.y)
                        }
                      }}
                    />
                    {r.name}
                  </div>
                }
                itemKey={`${r.id}`}
              >
                <RelationshipInfo data={r} />
              </Collapse.Panel>
            </div>
          ))}
        </Collapse>
      )}
    </>
  );
}
