import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../../../apis/movie.api";
import PropTypes from "prop-types";
import TheaterByName from "../../../components/TheaterByName/TheaterByName";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Schedule() {
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const { data } = useQuery({
    queryKey: ["getMovieTheaterSystem"],
    queryFn: () => movieApi.getMovieTheaterSystem(),
  });
  const theaterList = data?.content || [];
  return (
    <Box
      sx={{
        width: "80%",
        mx: "auto",
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        // height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "10%",
        }}
      >
        {theaterList.map((theater, index) => {
          return (
            <Tab
              key={theater.maHeThongRap}
              label={<img width={50} src={theater.logo} />}
              {...a11yProps(index)}
            />
          );
        })}
      </Tabs>
      {theaterList.map((theater, index) => {
        return (
          <TabPanel
            className="w-[90%]"
            key={theater.maHeThongRap}
            value={value}
            index={index}
          >
            <TheaterByName maHeThongRap={theater.maHeThongRap} />
          </TabPanel>
        );
      })}
    </Box>
  );
}
