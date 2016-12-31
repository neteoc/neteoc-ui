let MenuFactory = function () {
  const menu = {
    main: {
      display: "NetEOC",
      items: [    
      ]
    }

  }

  let getMenu = () => {
    return menu;
  };

  let createMenu = () => {

  };

  let addToMainMenu = (item) => {
      menu.main.items.push(item)
  };


  return { getMenu, addToMainMenu };
};

export default MenuFactory;
