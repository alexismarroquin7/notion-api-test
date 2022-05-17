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

  const handleUpdateSchedule = async (schedule_id, changes) => {
    try {
      const res = await axiosInstance().put(`/schedules/${schedule_id}`, changes);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data)
    }
  }
  
  const handleArchiveSchedule = async (schedule_id) => {
    await handleUpdateSchedule(schedule_id, {archived: true})
  }

  return <div>{schedules.length > 0 && <ScheduleList schedules={schedules} archiveSchedule={handleArchiveSchedule}/>}</div>
}