let MenuFactory = function (Auth) {
  const menu = {
    main: {
      display: "NetEOC Menu",
      items: [
      ],
      privateItems: [
      ]
    }

  }

  let getMenu = (name) => {

    

    return menu[name];
  };

  let createMenu = () => {

  };

  let addToMainMenu = (item) => {

    if(item.requireDev && window.location.host.indexOf("localhost") == -1) return;

      if(item.requireLogin){
        menu.main.privateItems.push(item)
      }else {
        menu.main.items.push(item)
      }

  };


  return { getMenu, addToMainMenu };
};

MenuFactory.$inject = ['Auth']
export default MenuFactory;
