import { useState, useRef } from "react";
import { FloatingIndicator, Tabs, Text } from "@mantine/core";
import classes from "./Lib.module.css";
import LibrariyBooks from "../../components/librariBooks/LibrariyBooks";

const Libraries = () => {
  const rootRef = useRef(null);
  const controlsRefs = useRef({});
  const [value, setValue] = useState("1");
  const [search, setSearch] = useState("");

  const setControlRef = (val) => (node) => {
    if (node) controlsRefs.current[val] = node;
  };

  return (
    <div className="h-full max-w-full pt-4">
      <Tabs
        variant="none"
        value={value}
        onChange={setValue}
        className="flex flex-col h-[calc(100vh-60px)]"
      >
        <div className="flex items-center justify-between">
          <Tabs.List ref={rootRef} className={classes.list}>
            <div className="flex gap-2 items-center">
              <Tabs.Tab
                value="1"
                ref={setControlRef("1")}
                className={classes.tab}
              >
                Faol
              </Tabs.Tab>
              <Tabs.Tab
                value="2"
                ref={setControlRef("2")}
                className={classes.tab}
              >
                NoFaol
              </Tabs.Tab>
              <Tabs.Tab
                value="3"
                ref={setControlRef("3")}
                className={classes.tab}
              >
                Sevimlilar
              </Tabs.Tab>
              <Tabs.Tab
                value="4"
                ref={setControlRef("4")}
                className={classes.tab}
              >
                Ko'p kitoblar
              </Tabs.Tab>
              <Tabs.Tab
                value="5"
                ref={setControlRef("5")}
                className={classes.tab}
              >
                A-Z
              </Tabs.Tab>
              <Tabs.Tab
                value="6"
                ref={setControlRef("6")}
                className={classes.tab}
              >
                Z-A
              </Tabs.Tab>
              <FloatingIndicator
                target={value ? controlsRefs.current[value] : null}
                parent={rootRef.current}
                className={classes.indicator}
              />
            </div>
          </Tabs.List>

          <div className="flex items-center gap-2 w-[35%] justify-end ml-4">
            <input
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[280px] bg-[#1a1a1a] text-white px-3 py-2 rounded-sm border border-[#2d3748] focus:border-[#6366f1] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-[20px] overflow-y-auto flex-grow">
          <Tabs.Panel value="1">
            <LibrariyBooks type="active" search={search} />
          </Tabs.Panel>
          <Tabs.Panel value="2">
            <LibrariyBooks type="inactive" search={search} />
          </Tabs.Panel>
          <Tabs.Panel value="3">
            <LibrariyBooks type="liked" search={search} />
          </Tabs.Panel>
          <Tabs.Panel value="4">
            <LibrariyBooks type="most_books" search={search} />
          </Tabs.Panel>
          <Tabs.Panel value="5">
            <LibrariyBooks type="az" search={search} />
          </Tabs.Panel>
          <Tabs.Panel value="6">
            <LibrariyBooks type="za" search={search} />
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
};

export default Libraries;
