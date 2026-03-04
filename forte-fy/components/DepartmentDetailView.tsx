import React from 'react';
import HRDepartment from './departments/HRDepartment';
import PRDepartment from './departments/PRDepartment';
import ITDepartment from './departments/ITDepartment';
import OpsDepartment from './departments/OpsDepartment';
import AcadDepartment from './departments/AcadDepartment';
import Ops_Light from './departments/Ops_Light';
import Acad_Light from './departments/Acad_Light';

interface DepartmentDetailViewProps {
  dept: any;
  navigate: (path: string) => void;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const DepartmentDetailView: React.FC<DepartmentDetailViewProps> = ({ dept, navigate, isDark, setIsDark }) => {
  switch (dept.id) {
    case 'hr':
      return <HRDepartment dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} />;
    case 'pr':
      return <PRDepartment dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} />;
    case 'it':
      return <ITDepartment dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} />;
    case 'ops':
      return isDark ? 
        <OpsDepartment dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} /> : 
        <Ops_Light dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} />;
    case 'acad':
      return isDark ? 
        <AcadDepartment dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} /> : 
        <Acad_Light dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center text-white">
           <p>Department configuration not found.</p>
        </div>
      );
  }
};

export default DepartmentDetailView;