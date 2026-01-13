import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";

import { EnrolledCourseProvider } from "./EnrolledCourseContext";

export default function App() {
  return (
    <EnrolledCourseProvider>
      <div className="school-catalog-app">
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </EnrolledCourseProvider>
  );
}
