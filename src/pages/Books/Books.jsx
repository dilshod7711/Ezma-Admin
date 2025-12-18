import { useState, useRef } from "react";
import { FloatingIndicator, Tabs } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import classes from "./Book.module.css";
import AllBooks from "../../components/allboks/AllBooks";

const Books = () => {
  const rootRef = useRef(null);
  const controlsRefs = useRef({});
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const setControlRef = (val) => (node) => {
    if (node) controlsRefs.current[val] = node;
  };

  return (
    <div className="h-full max-w-full pt-4">
      <div className="flex flex-col h-[calc(100vh-60px)]">
        <div className="flex items-center justify-between px-4">
          <Tabs
            variant="none"
            value={activeTab}
            onChange={setActiveTab}
            className="flex-grow"
          >
            <Tabs.List ref={rootRef} className={classes.list}>
              <div className="flex gap-2 items-center">
                <Tabs.Tab
                  value="all"
                  ref={setControlRef("all")}
                  className={classes.tab}
                >
                  Barcha kitoblar
                </Tabs.Tab>
                <Tabs.Tab
                  value="liked"
                  ref={setControlRef("liked")}
                  className={classes.tab}
                >
                  Sevimlilar
                </Tabs.Tab>
                <Tabs.Tab
                  value="az"
                  ref={setControlRef("az")}
                  className={classes.tab}
                >
                  A-Z
                </Tabs.Tab>
                <Tabs.Tab
                  value="za"
                  ref={setControlRef("za")}
                  className={classes.tab}
                >
                  Z-A
                </Tabs.Tab>
                <FloatingIndicator
                  target={activeTab ? controlsRefs.current[activeTab] : null}
                  parent={rootRef.current}
                  className={classes.indicator}
                />
              </div>
            </Tabs.List>
          </Tabs>

          <div className="flex items-center gap-2 w-[35%] justify-end">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Kitob nomi bo'yicha qidirish"
              className="w-[280px] bg-[#1a1a1a] text-white px-3 py-2 rounded-sm border border-[#2d3748] focus:border-[#6366f1] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-[20px] overflow-y-auto flex-grow px-4">
          <AllBooks type={activeTab} search={debouncedSearch} />
        </div>
      </div>
    </div>
  );
};

export default Books;
