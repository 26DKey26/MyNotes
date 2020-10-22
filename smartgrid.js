var smartgrid = require("smart-grid");

var settings = {
  outputStyle: "scss",
  columns: 12,
  offset: "30px",
  mobileFirst: false,
  container: {
    maxWidth: "1400px",
    fields: "30px",
  },
  breakPoints: {
    xl: {
      width: "1600px",
    },
    lg: {
      width: "1200px",
    },
    md: {
      width: "992px",
    },
    sm: {
      width: "767px",
      fields: "15px",
    },
    xs: {
      width: "360px",
    },
  },
};

smartgrid("./src/assets/scss", settings);
