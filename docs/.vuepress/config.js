module.exports = {
  theme:"",
  title: "pegogo",
  description: "思想交流与学习笔记",
  base: "/",
  head: [
    ["link",{ rel: "icon",href: "/assets/logo.png" }]
  ],
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    logo:  "/assets/logo.png",
    smoothScroll: true,
    nav: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    lastUpdated: "Last Updated",
    repo: "https://github.com/pe-gogo",
    editLinks: false,
  },
};