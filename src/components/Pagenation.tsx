import { Location } from "../mocks/db";
import { COUNT_PER_PAGE } from "../mocks/handlers";

interface PagenationProps {
  locations: Location[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  page: number;
}

const Pagenation = (props: PagenationProps) => {
  const { setPage, totalCount, page } = props;
  const count = Math.floor(totalCount / COUNT_PER_PAGE);
  const pages = Array.from({ length: count + 1 }, (_, i) => i + 1);
  return pages.map((num) => (
    <button
      onClick={() => {
        setPage(num);
      }}
      key={num}
      style={{
        width: "30px",
        display: "inline-block",
        backgroundColor: page === num ? "#0091FF" : "#BCBCBC",
      }}
    >
      {num}
    </button>
  ));
};

export default Pagenation;
