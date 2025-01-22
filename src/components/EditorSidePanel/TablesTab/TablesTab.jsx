import { useState } from "react";
import { Collapse, Button } from "@douyinfe/semi-ui";
import { IconPlus, IconDisc } from "@douyinfe/semi-icons";
import { useSelect, useDiagram, useTransform } from "../../../hooks";
import { ObjectType } from "../../../data/constants";
import SearchBar from "./SearchBar";
import Empty from "../Empty";
import TableInfo from "./TableInfo";
import { useTranslation } from "react-i18next";

export default function TablesTab() {
  const { locateTargetPosition } = useTransform();
  const { tables, addTable } = useDiagram();
  const { selectedElement, setSelectedElement } = useSelect();
  const [activeKey, setActiveKey] = useState("");
  const { t } = useTranslation();

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
              id: parseInt(k),
              element: ObjectType.TABLE,
            }))
          }}
          accordion
          className="overflow-auto"
        >
          {tables.map((table) => (
            <div id={`scroll_table_${table.id}`} key={table.id}>
              <Collapse.Panel
                className="relative"
                header={
                  <>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
                      <IconDisc
                        className="me-1 hover:text-blue-500"
                        title={t("locate")}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          locateTargetPosition(table.x, table.y);
                        }}
                      />
                      {table.name}
                    </div>
                    <div
                      className="w-1 h-full absolute top-0 left-0 bottom-0"
                      style={{ backgroundColor: table.color }}
                    />
                  </>
                }
                itemKey={`${table.id}`}
              >
                {selectedActiveKey === table.id + "" && <TableInfo data={table} />}
              </Collapse.Panel>
            </div>
          ))}
        </Collapse>
      )}
    </>
  );
}
