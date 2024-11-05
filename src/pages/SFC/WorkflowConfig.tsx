import { ProCard } from '@ant-design/pro-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl} from 'umi';
import type { ReactFlowInstance, Edge, Node } from '@xyflow/react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  MiniMap,
  Controls,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


import { getWorkflowGraph, submitSfcWorkflowGraph } from '@/services/api';
import ReworkNode from './workflow/ReworkNode';
import ButtonEdge from './workflow/ButtonEdge';
import StandardNode from './workflow/StandardNode';
import { DnDProvider, useDnD } from './workflow/DnDContext';
import IconBar from './workflow/IconBar';
import WorkflowList from './workflow/WorkflowList';
import type { DragEvent } from 'react';
import { tw } from 'twind';
import { customAlphabet } from 'nanoid';
import { message } from 'antd';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 10);

const DnDFlow: React.FC = () => {
  const intl = useIntl();
  const [id, setId] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const fetchWorkflowGraph = async () => {
      if(id){
      const graph = await getWorkflowGraph({
        wid: id,
      });
      console.log(graph);
      setNodes(graph?.data.nodes);
      setEdges(graph?.data.edges);
    }
  }
    fetchWorkflowGraph();
  }, [id, setEdges, setNodes]);

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { strokeWidth: 2 },id: nanoid(), }, eds)),
    [setEdges],
  );

  const { screenToFlowPosition } = useReactFlow();
  const [node_type] = useDnD();
  const onDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!node_type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: any = {
        id: nanoid(),
        type: node_type,
        position,
        data: { label: `new node ` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [node_type, screenToFlowPosition, setNodes],
  );


  const saveWorkflowGraph = async () => {
    try {
      // console.log({wid,opNodes,opEdges});
      console.log(rfInstance?.toObject())
      console.log({workflowId:id,nodes,edges});
      await submitSfcWorkflowGraph({workflowId: id,nodes,edges});
      message.success(intl.formatMessage({id: 'common.success'}));
    } catch (e) {
      console.log(e);
    }
    // reloadPage();
  };

 
  return (
    <ProCard split="vertical" style={{ height: '100%' }}>
      <ProCard colSpan="300px" ghost>
        <WorkflowList onChange={(wid) => setId(wid)} wid={id} />
      </ProCard>
      <ProCard style={{ height: '100%' }}>
        <ReactFlow
          defaultEdgeOptions={{
            animated: false,
            type: 'buttonedge',
            style: { strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          }}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          className="validationflow"
          onInit={setRfInstance}
          proOptions={{ hideAttribution: true }}
          fitView
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={{ STANDARD: StandardNode, REWORK: ReworkNode }}
          edgeTypes={{ buttonedge: ButtonEdge }}
          minZoom={0.2}
          // defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        >
          <MiniMap zoomable pannable />
          <Controls />
          <Background color="#aaa" gap={16} />
          <Panel position="top-right" >
            <button className={tw`relative bg-gradient-to-b from-gray-200 via-gray-50 to-gray-200 shadow-lg 
                rounded-md px-2 py-1 text-gray-600 `} onClick={saveWorkflowGraph}> save </button>
          </Panel>
          <IconBar />
        </ReactFlow>
      </ProCard>
    </ProCard>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
// saveWorkflowGraph(id, rfInstance?.toObject().nodes || [], rfInstance?.toObject().edges || [] )