import { Pagination } from "react-bootstrap";

export default function MyPagination(props) {
  const { page, setPage, pageCount } = props;

  return (
    <Pagination style={{ float: "right", marginRight: "4%" }}>
      <Pagination.First
        onClick={() => setPage(1)}
        disabled={Number(page) === 1}
      />
      <Pagination.Prev
        disabled={Number(page) === 1}
        onClick={() => setPage(page - 1)}
      />
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((item) => {
        return (
          <Pagination.Item
            active={Number(page) === item}
            onClick={() => setPage(item)}
          >
            {item}
          </Pagination.Item>
        );
      })}
      <Pagination.Next
        disabled={Number(page) === pageCount}
        onClick={() => setPage(page + 1)}
      />
      <Pagination.Last
        onClick={() => setPage(pageCount)}
        disabled={Number(page) === pageCount}
      />
    </Pagination>
  );
}
