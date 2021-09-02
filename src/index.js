
import { Sigma } from 'sigma';
import { UndirectedGraph } from 'graphology';
import { circular } from 'graphology-layout';

const avengerGraph = new UndirectedGraph();

const user = {
    id: 1,
    name: 'tony_stark',
};
const userRoles = [
    { id: 1, name: "Avenger" },
    { id: 2, name: "Billionaire" },
    { id: 3, name: "Playboy" },
    { id: 4, name: "Philanthropist" }
];

avengerGraph.addNode(user.name, {
    label: user.name,
    size: 10,
    color: '#B10101'
});
userRoles.forEach((role, index) => {
    avengerGraph.addNode(role.name, {
        label: role.name,
        size: 10,
        color: '#BF017A'
    });

    avengerGraph.addUndirectedEdge(user.name, role.name);
});

circular.assign(avengerGraph);

document.getElementById('graph').style.height = '500px';
const renderer = new Sigma(avengerGraph, document.getElementById('graph'));

renderer.on('clickNode', (event) => {
    alert(event.node);
});

let draggedNode = null;
let currentlyDragging = false;

const camera = renderer.getCamera();
const captor = renderer.getMouseCaptor();

renderer.on("downNode", (e) => {
    if (!renderer.getCustomBBox()) {
        renderer.setCustomBBox(renderer.getBBox());
    }

    currentlyDragging = true;
    draggedNode = e.node;
    camera.disable();
});
  
captor.on("mouseup", () => {
    currentlyDragging = false;
    draggedNode = null;
    camera.enable();
});

captor.on("mousemove", (e) => {
    if (!currentlyDragging || !draggedNode) {
        return;
    }

    // Get new position of node
    const pos = renderer.viewportToGraph(e);

    avengerGraph.setNodeAttribute(draggedNode, "x", pos.x);
    avengerGraph.setNodeAttribute(draggedNode, "y", pos.y);
});

