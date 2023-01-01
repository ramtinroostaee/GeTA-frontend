import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import {motion} from 'framer-motion';
import axios from "axios";
import {Paper} from "@mui/material";

const App = () => {
  const [courses, setCourses] = useState();
  console.log(courses);

  useEffect(() => {
    axios.get("core/course/").then((response) => {
      setCourses(response?.data?.response?.data);
    });
  }, []);

  return (
    <>
      <motion.div
        initial={{y: 100, opacity: 0}}
        animate={{y: 0, opacity: 1, transition: {delay: 0.4}}}
      >
        <Paper
          elevation={0}
          className="flex items-center justify-center flex-wrap w-full h-full p-16 mb-16"
        >
          {courses?.map((e) => (
            <Card className="w-400 p-16 flex flex-column justify-around rounded-none items-center m-16" key={e.name}>
              <div>نام درس: {e.name}</div>
              <div>دانشکده: {e.campus}</div>
            </Card>
          ))}
        </Paper>
      </motion.div>
    </>
  );
}

export default App;
