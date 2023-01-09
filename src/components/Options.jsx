import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MdDelete, MdOutlineMoreVert } from 'react-icons/md';
import AuthContext from '../context/AuthContext';

const Options = ({ taskId, edit }) => {
  const {
    setTitle,
    setMessage,
    setBadge,
    setType,
    removeTask,
  } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const deleteTask = () => {
    removeTask(taskId);

    setBadge(true);
    setTitle('Successful operation');
    setMessage('Task deleted successfully');
    setType('success');
  };

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
        true
      );
    };
  });

  return (
    <>
      <div className="relative inline-block">
        <MdOutlineMoreVert
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-gray-800 mb-4 dark:text-gray-300 dark:hover:text-white"
        />
        <div
          className={
            open
              ? ' flex flex-col absolute right-0.5 top-5 w-32 shadow-md bg-gray-50 dark:bg-gray-800 dark:text-white'
              : ' absolute hidden'
          }
        >
          <button
            ref={ref}
            onClick={deleteTask}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
          >
            <MdDelete className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg" />
            <span>Delete task</span>
          </button>
          <button
            onClick={edit}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
          >
            <MdDelete className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg" />
            <span>Edite task</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Options;
