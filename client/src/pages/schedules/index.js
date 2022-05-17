import { useEffect, useState } from "react"
import { axiosInstance } from "../../utils";
import { ScheduleList } from "../../widgets/ScheduleList"

export const Schedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance().get('/schedules');
        setSchedules(res.data.results);
      } catch (err) {
        console.log(err);
      }

    }

    fetchData();

  }, []);

  return <div>{schedules.length > 0 && <ScheduleList schedules={schedules} />}</div>
}