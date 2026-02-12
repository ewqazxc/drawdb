import { Collapse } from "@douyinfe/semi-ui";
import { useSelect, useDiagram, useSaveState, useLayout } from "../../../hooks";
import Empty from "../Empty";
import SearchBar from "./SearchBar";
import RelationshipInfo from "./RelationshipInfo";
import { ObjectType, State } from "../../../data/constants";
import { useTranslation } from "react-i18next";
import { SortableList } from "../../SortableList/SortableList";
import { DragHandle } from "../../SortableList/DragHandle";
import LocateTargetPosition from "../../Tools/LocateTargetPosition";

export default function RelationshipsTab() {
  const { tables, relationships, setRelationships } = useDiagram();
  const { selectedElement, setSelectedElement } = useSelect();
  const { setSaveState } = useSaveState();
  const { layout } = useLayout();
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
          onChange={(k) => {
            setSelectedElement((prev) => ({
              ...prev,
              open: true,
              id: k[0],
              element: ObjectType.RELATIONSHIP,
            }));
          }}
          accordion
          className="overflow-auto"
        >
          <SortableList
            keyPrefix="relationships-tab"
            items={relationships}
            onChange={(newRelationships) => setRelationships(newRelationships)}
            afterChange={() => setSaveState(State.SAVING)}
            renderItem={(item) => (
              <div id={`scroll_ref_${item.id}`} key={"relationship_" + item.id}>
                <Collapse.Panel
                  className="relative"
                  header={
                    <div className="w-full flex items-center gap-2">
                      <DragHandle readOnly={layout.readOnly} id={item.id} />
                      <LocateTargetPosition
                        position={() => {
                          const startTable = tables.find((t) => t.id === item.startTableId);
                          const endTable = tables.find((t) => t.id === item.endTableId);
                          return {
                            x: Math.min(startTable.x, endTable.x),
                            y: Math.min(startTable.y, endTable.y)
                          }
                        }}
                      />
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.name}
                      </div>
                    </div>
                  }
                  itemKey={`${item.id}`}
                >
                  <RelationshipInfo data={item} />
                </Collapse.Panel>
              </div>
            )}
          />
        </Collapse>
      )}
    </>
  );
}
