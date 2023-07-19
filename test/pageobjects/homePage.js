/* eslint-disable no-undef */
class HomePage {
  get sidebarHome() {
    return $('[data-testid="container-aside-members"]');
  }

  get loginButton() {
    return $('[data-testid="container-aside-members"] a[href="/auth/login"]');
  }
  get signUpButton() {
    return $('[data-testid="container-aside-members"] a[href="/signUp"]');
  }

  get homeButton() {
    return $('[data-testid="container-aside-members"] a[href="/"]');
  }

  get activitiesButton() {
    return $('[data-testid="container-aside-members"] a[href="/activities"]');
  }

  get scheduleButton() {
    return $('[data-testid="container-aside-members"] a[href="/schedule"]');
  }

  get membershipsButton() {
    return $('[data-testid="container-aside-members"] a[href="/membership"]');
  }

  get contactButton() {
    return $('[data-testid="container-aside-members"] a[href="/contact"]');
  }

  get mainSection() {
    return $('div .indexMember_mainContainer__e4ULX');
  }

  get mainTitle() {
    return $('main h1');
  }

  get carouselRoot() {
    return $('.carousel-root');
  }

  get carouselSlidesTitles() {
    return $$('.slider .slide h2');
  }

  get carouselSlidesDesc() {
    return $$('.slider .slide p');
  }

  get carouselControlNext() {
    return $('.control-next');
  }

  get carouselControlPrev() {
    return $('.control-prev');
  }

  get carousel() {
    return $('.carousel-root .carousel');
  }

  get slides() {
    return this.carousel.$$('.slide');
  }
}

module.exports = new HomePage();
