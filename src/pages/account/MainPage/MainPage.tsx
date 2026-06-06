import {observer} from 'mobx-react';
import {GridLayout} from "react-grid-layout";
import {useRef, useState} from "react";
import HUWidgetContainer from "../../../components/HUWidgetContainer/HUWidgetContainer.tsx";


const defaultLayout = [
  {i: "main-1", x: 0, y: 2, w: 12, h: 2},
  {i: "main-2", x: 0, y: 0, w: 2, h: 2},
]

const MainPage = observer(() => {
  const mainRef = useRef(null);
  const [layouts, setLayouts] = useState(defaultLayout);

  const moveItem = (oldItem, newItem) => {
    setLayouts((prev) => prev.map(item => {
      if (item.i === oldItem.i) {
        return newItem
      }
      return item
    }));
  };

  const handleDragStop = (layout, oldItem, newItem, placeholder, e) => {
    e.stopPropagation();
    moveItem(oldItem, newItem);
  };

  return (
    <div ref={mainRef} style={{width: 800, margin: "auto"}}>
      <GridLayout
        dragConfig={{
          enabled: true,
          handle: ".handle",
        }}
        autoSize
        layout={layouts}
        onDragStart={(l, o, n, p, e) => e.stopPropagation()}
        onDragStop={handleDragStop}
        style={{padding: 10, background: "#e6ffe6"}}
        width={10}
      >
        {layouts.map(item => {
          return (
            <HUWidgetContainer key={item.i}>
              {item.i}
            </HUWidgetContainer>
          );
        })}
      </GridLayout>
    </div>
  );
})

export default MainPage;