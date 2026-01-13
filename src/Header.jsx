import { useContext } from "react";
import logo from "./assets/logo.png";
import { EnrolledCourseContext } from "./EnrolledCourseContext";

export default function Header() {
  const { enrolledCourses } = useContext(EnrolledCourseContext);

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {enrolledCourses.length}</div>
    </div>
  );
}
