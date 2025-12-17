import { useState, useRef } from "react";
import { Container, FloatingIndicator, Tabs, Text } from "@mantine/core";
import classes from "./Book.module.css";
import AllBooks from "../../components/allboks/AllBooks";

const Books = () => {
  const rootRef = useRef(null);
  const controlsRefs = useRef({});
  const [value, setValue] = useState("1");

  const setControlRef = (val) => (node) => {
    if (node) controlsRefs.current[val] = node;
  };

  return (
    <div className="h-full max-w-full pt-4">
      <div className="flex flex-col h-[calc(100vh-60px)]">
        <div className="flex items-center justify-between">
          <Tabs
            variant="none"
            value={value}
            onChange={setValue}
            className="flex-grow"
          >
            <Tabs.List ref={rootRef} className={classes.list}>
              <div className="flex gap-2 items-center">
                <Tabs.Tab
                  value="1"
                  ref={setControlRef("1")}
                  className={classes.tab}
                >
                  Barcha kitoblar
                </Tabs.Tab>
                <Tabs.Tab
                  value="2"
                  ref={setControlRef("2")}
                  className={classes.tab}
                >
                  Sevimlilar
                </Tabs.Tab>
                <Tabs.Tab
                  value="3"
                  ref={setControlRef("3")}
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
          </Tabs>

          <div className="flex items-center gap-2 w-[35%] justify-end ml-4">
            <input
              placeholder="Q kitob nomi bo'yicha qidirish"
              className="w-[280px] bg-[#1a1a1a] text-white px-3 py-2 rounded-sm border border-[#2d3748] focus:border-[#6366f1] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-[20px] overflow-y-auto flex-grow">
          <Tabs value={value}>
            <Tabs.Panel value="1">
              <AllBooks />
            </Tabs.Panel>
            <Tabs.Panel value="2">
              <AllBooks type="liked" />
            </Tabs.Panel>
            <Tabs.Panel value="5">
              <AllBooks type="az" />
            </Tabs.Panel>
            <Tabs.Panel value="6">
              <AllBooks type="za" />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Books;
