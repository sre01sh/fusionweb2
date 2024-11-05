import { SettingOutlined } from '@ant-design/icons';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Switch } from 'antd';
import { useEffect, useState } from 'react';
import { tw } from 'twind';
 
export default ({id,data}: {id: string, data: any}) => {
  const [nodeName, setNodeName] = useState<string>(data.label);
  const [allowAutoMoveIn, setAllowAutoMoveIn] = useState<boolean>(data.allowAutoMoveIn);
  const { setNodes } = useReactFlow();
  
  useEffect(() => {
    setNodes((nds: any) =>
      nds.map((node: any) => {
        if (node.id !== id) {
          return node;
        }
        return {
          ...node,
          data: {
            ...node.data,
            label: nodeName
          },
        };
      }),
    );
  }, [nodeName]);

  return (
    <div className={tw('rounded-md bg-white shadow-xl ')}>
      <p className={tw("text-lg rounded-t-md px-2 py-2 bg-pink-500 text-white flex justify-between items-center")}>
         <span>检测节点 [{id}]</span>
         <SettingOutlined onClick={()=>alert(id)} size={122}/>
      </p>
      <label className={tw('flex flex-col px-2 pt-2 pb-1')}>
        <input className={tw('text-lg font-bold')}
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />
      </label>

      <hr className={tw('border-gray-200 px-2 pt-1')} />

      <label className={tw('flex flex-col px-2 pt-2 pb-3')}>
      <p className={tw('text-lg flex justify-between items-center')}>
        允许自动MoveIn 
        <Switch defaultChecked={allowAutoMoveIn || false} onChange={checked => setAllowAutoMoveIn(checked)} />
      </p>
      </label>
      
      <Handle type="target" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
    </div>
  );
}
