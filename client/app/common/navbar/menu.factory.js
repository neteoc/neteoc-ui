let MenuFactory = function () {
  const menu = {
    main: {
      display: "NetEOC",
      items: [
        { display: "home", url: "/" },
        { display: "about", url: "/about" }
      ]
    }

  }

  let getMenu = () => {
    return menu;
  };

  let createMenu = () => {

  };


  return { getMenu };
};

export default MenuFactory;
