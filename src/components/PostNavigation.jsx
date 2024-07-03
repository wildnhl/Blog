export function PostNavigation() {
  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination justify-content-between'>
        <li className='page-item'>
          <a className='page-link' aria-label='Previous'>
            <span aria-hidden='true'>&laquo;</span>
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' aria-label='Next'>
            <span aria-hidden='true'>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
