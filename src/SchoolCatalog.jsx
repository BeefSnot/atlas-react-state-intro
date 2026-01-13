import { useEffect, useState, useContext } from 'react';
import { EnrolledCourseContext } from './EnrolledCourseContext';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [page, setPage] = useState(1);

  const { enroll } = useContext(EnrolledCourseContext);

  useEffect(() => {
    fetch('/api/courses.json')
      .then(response => response.json())
      .then(data => setCourses(data));
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.courseNumber.toLowerCase().includes(filter.toLowerCase()) ||
    course.courseName.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortConfig.key !== null) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        if (aNum < bNum) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aNum > bNum) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const PAGE_SIZE = 5;
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedCourses = sortedCourses.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('trimester')}>Trimester</th>
            <th onClick={() => handleSort('courseNumber')}>Course Number</th>
            <th onClick={() => handleSort('courseName')}>Courses Name</th>
            <th onClick={() => handleSort('semesterCredits')}>Semester Credits</th>
            <th onClick={() => handleSort('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCourses.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button onClick={() => enroll(course)}>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)} disabled={startIndex + PAGE_SIZE >= sortedCourses.length}>Next</button>
      </div>
    </div>
  );
}
