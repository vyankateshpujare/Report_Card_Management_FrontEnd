const _ = require("underscore");
const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange,currentPage} = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination ">
        {pageCount === 1
          ? ""
          : pages.map((page) => (
              <li className={currentPage===page?"page-item active animate-pulse ":"page-item "}key={page} >
                <a className="page-link " onClick={()=>{onPageChange(page)}} style={{cursor:"pointer"}}>{page}</a>
              </li>
            ))}
      </ul>
    </nav>
  );
};

export default Pagination;
