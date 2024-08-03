import React, { useRef, useCallback } from 'react';
import { useState } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background,
    MiniMap,
    reconnectEdge,
} from 'reactflow';
import CustomNode from './CustomNode';
import RightBar from './RightBar';

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
    customNode: CustomNode,
};

const initialNodes = [];
const initialEdges = [];

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();

    const [nodesData, setNodesData] = useState([]);

    const [selectedNode, setSelectedNode] = useState(null);

    const handleNodeClick = (node) => {
        setSelectedNode(node);
    };
    
    const onCloseRightBar = () => {
        setNodes((nodes) => nodes.map(node => ({
            ...node,
            selected: false,
        })));
        setSelectedNode(null);
    };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        []
    );
    
    const onReconnect = useCallback(
        (oldEdge, newConnection) =>
            setEdges((els) =>
                reconnectEdge(
                    { ...oldEdge, animated: true },
                    { ...newConnection, animated: true },
                    els
                )
            ),
        []
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const nodeDataString = event.dataTransfer.getData('application/reactflow');
            const nodeData = JSON.parse(nodeDataString);

            if (!nodeData) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(),
                type: 'customNode',
                position,
                data: nodeData,
            };

            setNodes((nds) => nds.concat(newNode));
            setNodesData((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition],
    );

    const handleFormDataChange = (newFormData) => {
        const newNodeData = [...nodesData]
        const newNode = newNodeData.find((node) => node.id === selectedNode.id)

        newNode.data.formData = newFormData
        setNodesData(newNodeData)
    }

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onReconnect={onReconnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onSelectionChange={(elements) => {
                        if (elements.nodes.length === 0) {
                            setSelectedNode(null);
                        }
                    }}
                    nodeTypes={nodeTypes}
                    onNodeClick={(event, node) => handleNodeClick(node)}
                    fitView
                >
                    <Background />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>
            <RightBar
                open={Boolean(selectedNode)}
                toolName={selectedNode?.data?.name}
                onClose={onCloseRightBar}
                formData={selectedNode?.data?.formData}
                onFormDataChange={handleFormDataChange}
            />
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDFlow />
    </ReactFlowProvider>
);
