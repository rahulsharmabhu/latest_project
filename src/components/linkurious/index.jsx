import React, { Component, useEffect, useRef, useState } from 'react'

import Tooltip from './tooltip'
import OgmaContainer from './ogmaComponent'
// import initialGraph from './data'
import initialGraph from "./i2SummitTest";
import initialGraph1 from "./i2SummitTest1";
// import initialGraph from './flight.json'
import './styles.css'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap'
import { Icon } from "@iconify/react";
import { useEsmChartData } from '../../app-redux/hooks/useEsmChartData';

// import './App.css';

// external helpers
function createNode(id) {
  return {
    id,
    attributes: {
      color: id % 2 ? "purple" : "orange",
    },
  };
}

function createEdge(node, nodesInGraph) {
  // pick a random node in the graph
  const randomIndex = Math.floor(Math.random() * nodesInGraph.length);
  const otherNode = nodesInGraph[randomIndex];
  return {
    id: `${otherNode.id}-${node.id}`,
    source: otherNode.id,
    target: node.id,
  };
}

const LinkuriousChart = (props) => {
  const { tabId, chartNode } = props
  const selector = Math.round(Math.random())
  const [counter, setCounter] = useState(selector === 0 ? initialGraph.nodes.length : initialGraph1.nodes.length);
  const [graph, setGraph] = useState(selector === 0 ? initialGraph : initialGraph1);
  const [layout, setLayout] = useState("force");
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [tooltipNodeId, setTooltipNodeId] = useState(null);
  const [resetChart, setResetChart] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [targetName, setTargetName] = useState(null);
  const [geoEnabled, setGeoEnabled] = useState(false);
  const [height, setHeight] = useState(0);
  const { esmDataState, removeEsmChartData } = useEsmChartData();

  const mapRef = useRef()

  const addNode = () => {
    const newNode = createNode(counter);
    const nodes = [...graph.nodes, newNode];
    const edges = [...graph.edges, createEdge(newNode, graph.nodes)];

    setGraph({ nodes, edges });
    setCounter((prevCounter) => prevCounter + 1);
  };

  const onLayoutChange = ({ target }) => setLayout(target.value);

  const onNodeUnHover = () => {
    // setTooltipPosition(null);
    // setTooltipNodeId(null);
  };

  const onNodeHover = ({ x, y, target }) => {
    if (target.isNode) {
      setTooltipPosition({ x, y: y + 20 });
      setTooltipNodeId(target.getId());
    }
  };

  const toggle = currentNode => {
    if (currentNode) {
      if (currentNode.isNode) {
        const found = graph.nodes.find((node) => node.id === currentNode.getId())
        setSelectedNode(found.data);
      } else {
        const found = graph.edges.find((edge) => edge.id === currentNode.getId())
        const associatedNode = graph.nodes.find((node) => node.id === found.target)
        setTargetName(associatedNode.data.properties.name)
        setSelectedNode(found.data);
      }
      setVisible(true)
    } else {
      setVisible(false)
      setTargetName(null)
      setSelectedNode(null);
    }
    setTooltipPosition(null);
    setTooltipNodeId(null);
  }

  const handleTooltip = () => {
    const nodeTooltip = tooltipPosition
      ? graph.nodes.find((node) => node.id === tooltipNodeId)
      : null;

    if (!nodeTooltip) {
      return null;
    }

    return <Tooltip position={tooltipPosition} data={nodeTooltip} />;
  };

  useEffect(() => {
    if (visible && mapRef.current) {
      setHeight(mapRef.current.clientHeight)
    }
  }, [visible]);

  const handleTabClose = () => {
    removeEsmChartData(chartNode.getId())
  };

  useEffect(() => {
    if (tabId.startsWith('chart-')) {
      const found = esmDataState.find(x => x.id === tabId);
      const edgeId = new Date().getTime();
      const esmData = {
        'nodes': [
          {
            "id": found.data.id,
            "data": {
              "properties": {
                "name": found.data.targetName,
                "city": found.data.city
              },
              "categories": [
                "Person"
              ],
              "latitude": 48.858838,
              "longitude": 2.343436
            },
            "attributes": {
              "color": "orange",
              "text": found.data.targetName,
              "icon": {
                "font": "FontAwesome",
                "content": "\uf183",
                "color": "#1E3050",
                "style": "bold"
              }
            }
          },
          {
            "id": edgeId,
            "data": {
              "properties": {
                "phone_make": "motorla",
                "phone_number": "000 111 222"
              },
              "categories": [
                "Phone"
              ]
            },
            "attributes": {
              "color": "orange",
              "text": "000 111 222",
              "icon": {
                "font": "FontAwesome",
                "content": "\uf10b",
                "color": "#1E3050",
                "style": "bold"
              }
            },
          },
        ],
        'edges': [
          {
            "id": new Date().getTime(),
            "source": found.data.id,
            "target": edgeId,
            "data": {
              "properties": {
                "call_timestamp_utc": "2023-06-02T05: 13: 26+00: 00"
              },
              "type": "Called"
            },
            "attributes": {
              "text": "Called"
            }
          },
        ]
      }
      setCounter(1)
      setGraph(esmData)
      chartNode.setEventListener("close", handleTabClose)
      return () => chartNode.removeEventListener("close", handleTabClose)
    }
  }, []);

  return (
    <div className="App">
      <Card className='w-100'>
        <CardHeader className='d-flex gap-4' >
          <div className='text-center'>
            <Icon
              icon="material-symbols:folder-open"
              width="23"
              height="23"
            />
            <br />
            <small>Open</small>
          </div>
          <div className='text-center'>
            <Icon
              icon="material-symbols:save"
              width="23"
              height="23"
            />
            <br />
            <small>Save</small>
          </div>
          <div className='text-center'>
            <Icon
              icon="ps:resize"
              width="23"
              height="23"
              onClick={() => setResetChart(!resetChart)}
            />
            <br />
            <small>Reset</small>
          </div>
          <div className='text-center'>
            <Icon
              icon="clarity:export-solid"
              width="23"
              height="23"
            />
            <br />
            <small>Export</small>
          </div>
          <div className='text-center'>
            <Icon
              icon="bxs:image"
              width="23"
              height="23"
            />
            <br />
            <small>Save Image</small>
          </div>
          <div className='text-center'>
            <Icon
              icon={geoEnabled ? 'ph:graph' : 'ic:outline-map'}
              width="23"
              height="23"
              onClick={() => setGeoEnabled(!geoEnabled)}
            />
            <br />
            <small>{geoEnabled ? 'Chart' : 'Map'}</small>
          </div>
        </CardHeader>
        <CardBody className='pt-0 pb-0'>
          <Row className='d-flex h-100'>
            {selectedNode ? (
              <Col className='col-3 properties-panel' style={{ height }}>
                <Table responsive>
                  <tbody>
                    {selectedNode.categories !== undefined ? (
                      <tr>
                        <td colSpan={2} className='text-center'><strong>{selectedNode.categories[0]}</strong></td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={2} className='text-center'><strong>{targetName}</strong></td>
                      </tr>
                    )
                    }

                    {Object.keys(selectedNode.properties).map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <strong>{item.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (item) { return item.toUpperCase() })} : </strong>
                          </td>
                          {item.toLowerCase().includes("url") ? (
                            <td><a href={selectedNode.properties[item]} target="_blank" >{selectedNode.properties[item]}</a></td>
                          ) : (
                            <td>{selectedNode.properties[item]}</td>
                          )
                          }
                        </tr>
                      )
                    })}
                    {selectedNode.categories !== undefined ? (
                      <tr>
                        <td>Post image</td>
                        <td><img src='https://picsum.photos/200/300' width="50" height="75" /></td>
                      </tr>
                    ) : null
                    }
                  </tbody>
                </Table>
              </Col>
            ) : (
              null
            )
            }
            <Col>
              <div ref={mapRef} className='h-100'>
                <OgmaContainer data={graph} onHover={onNodeHover} onUnhover={onNodeUnHover} layout={layout} toggle={toggle} resetChart={resetChart} geoEnabled={geoEnabled} visible={visible} />
                {handleTooltip()}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default LinkuriousChart;
