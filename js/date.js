(function () {
  var datepicker = {};
  datepicker.getMonthData = function (year, month) {
    var ret = [];
    // 无传参时，为当前日期
    if ((!year || !month) && month != 0) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    var firstDay = new Date(year, month - 1, 1); // 某月份的第一天
    year = firstDay.getFullYear(); // 该月份第一天所在的年份
    month = firstDay.getMonth() + 1; // 哪个月份的第一天
    var firstDayWeekDay = firstDay.getDay(); // 该月份第一天是星期几
    if (firstDayWeekDay === 0) firstDayWeekDay = 7;
    var lastDayOfLastMonth = new Date(year, month - 1, 0); // 上个月的最后一天
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();// 上月的最后一天是上月的第几天，即上月有多少天
    // 当月日历需要在第一行显示上月的几天，日历排列为一二三四五六日，
    // 若当月第一天为周一，则需要显示0天，周二则需要显示1天
    var preMonthDayCount = firstDayWeekDay - 1;
    var lastDay = new Date(year, month, 0); // 本月的最后一天，下个月的第0天
    var lastDate = lastDay.getDate(); // 本月的最后一天是本月的第多少天，即本月共多少天

    for (var i = 0; i < 7 * 6; i++) {
      var date = i + 1 - preMonthDayCount; // 真实日期多少
      var showDate = date; // 显示哪天
      var thisMonth = month;
      // 上一个月
      if (date <= 0) {
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) {
        // 下一个月
        thisMonth = month + 1;
        showDate = showDate - lastDate;
      }
      if (month === 0) thisMonth = 12;
      if (month === 13) thisMonth = 1;
      ret.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      });
    }
    return {
      year: year,
      month: month,
      days: ret
    };

  };

  window.datepicker = datepicker;
})();
