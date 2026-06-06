import {useMemo, useState} from "react";

import {GridLayout, useContainerWidth, useResponsiveLayout} from "react-grid-layout";

import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import {observer} from "mobx-react";
import HUWidgetContainer from "../../../components/HUWidgetContainer/HUWidgetContainer.tsx";

const dragConfig = {
  handle: ".drag-handle",
  enabled: true,
};

export function Grid() {
  const [layouts, setLayouts] = useState(
    {
      lg: [
        {
          i: "widget-1",
          x: 2,
          y: 0,
          w: 2,
          h: 1,
          isDraggable: true,
          isResizable: true,
        },
        {
          i: "widget-2",
          x: 0,
          y: 0,
          w: 2,
          h: 1,
          isDraggable: true,
          isResizable: true,
        },
      ],
    }
  );

  const useContainerWidthResult = useContainerWidth();
  const {width, containerRef} = useContainerWidthResult;

  const useResponsiveLayoutResult = useResponsiveLayout({
    width,
    breakpoints: {lg: 0},
    cols: {lg: 5},
    layouts,
  });
  const {layout, cols} = useResponsiveLayoutResult;

  const gridConfig = useMemo(() => {
    return {
      rowHeight: 100,
      cols,
    };
  }, [cols]);

  const onLayoutChange = (e) => {
    console.log(e);
    setLayouts({lg: e})
  };

  return (
    <div ref={containerRef} style={{width: '100%'}}>
      <GridLayout
        width={width}
        layout={layout}
        onLayoutChange={onLayoutChange}
        dragConfig={dragConfig}
        gridConfig={gridConfig}
      >
        <div key="widget-1">
          <HUWidgetContainer>
            HANDLE
            slflas
            s
            ]faskdlfk
          </HUWidgetContainer>
        </div>
        <div key="widget-2">
          <HUWidgetContainer>
            HANDLE2
          </HUWidgetContainer>
        </div>
      </GridLayout>
    </div>
  );
}


const MainPage = observer(() => {
  return (<Grid/>)
})

export default MainPage;