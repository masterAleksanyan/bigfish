// // javascript
window.onload = function(){
  
  //  menu  block
  document.getElementById('menu-btn').addEventListener('click', function(){
    this.classList.add('active');
    document.body.classList.add('hidden');
    document.getElementById('header-menu').classList.add('active');
  });
  document.getElementById('closebtn').addEventListener('click', function(){
    document.body.classList.remove('hidden');
    document.getElementById('menu-btn').classList.remove('active');
    document.getElementById('header-menu').classList.remove('active');
  });
  
  
  /// Slider  block
  var sliderBtnItems = null,
      sum = 0;
  var showAllWork = document.getElementById('show-all-work');
  var homeSlider = document.getElementById('homeslider');
  var homeLine = document.getElementById('home-line');
  var onePageBlock = document.getElementById('one-page-block');
  var sliderNav = document.getElementById('slider-nav');
  var sliderBtn = document.getElementById('sliderbtn');
  var sliderItems = document.querySelectorAll('#homeslider .slider__item');
  var sliderbuttons__item = document.querySelectorAll('.sliderbuttons__item');
  var homeslider__item = document.querySelectorAll('.homeslider__item');
  var slidePageContent = document.querySelectorAll('.slide-page__content');
  
  // Show slider btn
  if(showAllWork){
    showAllWork.addEventListener('click', showSlider);
  }
  
  if(homeSlider){
    homeSlider.classList.remove('opacity');
  }
  
  // Slider next/prev btns
  if(sliderbuttons__item.length){
    for(let i=0; i<sliderbuttons__item.length; i++){
      sliderbuttons__item[i].addEventListener('click', function(){
        if(this.className.match('nextarrow')){
          slideSlider(true);
        }
        if(this.className.match('prevarrow')){
          slideSlider(false);
        }
      });
    }
  }
  
  
  // Slider next/prev scrolling
  if(window.innerWidth > 961 && homeslider__item.length){
    if (document.addEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        document.addEventListener("wheel", onWheel);
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        document.addEventListener("mousewheel", onWheel);
      } else {
        // Firefox < 17
        document.addEventListener("MozMousePixelScroll", onWheel);
      }
    } else { // IE8-
      document.attachEvent("onmousewheel", onWheel);
    }
  }
  
  let count = 1;
  function onWheel(e) {
    if(count){
      e = e || window.event;
      
      var delta = e.deltaY || e.detail || e.wheelDelta
      
      sum++;
      if(!(sum%3)){
        var activeItem = returnActiveSlider();
        if(delta > 0){
          if(activeItem === false){
            showSlider();
          } else {
            slideSlider(true);
          }
        }
        if (delta < 0) {
          if(activeItem === false){
            return false;
          }
          if(activeItem === 0){
            hideSlider();
          } else {
            slideSlider(false);
          }
        }
        count = 0;
        setTimeout(function(){
          count = 1;
        },1300);
      }
    }
  }
  
  
  
  
  function hideSlider(){
    sliderBtnItems[0].classList.remove('active');
    sliderItems[0].classList.remove('active');
    sliderItems[0].querySelector('.video-block').classList.remove('active');
    onePageBlock.classList.remove('none');
    homeLine.classList.remove('none');
    sliderNav.classList.add('none');
  }
  
  function showSlider(){
    sliderBtnItems[0].classList.add('active');
    sliderItems[0].classList.add('active');
    sliderItems[0].querySelector('.video-block').classList.add('active');
    onePageBlock.classList.add('none');
    homeLine.classList.add('none');
    sliderNav.classList.remove('none');
  }
  
  //  working Slider
  function slideSlider(num){
    var i = returnActiveSlider();
    if(num){
      if(i === sliderItems.length - 1){
        return false;
      }
      rem();
      sliderItems[i+1].classList.add('active');
      sliderItems[i+1].querySelector('.video-block').classList.add('active');
      sliderBtnItems[i+1].classList.add('active');
    } else {
      rem();
      sliderItems[i-1].classList.add('active');
      sliderItems[i-1].querySelector('.video-block').classList.add('active');
      sliderBtnItems[i-1].classList.add('active');
    }
    
    function rem(){
      sliderItems[i].querySelector('.video-block').classList.remove('active');
      sliderItems[i].classList.remove('active');
      sliderBtnItems[i].classList.remove('active');
    }
  }
  
  function returnActiveSlider(){
    for(let i=0; i<sliderItems.length; i++){
      if(sliderItems[i].className.match('active')){
        return i;
      }
    }
    return false;
  }
  
  // Init Slider arrows
  if(sliderItems.length && sliderBtn){
    for(let i=0; i<sliderItems.length; i++){
      var btnItem = document.createElement('BUTTON');
      btnItem.classList.add('sliderbtn__item');
      btnItem.innerText = i+1;
      sliderBtn.appendChild(btnItem);
    }
    sliderBtnItems = document.querySelectorAll('.sliderbtn__item');
    
    for(let i=0; i<sliderBtnItems.length; i++){
      sliderBtnItems[i].addEventListener('click', function(){
        if(this.className.match('active')){
          return false;
        } else {
          let item = returnActiveSlider();
          sliderItems[item].querySelector('.video-block').classList.remove('active');
          sliderItems[item].classList.remove('active');
          sliderBtnItems[item].classList.remove('active');
          sliderItems[i].querySelector('.video-block').classList.add('active');
          sliderItems[i].classList.add('active');
          sliderBtnItems[i].classList.add('active');
        }
      });
    }
  }
  
  
  // Working Slider arrows
    
  
  /// Slider  end
  
  ///  Modal slider
  let modalSlider = document.getElementById('modalslider');
  let modalsliderBlock = document.getElementById('modalslider-block');
  let modalCloseBtn = document.getElementById('modal-closebtn');
  let modalSliderItems = document.querySelectorAll('.modalslider__item');
  let modalIframes = document.querySelectorAll('.modalslider__item iframe');
  let videoBlockPlay = document.querySelectorAll('.video-block__play');
  let slider__item = document.querySelectorAll('.slider__prevu');
  
  if(modalCloseBtn){
    modalCloseBtn.addEventListener('click', function(){
      pauseVideo();
      modalsliderBlock.classList.remove('active');
      document.body.classList.remove('hidden');
    });
  }
  
  function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }
  
  
  if(videoBlockPlay.length){
    for(let i=0; i<videoBlockPlay.length; i++){
      videoBlockPlay[i].addEventListener('click', function(){
        let par = findAncestor(this, 'slider__prevu');
        let attr = par.attributes['data-videoname'].value;
        goModalVideo(attr);
      });
    }
  }
  
  if(slider__item.length){
    for(let i=0; i<slider__item.length; i++){
      slider__item[i].addEventListener('click', function(ev){
        if(!ev.target.className.match('more-video')){
          let attr = this.attributes['data-videoname'].value;
          goModalVideo(attr);
        }
      });
    }
  }
  
  function goModalVideo (attr){
    let id = document.getElementById(attr);
    modalsliderBlock.classList.add('active');
    document.body.classList.add('hidden');
    modalSliderInit(id);
  }
  
  if(modalSliderItems.length){
    for(let i=0; i<modalSliderItems.length; i++){
      modalSliderItems[i].addEventListener('click', function(){
        if(!this.className.match('active')){
          modalSliderInit(this);
        }
      });
    }
  }
  
  function modalSliderInit(t){
    var player = new Vimeo.Player(t.querySelector('iframe'));
    pauseVideo();
    player.play();
    let offLeft = -t.offsetLeft;
    modalSlider.style.transform = 'translate('+ offLeft +'px, -50%)';
    removeActive(modalSliderItems);
    t.classList.add('active');
  }
  
  function pauseVideo(){
    for(let i=0; i<modalIframes.length; i++){
      let player = new Vimeo.Player(modalIframes[i]);
      player.pause();
    }
  }
  
  
  function removeActive(arr){
    for(let i=0; i<arr.length; i++){
      arr[i].classList.remove('active');
    }
  }
  
  ///  share block
  let share = document.querySelectorAll('.modal-share');
  if(share.length){
    for(let i=0; i<share.length; i++){
      share[i].addEventListener('click', function(){
        this.classList.add('active');
      });
    }
  }
  
  /// Modal slider end
  
  
  ///  add outline in TAB
  let inputs = document.querySelectorAll('input, button, textarea, a');
  if(inputs.length){
    for(let i=0; i<inputs.length; i++){
      inputs[i].addEventListener('keyup', function(ev){
        if(ev.keyCode === 9){
          removeFocuseItems();
          this.classList.add('focuselem');
        }
      });
      inputs[i].addEventListener('blur', removeFocuseItems);
    }
  }
  function removeFocuseItems(){
    for(let i=0; i<inputs.length;i++){
      inputs[i].classList.remove('focuselem');
    }
  }
  
  
  ///  more-slider
  let moreSliderItem = document.querySelectorAll('.more-slider__item');
  let moreVideo = document.querySelectorAll('.more-video');
  let moreSliderArrows = document.getElementById('more-slider-arrows');
  let moreClosebtn = document.getElementById('more-closebtn');
  let moreModal = document.getElementById('more-modal');
  let showAllTags = document.getElementById('show-all-tags');
  let moreSliderBtn = null;
  
  if(showAllTags){
    showAllTags.addEventListener('click', function(){
      this.classList.toggle('hide');
      this.parentNode.classList.toggle('hide');
    });
  }
  
  if(moreClosebtn){
    moreClosebtn.addEventListener('click', function(){
      moreModal.classList.remove('active');
      document.body.classList.remove('hidden');
    });
  }
  
  if(moreVideo.length){
    for(let i=0; i<moreVideo.length; i++){
      moreVideo[i].addEventListener('click', function(){
        moreModal.classList.add('active');
        document.body.classList.add('hidden');
      });
    }
  }
  
  if(moreSliderItem.length && moreSliderArrows){
    for(let i=0; i<moreSliderItem.length; i++){
      let btnItem = document.createElement('BUTTON');
      if(i === 0) {
        btnItem.classList.add('active');
      }
      btnItem.classList.add('more-slider__arrow');
      moreSliderArrows.appendChild(btnItem);
    }
    moreSliderBtn = document.querySelectorAll('.more-slider__arrow');
    for(let i=0; i<moreSliderBtn.length; i++){
      moreSliderBtn[i].addEventListener('click', function(){
        removeActive(moreSliderBtn);
        removeActive(moreSliderItem);
        this.classList.add('active');
        moreSliderItem[i].classList.add('active');
      });
    }
  }
  
  let requistBtn = document.getElementById('requist-closebtn');
  let modalRequist = document.getElementById('modal-requist');
  let requistLink = document.querySelectorAll('.requist-link');
  let modalCloseThenk = document.getElementById('modal-requist-thenk');
  let closeThenk = document.querySelectorAll('.close-thenk');
  
  if(requistBtn){
    requistBtn.addEventListener('click', function(){
      document.body.classList.remove('hidden');
      modalRequist.classList.remove('active');
    });
  }
  if(requistLink){
    for(let i=0; i<requistLink.length; i++){
      requistLink[i].addEventListener('click', function(){
        document.body.classList.add('hidden');
        modalRequist.classList.add('active');
      });
    }
  }
  if(closeThenk){
    for(let i=0; i<closeThenk.length; i++){
      closeThenk[i].addEventListener('click', function(){
        modalCloseThenk.classList.remove('active');
      })
    }
  }
  
  //  map
  let map = document.getElementById('map');
  if(map){
    ymaps.ready(init);
  }
  
  function init () {
      var myMap = new ymaps.Map("map", {
              center: [55.0348,82.9127],
              zoom: 16
          }, {
              searchControlProvider: 'yandex#search'
          }),
          myPlacemark = new ymaps.Placemark([55.0348,82.9117], {
              // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
              balloonContentHeader: "Балун метки",
              balloonContentBody: "Содержимое <em>балуна</em> метки",
              balloonContentFooter: "Подвал",
              hintContent: "проспект Димитрова 7"
          }, {
              // Опции.
              // Необходимо указать данный тип макета.
              iconLayout: 'default#image',
              // Своё изображение иконки метки.
              iconImageHref: 'build/img/mapicon.svg',
              // Размеры метки.
              iconImageSize: [70, 100],
              // Смещение левого верхнего угла иконки относительно
              // её "ножки" (точки привязки).
              iconImageOffset: [-39, -39]
          });

      myMap.geoObjects
        .add(myPlacemark);
  }
  
}



$(document).ready(function($){
  $('.phone-mask').mask("+7(999)999-99-99");
  
  if($('.more-slider__imgblock')){
    $('.more-slider__imgblock').slick({
      arrows: false,
      dots: true,
      dotsClass: 'more-slider__arrows',
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 3000
    });
  }
});








