
import React from 'react';
import { HomeIcon, BuildingStorefrontIcon, TagIcon, ListBulletIcon, ArrowsRightLeftIcon } from './icons';
import { type View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  viewName: View;
  currentView: View;
  setView: (view: View) => void;
}> = ({ icon: Icon, label, viewName, currentView, setView }) => {
  const isActive = currentView === viewName;
  return (
    <li
      onClick={() => setView(viewName)}
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-800'
      }`}
    >
      <Icon className="h-6 w-6" />
      <span className="ml-4 font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <aside className="w-64 bg-white shadow-xl p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <BuildingStorefrontIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="ml-3 text-2xl font-bold text-gray-800">Super Mall</h1>
      </div>
      <nav>
        <ul>
          <NavItem icon={HomeIcon} label="Dashboard" viewName="dashboard" currentView={currentView} setView={setView} />
          <NavItem icon={BuildingStorefrontIcon} label="Shops" viewName="shops" currentView={currentView} setView={setView} />
          <NavItem icon={TagIcon} label="Offers" viewName="offers" currentView={currentView} setView={setView} />
          <NavItem icon={ListBulletIcon} label="Categories" viewName="categories" currentView={currentView} setView={setView} />
          <NavItem icon={ArrowsRightLeftIcon} label="Compare" viewName="comparison" currentView={currentView} setView={setView} />
        </ul>
      </nav>
      <div className="mt-auto p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-sm text-gray-600">&copy; 2024 Super Mall Inc.</p>
        <p className="text-xs text-gray-400 mt-1">Admin Portal v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
