class Joystick {
    constructor(form, Vue, popups) {
      this.form = form;
      this.popups = popups;
      this.$Vue = Vue
      this.joystickStatus = {
        leftMenu: false,
        rightMenu: false,
      }

      Vue.$bus.$on("joystickRightButton", (e) => this.joystickRightButtonPressed(e));
      Vue.$bus.$on("joystickLeftButton", (e) => this.joystickLeftButtonPressed(e));
    }
    
    joystickRightButtonPressed(e) {
      let myRigthMenu = this.form.getComponentByName('EPCSRightPopupMenu').component;
      this.joystickStatus.rightMenu = !this.joystickStatus.rightMenu
      myRigthMenu.setIsOpen(this.joystickStatus.rightMenu)
    }
  
    joystickLeftButtonPressed(e) {
      let myLeftMenu = this.form.getComponentByName('EPCSLeftPopupMenu').component;
      this.joystickStatus.leftMenu = !this.joystickStatus.leftMenu
      myLeftMenu.setIsOpen(this.joystickStatus.leftMenu)
    }
  
  }
  
  export default Joystick;
  