import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import './Pagination.scss';
const ismobile = window.innerWidth <= 768;

let MAX_ITEMS = 9;
if (ismobile) {
  MAX_ITEMS = 3;
}

const MAX_LEFT = (MAX_ITEMS - 1) / 2;

function Pagination({ limit, total, offset, setOffset }) {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
  const first = Math.min(Math.max(current - MAX_LEFT, 1), maxFirst);

  function onPageChange(page) {
    setOffset((page - 1) * limit);

    console.log(
      `valor de page: ${page} + valor de limit: ${limit} = ${
        (page - 1) * limit
      }`,
    );
  }

  return (
    <div className="pagination">
      {/* <p>{`current: ${current}`}</p>
      <p>{`total: ${total}`}</p> */}
      <ul>
        <li>
          <button
            className="pagination-btnCustom"
            onClick={() => onPageChange(current - 1)}
            disabled={current === 1}
          >
            <AiOutlineArrowLeft />
            <span></span>
          </button>
        </li>
        {Array.from({ length: Math.min(MAX_ITEMS, pages) })
          .map((_, index) => index + first)
          .map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={page === current ? 'active' : null}
              >
                {page}
              </button>
            </li>
          ))}

        <li>
          <button
            className="pagination-btnCustom"
            onClick={() => onPageChange(current + 1)}
            disabled={current === pages}
          >
            <AiOutlineArrowRight />
            <span></span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
