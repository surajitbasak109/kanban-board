import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Lane from './Lane';

const lanes = [
  { id: 1, title: 'To Do' },
  { id: 2, title: 'In Progress' },
  { id: 3, title: 'Review' },
  { id: 4, title: 'Done' },
];

const Board = ({ project }) => {
  const [task, setTasks] = useState([]);
  const { badge, setTitle, setMessage, setBadge, setType, tasks } =
    useContext(AuthContext);

  const onDrop = (e, landeId) => {};
  const onDragStart = (event, id) => {
    event.dataTransfer.setData('id', id);
  };

  const onDragOver = e => {
    e.preventDefault();
  };

  return (
    <div className="grow flex flex-col w-full items-center bg-gray-100 p-5 pb-0 dark:bg-gray-700">
      <div
        className="scrollbar w-full px-3 xl:px-10 max-w-8xl grid gap-5 justify-between overflow-x-auto pb-5"
        style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
      >
        {lanes.map(lane => (
          <Lane
            key={lane.id}
            title={lane.title}
            laneId={lane.id}
            tasks={tasks.filter(task => +task.stage === lane.id)}
            project={project}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
