import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  fullCourseDetailList,
  fullCourseList,
  placeList,
} from "../../../assets/dummyData/dummyData";
import PlaceCard from "./PlaceCard";

function DailyFullCourse() {
  let state: any = {
    items: [],
    selected: [],
  };

  // placeList.map((place) =>
  //   state.items.push({ id: `place-${place.placeId}`, content: place })
  // );
  // placeList.map((place) =>
  //   state.selected.push({ id: `otherPlace-${place.placeId}`, content: place })
  // );

  // console.log(state);
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */

  return (
    <div></div>
    // <DragDropContext onDragEnd={onDragEnd}>
    //   <Droppable droppableId="droppableFullCourseList">
    //     {(provided: any, snapshot: any) => (
    //       <div
    //         ref={provided.innerRef}
    //         style={getListStyle(snapshot.isDraggingOver)}
    //       >
    //         {!state.items ||
    //           state.items.map((item: any, index: any) => (
    //             <Draggable key={item.id} draggableId={item.id} index={index}>
    //               {(provided: any, snapshot: any) => (
    //                 <div
    //                   ref={provided.innerRef}
    //                   {...provided.draggableProps}
    //                   {...provided.dragHandleProps}
    //                   style={getItemStyle(
    //                     snapshot.isDragging,
    //                     provided.draggableProps.style
    //                   )}
    //                 >
    //                   <PlaceCard
    //                     placeId={item.content.placeId}
    //                     category={item.content.category}
    //                     name={item.content.name}
    //                     thumbnail={item.content.thumbnail}
    //                     address={item.content.address}
    //                     averageScore={item.content.averageScore}
    //                     keywords={item.content.keywords}
    //                   ></PlaceCard>
    //                 </div>
    //               )}
    //             </Draggable>
    //           ))}
    //         {provided.placeholder}
    //       </div>
    //     )}
    //   </Droppable>
    //   <Droppable droppableId="droppablePlaceList">
    //     {(provided: any, snapshot: any) => (
    //       <div
    //         ref={provided.innerRef}
    //         style={getListStyle(snapshot.isDraggingOver)}
    //       >
    //         {!state.selected ||
    //           state.selected.map((item: any, index: any) => (
    //             <Draggable key={item.id} draggableId={item.id} index={index}>
    //               {(provided: any, snapshot: any) => (
    //                 <div
    //                   ref={provided.innerRef}
    //                   {...provided.draggableProps}
    //                   {...provided.dragHandleProps}
    //                   style={getItemStyle(
    //                     snapshot.isDragging,
    //                     provided.draggableProps.style
    //                   )}
    //                 >
    //                   <PlaceCard
    //                     placeId={item.content.placeId}
    //                     category={item.content.category}
    //                     name={item.content.name}
    //                     thumbnail={item.content.thumbnail}
    //                     address={item.content.address}
    //                     averageScore={item.content.averageScore}
    //                     keywords={item.content.keywords}
    //                   ></PlaceCard>
    //                 </div>
    //               )}
    //             </Draggable>
    //           ))}
    //         {provided.placeholder}
    //       </div>
    //     )}
    //   </Droppable>
    // </DragDropContext>
  );
}

export default DailyFullCourse;
