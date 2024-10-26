import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import { api } from "../API";
import SearchBox from "../components/SearchBox";
import DataTable from "../components/DataTable";
import Pagenation from "../components/Pagenation";
import { Location } from "../mocks/db";

export type GroupType = "all" | "starred";

export const FleetPage = () => {
  const [groupType, setGroupType] = useState<GroupType>("all");
  const [starred, setStarred] = useState<Location["id"][]>([]);
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const getLocations = async () => {
    const res = await api.getLocations({
      page: page,
      location_name: keyword,
      robot_id: keyword,
      is_starred: groupType === "starred",
    });
    setLocations(res.locations);
    setTotalCount(res.total_count);
  };

  const getStarred = async () => {
    const res = await api.getStarred();
    setStarred(res.location_ids);
  };

  useEffect(() => {
    setTimeout(() => {
      getLocations();
      getStarred();
    }, 1000);
  }, []);

  useEffect(() => {
    getLocations();
    getStarred();
  }, [page, trigger]);

  useEffect(() => {
    setPage(1);
    setTrigger((t) => !t);
  }, [groupType, keyword]);

  return (
    <div style={{ height: "100vh", padding: "16px" }}>
      <h1>Your Fleet</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Dropdown setGroupType={setGroupType} starred={starred} />
        <SearchBox setKeyword={setKeyword} />
      </div>
      <DataTable
        locations={locations}
        starred={starred}
        setTrigger={setTrigger}
      />
      <Pagenation
        page={page}
        setPage={setPage}
        locations={locations}
        totalCount={totalCount}
      />
    </div>
  );
};

export default FleetPage;
