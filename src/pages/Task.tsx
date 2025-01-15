import React from 'react';
import { dummyUser, dummyTasks } from '../data/dummyData';
import { FaVideo, FaRetweet, FaUsers, FaCode, FaLaptopCode, FaBug } from 'react-icons/fa';

const TaskTypeIcons: { [key: string]: React.ComponentType } = {
  video: FaVideo,
  repost: FaRetweet,
  attendance: FaUsers,
  contribution: FaCode,
  hackathon: FaLaptopCode,
  bounty: FaBug,
};

const TaskTypeColors: { [key: string]: string } = {
  video: 'bg-blue-600',
  repost: 'bg-green-600',
  attendance: 'bg-yellow-600',
  contribution: 'bg-purple-600',
  hackathon: 'bg-red-600',
  bounty: 'bg-orange-600',
};

const Task: React.FC = () => {
  const completedTasks = dummyTasks.filter(task => task.status === 'completed');
  const unconfirmedTasks = dummyTasks.filter(task => task.status === 'unconfirmed');
  const pendingTasks = dummyTasks.filter(task => task.status === 'pending');

  const taskStats = {
    total: dummyTasks.length,
    completed: completedTasks.length,
    unconfirmed: unconfirmedTasks.length,
    pending: pendingTasks.length,
  };

  const renderTaskList = (tasks: typeof dummyTasks) => (
    <div className="space-y-4">
      {tasks.map((task) => {
        const Icon = TaskTypeIcons[task.type];
        return (
          <div key={task.id} className="border border-gray-700 rounded-lg p-4 transition-all hover:border-gray-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Icon className={`${TaskTypeColors[task.type]} p-1 rounded`} />
                  {task.title}
                </h3>
                <p className="text-gray-400 mt-1">{task.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="px-2 py-1 bg-blue-600 text-white text-sm rounded">
                  XP: {task.xpReward}
                </span>
                <span className={`px-2 py-1 text-white text-sm rounded ${
                  task.status === 'completed' ? 'bg-green-600' :
                  task.status === 'unconfirmed' ? 'bg-yellow-600' : 'bg-gray-600'
                }`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Info Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
        <div className="flex items-center space-x-6">
          <img
            src={dummyUser.avatarUrl}
            alt={dummyUser.username}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{dummyUser.username}</h1>
            <p className="text-gray-400">{dummyUser.email}</p>
            <div className="mt-2">
              <span className="text-xl font-bold text-white">XP: {dummyUser.xp}</span>
              <span className="ml-4 text-lg text-gray-300">Rank: #{dummyUser.rank}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">{taskStats.completed}</div>
              <div className="text-sm text-gray-300">Completed</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">{taskStats.unconfirmed}</div>
              <div className="text-sm text-gray-300">Pending Review</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">{taskStats.pending}</div>
              <div className="text-sm text-gray-300">Available</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">{taskStats.total}</div>
              <div className="text-sm text-gray-300">Total Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Lists */}
      <div className="space-y-8">
        {/* Unconfirmed Tasks */}
        {unconfirmedTasks.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Tasks Pending Review</h2>
            {renderTaskList(unconfirmedTasks)}
          </div>
        )}

        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Available Tasks</h2>
            {renderTaskList(pendingTasks)}
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Completed Tasks</h2>
            {renderTaskList(completedTasks)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
