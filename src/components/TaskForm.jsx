import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AuthContext from '../context/AuthContext';
import {
  MdCheck,
  MdClose,
  MdOutlineOpenInFull,
} from 'react-icons/md';

const TaskForm = ({
  close,
  laneId,
  editTitle,
  editBody,
  edit,
  taskId,
  project,
}) => {
  const {
    badge,
    setBadge,
    setTitle,
    setMessage,
    setType,
    addTask,
    updateTask,
  } = useContext(AuthContext);

  const [title, setTaskTitle] = useState(editTitle ?? '');
  const [body, setBody] = useState(editBody ?? '');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const saveTask = event => {
    event.preventDefault();

    if (title.trim() === '') {
      setBadge(true);
      setType('danger');
      setTitle('Error');
      setMessage("Title musn't be empty!");
    } else if (body.trim() === '') {
      setBadge(true);
      setType('danger');
      setTitle('Error');
      setMessage("Body musn't be empty!");
    } else {
      const data = {
        title,
        body,
      };

      if (edit) {
        updateTask(taskId, data);

        setBadge(true);
        setTitle('Successful operation');
        setMessage('Task updated successfully');
        setType('success');
        setTaskTitle('');
        setBody('');
        edit();
      } else {
        // Add task
        addTask({ ...data, project: project.id, stage: laneId });

        // show alert
        setBadge(true);
        setTitle('Successful operation');
        setMessage('Task created successfully');
        setType('success');
        setTaskTitle('');
        setBody('');
        close(false);
      }
    }
  };

  const ref = useRef(null);

  const openFullscreen = () => {
    const elem = ref.current;
    if (elem.requestFullscreen) {
      !isFullScreen
        ? elem.requestFullscreen()
        : document.exitFullscreen();

      setIsFullScreen(!isFullScreen);
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      !isFullScreen
        ? elem.webkitRequestFullscreen()
        : document.webkitExitFullscreen();

      setIsFullScreen(!isFullScreen);
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      !isFullScreen
        ? elem.msRequestFullscreen()
        : document.msExitFullscreen();

      setIsFullScreen(!isFullScreen);
    }
  };

  return (
    <div
      ref={ref}
      className="bg-white p-4 rounded-md dark:bg-gray-800"
    >
      <div className="flex justify-between items-center mb-3">
        <div>
          <label htmlFor="taskTitle" className="sr-only">
            Task title
          </label>
          <input
            name="taskTitle"
            type="text"
            placeholder="Task title"
            className="outline-none focus:border-b-2 focus:border-gray-500 pb-1 font-semibold bg-transparent dark:text-white"
            value={title}
            onChange={event => setTaskTitle(event.target.value)}
          />
        </div>
        <div className="flex gap-2 5 items-center">
          <MdOutlineOpenInFull
            onClick={openFullscreen}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          />
          <MdClose
            onClick={() => {
              if (close) close(false);
              if (edit) edit();
            }}
            className="text-lg text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          />
          <MdCheck
            onClick={saveTask}
            className="text-lg text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          />
        </div>
      </div>
      <label htmlFor="taskBody" className="sr-only">
        Task Body
      </label>
      <textarea
        name="taskBody"
        id="taskBody"
        className="w-full outline-none bg-transparent dark:text-gray-50"
        placeholder="Task description..."
        value={body}
        rows={5}
        onChange={event => setBody(event.target.value)}
      />
    </div>
  );
};

export default TaskForm;
