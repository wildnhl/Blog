import { NavLink } from 'react-router-dom';

export function PostsPagination(props) {
  function handleChangeOrder(event) {
    console.log(event.target.value);
    props.setOrderValue(event.target.value);
  }

  function renderPagination() {
    function buildPaginationScheme() {
      const prevPageNumber = +props.pageNumberCurrent - 1; // предполагаемая предыдущая страница, может получиться отрицательной
      const nextPageNumber = +props.pageNumberCurrent + 1; // предполагаемая следующая страница, может получиться больше максимальной
      const scheme = [
        1,
        prevPageNumber,
        +props.pageNumberCurrent,
        nextPageNumber,
        props.pagesCounter
      ]; // строим схему
      const filteredScheme = scheme.filter(
        (item) => item > 0 && item <= props.pagesCounter
      ); // чистим те, которые меньше 0 или больше pagesCounter
      const set = new Set(filteredScheme); // удаляем дубли
      const result = Array.from(set); // обратно приводим к массиву

      if (result[0] + 1 !== result[1]) {
        result.splice(1, 0, '...'); // если между первым и вторым элементом пропуск, вставляем ...
      }

      if (result.at(-2) + 1 !== result.at(-1)) {
        result.splice(result.length - 1, 0, '...'); // если между последним и предпоследним пропуск, вставляем ...
      }

      return result;
    }
    const paginationScheme = buildPaginationScheme();

    return paginationScheme.map((pageNumber, index) => {
      if (pageNumber === '...') {
        return (
          <li className="page-item" key={index}>
            <span className="page-link pe-none">{pageNumber}</span>
          </li>
        );
      }

      return (
        <li className="page-item" key={index}>
          <NavLink
            to={`${props.path}${pageNumber}`}
            className={({ isActive }) =>
              isActive ? 'page-link active' : 'page-link'
            }
          >
            {pageNumber}
          </NavLink>
        </li>
      );
    });
  }

  return (
    <div className="d-flex gap-4 align-items-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination mt-3">{renderPagination()}</ul>
      </nav>
      {props.sort && (
        <>
          <p>Sort:</p>
          <select
            style={{ width: 'fit-content', height: 'fit-content' }}
            className="form-select"
            onChange={handleChangeOrder}
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="text">Text</option>
            <option value="lesson_num">Lesson</option>
          </select>
        </>
      )}
    </div>
  );
}
