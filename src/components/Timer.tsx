"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";

import "./Timer.css";

const Timer = () => {
  const [timingDay, setTimingDay] = useState<string>(" 年 月 日");
  const [timingSecond, setTimingSecond] = useState<string>(" 时 分 秒");

  useEffect(() => {
    // 获取当前时间戳
    const currentTimeStamp = new Date().getTime();
    // 获取目标时间戳(-30年）
    const targetTimeStamp = new Date("1990-05-07 13:14:00").getTime();
    // 计算时间差
    let timeDiff = currentTimeStamp - targetTimeStamp;
    // 计算 日期
    setTimingDay(dayjs(timeDiff).format("YY年MM月DD日"));
    // 定时器
    const interval = setInterval(() => {
      // 计算 时分秒
      setTimingSecond(dayjs(timeDiff).format("HH时mm分ss秒"));
      console.log(timeDiff);
    }, 1000);
    // 组件卸载时清除定时器
    return () => {
      clearInterval(interval);
    };
  }, [timingSecond]);

  return (
    <div className="relative z-10 h-52 w-60">
      <span className="absolute left-5 top-14">AD</span>
      <div className="heartbeat-loader">
        <svg
          className="svg-draw"
          width="100%"
          height="100%"
          viewBox="0 0 150 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="path"
            d="M 0 200 l 40 0 l 5 -40 l 5 40 l 10 0 l 5 15 l 10 -140 l 10 220 l 5 -95 l 10 0 l 5 20 l 5 -20 l 30 0"
            fill="transparent"
            stroke-width="4"
            stroke="black"
          ></path>
        </svg>
        <div className="inner-circle"></div>
      </div>
      <span className="absolute right-5 top-14">hyun</span>
      <div className="absolute left-1/2 translate-x-[-50%] translate-y-[-50%] bottom-4">
        {timingDay}
      </div>
      <div className="absolute left-1/2 translate-x-[-50%] translate-y-[-50%] -bottom-1">
        {timingSecond}
      </div>
    </div>
  );
};

export default Timer;
