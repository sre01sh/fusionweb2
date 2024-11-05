import { Panel } from '@xyflow/react';
import { tw } from 'twind';
import StandardIcon from './StandardIcon';
import ReworkIcon from './ReworkIcon';
import { useDnD } from './DnDContext';
import type { DragEvent } from 'react';
 
export default () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setType] = useDnD();

    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
      setType(nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <Panel position="top-left" >
            <div className={tw("mb-2")} onDragStart={(event) => onDragStart(event, 'STANDARD')} draggable >
              <StandardIcon />
            </div>
            <div className={tw("mb-2")} onDragStart={(event) => onDragStart(event, 'REWORK')}  draggable>
              <ReworkIcon />
            </div>
      </Panel>
    );
}
