import { createContext, useState } from 'react';

export const EnrolledCourseContext = createContext();

export const EnrolledCourseProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enroll = (course) => {
    setEnrolledCourses((prev) => [...prev, course]);
  };

  const drop = (course) => {
    setEnrolledCourses((prev) => prev.filter((c) => c.courseNumber !== course.courseNumber));
  };

  return (
    <EnrolledCourseContext.Provider value={{ enrolledCourses, enroll, drop }}>
      {children}
    </EnrolledCourseContext.Provider>
  );
};
