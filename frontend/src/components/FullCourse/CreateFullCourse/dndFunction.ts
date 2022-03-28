interface DropableList {
  droppableId: string;
  index: number;
}

// fake data generator
export const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

// a little function to help us with reordering the result
export const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// 리스트에서 다른 리스트로 이동하는 함수
export const move = (
  source: any, // 원래있던 리스트
  destination: any, // 이동할 리스트
  droppableSource: DropableList,
  droppableDestination: DropableList
) => {
  const sourceClone = Array.from(source); // 원래 리스트
  const destClone = Array.from(destination); // 이동할 리스트

  const [removed] = sourceClone.splice(droppableSource.index, 1); // 원래리스트에서 삭제해줌
  destClone.splice(droppableDestination.index, 0, removed); // 이동할 리스트의 목적 위치에 삽입해줌

  // console.log("source: ", source);
  // console.log("destination: ", destination);
  // console.log("droppableSource: ", droppableSource);
  // console.log("droppableDestination: ", droppableDestination);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  // droppableId : 놓여질 공간의 id

  return result;
};

// 리스트 요소의 스타일
export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any,
  grid: number = 8
) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: "none",
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightblue" : "grey",
  position: "relative",

  // styles we need to apply on draggables
  ...draggableStyle,
});

// 리스트의 스타일
export const getListStyle = (isDraggingOver: boolean, grid: number = 8) => ({
  background: isDraggingOver ? "lightgreen" : "lightgrey",
  padding: grid,
  minHeight: 100,
});
