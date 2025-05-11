import { useState } from "react";
import { Collapse, Button } from "@douyinfe/semi-ui";
import { IconPlus } from "@douyinfe/semi-icons";
import LocateTargetPosition from "../../Tools/LocateTargetPosition";
import { useSelect, useDiagram, useSaveState } from "../../../hooks";
import { ObjectType, State } from "../../../data/constants";
import { useTranslation } from "react-i18next";
import { DragHandle } from "../../SortableList/DragHandle";
import { SortableList } from "../../SortableList/SortableList";
import SearchBar from "./SearchBar";
import Empty from "../Empty";
import TableInfo from "./TableInfo";

export default function TablesTab() {
  const { tables, addTable, setTables } = useDiagram();
  const { selectedElement, setSelectedElement } = useSelect();
  const [activeKey, setActiveKey] = useState("");
  const { t } = useTranslation();
  const { setSaveState } = useSaveState();

  const selectedActiveKey =
    (selectedElement.open && selectedElement.element === ObjectType.TABLE
      ? `${selectedElement.id}`
      : "") || activeKey;
  return (
    <>
      <div className="flex gap-2">
        <SearchBar tables={tables} />
        <div>
          <Button icon={<IconPlus />} block onClick={() => addTable()}>
            {t("add_table")}
          </Button>
        </div>
      </div>
      {tables.length === 0 ? (
        <Empty title={t("no_tables")} text={t("no_tables_text")} />
      ) : (
        <Collapse
          activeKey={[selectedActiveKey]}
          keepDOM
          lazyRender
          onChange={(k) => {
            setActiveKey(k[0] ?? "");
            setSelectedElement((prev) => ({
              ...prev,
              open: true,
              id: k[0],
              element: ObjectType.TABLE,
            }))
          }}
          accordion
          className="overflow-auto"
        >
          <SortableList
            keyPrefix="tables-tab"
            items={tables}
            onChange={(newTables) => setTables(newTables)}
            afterChange={() => setSaveState(State.SAVING)}
            renderItem={(item) => <TableListItem table={item} />}
          />
        </Collapse >
      )
}
    </>
  );
}

function TableListItem({ table }) {
  return (
    <div id={`scroll_table_${table.id}`}>
      <Collapse.Panel
        className="relative"
        header={
          <>
            <div className="flex items-center gap-2">
              <DragHandle id={table.id} />
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                <LocateTargetPosition position={{ x: table.x, y: table.y }} />
                {table.name}
              </div>
            </div>
            <div
              className="w-1 h-full absolute top-0 left-0 bottom-0"
              style={{ backgroundColor: table.color }}
            />
          </>
        }
        itemKey={`${table.id}`}
      >
        <TableInfo data={table} />
      </Collapse.Panel>
    </div>
  );
}
