import {useMemo} from "react";

import {GridLayout, type LayoutItem, useContainerWidth, useResponsiveLayout} from "react-grid-layout";

import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import HUWidgetContainer from "../../../components/HUWidgetContainer/HUWidgetContainer.tsx";
import {observer} from "mobx-react";
import WidgetsStore from "../../../store/widgetsStore.ts";
import HUWidgetsSelector from "../../../components/WidgetsSelector/HUWidgetsSelector.tsx";


const dragConfig = {
  handle: ".drag-handle",
  enabled: true,
};

export interface GridLayoutPropsI {
}

const GridLayoutContainer = observer(({}: GridLayoutPropsI) => {
  const layouts = {lg: WidgetsStore.widgetsLayout};
  const useContainerWidthResult = useContainerWidth();
  const {width, containerRef} = useContainerWidthResult;

  const useResponsiveLayoutResult = useResponsiveLayout({
    width,
    breakpoints: {lg: 0},
    cols: {lg: 6},
    layouts,
  });
  const {layout, cols} = useResponsiveLayoutResult;

  const gridConfig = useMemo(() => {
    return {
      rowHeight: 150,
      cols,
    };
  }, [cols]);

  const onLayoutChange = (e: LayoutItem[]) => {
    console.log(e)
    WidgetsStore.widgetsLayout = e;
  };

  return (
    <div ref={containerRef} style={{width: '100%', height: '550px'}}>
      <GridLayout
        style={{height: '100%'}}
        width={width}
        layout={layout}
        onLayoutChange={le => onLayoutChange(le as LayoutItem[])}
        dragConfig={dragConfig}
        gridConfig={gridConfig}
      >
        {layouts.lg.map((item) => (
          <div key={item.i}>
            <HUWidgetContainer onDelete={() => WidgetsStore.deleteWidget(item.i)}>
              <HUWidgetsSelector type={WidgetsStore.getWidgetType(item.i)}/>
            </HUWidgetContainer>
          </div>
        ))}
      </GridLayout>
    </div>
  );
})

export default GridLayoutContainer;