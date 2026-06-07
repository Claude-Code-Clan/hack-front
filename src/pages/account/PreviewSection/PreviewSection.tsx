import {observer} from "mobx-react";
import {Card, Modal} from "antd";
import {LayoutItem} from "react-grid-layout";
import WidgetsStore, {type WidgetType} from "../../../store/widgetsStore.ts";
import HUWidgetsSelector from "../../../components/WidgetsSelector/HUWidgetsSelector.tsx";
import {useNavigate} from "react-router";

interface PreviewSectionPropsI {
  widgetLayout?: LayoutItem[];
  widgetTypes?: WidgetType[];
  open?: boolean;
  onClose?: () => void;
}

const PreviewSection = observer(({widgetLayout, widgetTypes, open, onClose}: PreviewSectionPropsI) => {
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        width={1000}
        open={open}
        onCancel={onClose}
        cancelButtonProps={{hidden: true, style: {display: 'none'}}}
        onOk={() => {
          onClose?.();
          WidgetsStore.saveTo3DPreview();
          navigate('/account/scene');
        }}
        okText='Посмотреть в 3D'
      >
        <div style={{height: 564, position: 'relative'}}>
          {widgetTypes?.map(wt => {
            const currentLayout = widgetLayout?.find(w => w.i === wt.widgetId);

            const widthCoeficent =  1000 / 6.5;
            const heightCoeficent =  564 / 4;
            const gap = 4;

            const width = (currentLayout?.w ?? 0) * widthCoeficent;
            const height = (currentLayout?.h ?? 0) *  heightCoeficent;
            const top = (currentLayout?.y ?? 0) * heightCoeficent;
            const left = (currentLayout?.x ?? 0) * widthCoeficent;
            return (
              <div style={{width: width, height: height, position: 'absolute', overflow: 'hidden', top, left, padding: gap}}>
                <Card styles={{body: {padding: 8}}} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
                  <HUWidgetsSelector style={{scale: 0.9}} type={wt.type} key={`${wt.widgetId}_preview`}/>
                </Card>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
});

export default PreviewSection