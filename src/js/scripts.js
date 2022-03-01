//
// Custom Scripts
// --------------------------------------------------

;
(function ($) {
	'use strict';

	const theme = {
		init: () => {
			theme.heroSLider();
			theme.toggler();
			theme.videoInit();
			// theme.directionsSlider();
			theme.dynamicCounters();
			theme.customTitlteCursor();
			// theme.tabsAutoPlay();
			// theme.addRemoveActive();
			theme.newsFilters();
			theme.newsSlider();
			theme.otherNewsSlider();
		},

		/** Other news slider */

		otherNewsSlider: () => {
			new Swiper(".more-news__slider", {
				slidesPerView: 1,
				navigation: {
					nextEl: ".more-news__slider-next",
					prevEl: ".more-news__slider-prev",
				},
				loop: true,
				breakpoints: {
					768: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
				},
			});
		},

		/** Single news item slider */

		newsSlider: () => {
			new Swiper(".news-single__slider", {
				pagination: {
					el: ".news-single__slider-pagination",
					type: "fraction",
				},
				navigation: {
					nextEl: ".news-single__slider-next",
					prevEl: ".news-single__slider-prev",
				},
			});
		},

		/** News filter */

		newsFilters: () => {
			$('.news-items').isotope({
				itemSelector: '.news-card',
				layoutMode: 'fitRows',
				stagger: 30,
				transitionDuration: 400
			});

			// filter items on button click
			$('.news-filters').on('click', '.news-filter', function () {
				var filterValue = $(this).attr('data-filter');
				$('.news-items').isotope({ filter: filterValue });
				$('.news-filters .news-filter').removeClass('active');
				$(this).addClass('active');
			});


			// const filters = document.querySelectorAll('.news-filter');

			// filters.forEach(filter => {

			// 	filter.addEventListener('click', function () {

			// 		let selectedFilter = filter.getAttribute('data-filter');
			// 		let itemsToHide = document.querySelectorAll(`.news-items .news-card:not([data-filter='${selectedFilter}'])`);
			// 		let itemsToShow = document.querySelectorAll(`.news-items [data-filter='${selectedFilter}']`);

			// 		if (selectedFilter == 'all-news') {
			// 			itemsToHide = [];
			// 			itemsToShow = document.querySelectorAll('.news-items [data-filter]');
			// 		}

			// 		itemsToHide.forEach(el => {
			// 			el.classList.add('hide');
			// 			el.classList.remove('show');
			// 		});

			// 		itemsToShow.forEach(el => {
			// 			el.classList.remove('hide');
			// 			el.classList.add('show');
			// 		});

			// 	});
			// });
		},

		/** Tabs autoplay */

		tabsAutoPlay: () => {

		},

		/* Add or remove active */
		addRemoveActive: () => {
			document.addEventListener('mouseover', e => {
				const isTargetButton = e.target.matches('[data-target-button]');
				if (!isTargetButton && e.target.closest('[data-active]') != null) return;
				let currentTarget;
				if (isTargetButton) {
					currentTarget = e.target.closest('[data-active]');
					currentTarget.classList.toggle('active');
				}
				document.querySelectorAll('[data-active].active').forEach(item => {
					if (item == currentTarget) return;
					item.classList.remove('active');
				});

			});
		},

		customTitlteCursor: () => {
			const svg = document.querySelector('.hero-title__wrapper');
			const circle = document.querySelector('.mask circle');

			if (svg) {
				svg.addEventListener("mouseover", (e) => {
					circle.setAttribute("cx", e.offsetX);
					circle.setAttribute("cx", e.offsetX);
					circle.setAttribute("cy", e.offsetY);
					circle.classList.add('cursor-grow');
				});
				svg.addEventListener("mouseleave", (e) => {
					circle.classList.remove('cursor-grow');
				});

			}

		},
		dynamicCounters: () => {
			const counter = document.querySelectorAll('.counter');
			const counterNumbers = (() => {
				let limit = 0;
				window.addEventListener('scroll', () => {
					if (limit === counter.length) return;

					for (let i = 0; i < counter.length; i++) {
						let pos = counter[i].getBoundingClientRect().top;
						let win = window.innerHeight - 40;
						if (pos < win && counter[i].dataset.stop === '0') {
							counter[i].dataset.stop = 1;
							let x = 0;
							limit++;
							let int = setInterval(() => {
								x = x + Math.ceil(counter[i].dataset.to / 50);
								counter[i].innerText = x;
								if (x > counter[i].dataset.to) {
									counter[i].innerText = counter[i].dataset.to;
									clearInterval(int);
								}
							}, 30);
						}
					}
				});
			})();
		},

		directionsSlider: () => {
			let swiper2 = new Swiper(".directions-slider", {
				loop: false,
				speed: 800,
				spaceBetween: 0,
				slidesPerView: 1,
				initialSlide: 0,
				allowTouchMove: false,
				effect: 'fade',
				disableOnInteraction: true,
				fadeEffect: {
					crossFade: true
				},
				// autoplay: {
				//   delay: 1000,
				//   disableOnInteraction: false,
				// },
				pagination: {
					el: '.directions-pagination',
					type: 'fraction',
					formatFractionCurrent: function (number) {
						return ('0' + number).slice(-2);
					},
					formatFractionTotal: function (number) {
						return ('0' + number).slice(-2);
					},
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' +
							'<span class="' + totalClass + '"></span>';
					},
				},
			});
			let accordionItems = document.querySelectorAll('.accordion-item');
			let index_currentSlide = swiper2.realIndex;
			let currentSlide = swiper2.slides[index_currentSlide];
			// let accordionItem;
			accordionItems.forEach(item => {
				item.addEventListener('click', () => {
					swiper2.slideTo(item.dataset.item);
				});
			});
			swiper2.on('slideChange', function (e) {
				console.log('swiper2.activeIndex', swiper2.realIndex);
			});







		},

		videoInit: () => {
			function findVideos() {
				let videos = document.querySelectorAll('.video');

				for (let i = 0; i < videos.length; i++) {
					setupVideo(videos[i]);
				}
			}

			function setupVideo(video) {
				let link = video.querySelector('.video__link');
				let media = video.querySelector('.video__media');
				let button = video.querySelector('.video__button');
				let id = parseMediaURL(media);

				video.addEventListener('click', () => {
					let iframe = createIframe(id);

					link.remove();
					button.remove();
					video.appendChild(iframe);
				});

				link.removeAttribute('href');
				video.classList.add('video--enabled');
			}

			function parseMediaURL(media) {
				let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
				let url = media.src;
				let match = url.match(regexp);

				return match[1];
			}

			function createIframe(id) {
				let iframe = document.createElement('iframe');

				iframe.setAttribute('allowfullscreen', '');
				iframe.setAttribute('allow', 'autoplay');
				iframe.setAttribute('src', generateURL(id));
				iframe.classList.add('video__media');

				return iframe;
			}

			function generateURL(id) {
				let query = '?rel=0&showinfo=0&autoplay=1';

				return 'https://www.youtube.com/embed/' + id + query;
			}

			findVideos();
		},

		heroSLider: () => {


			let swiper = new Swiper('.hero-slider', {
				grabCursor: true,
				speed: 800,
				effect: 'fade',
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				pagination: {
					el: '.hero-slider-pagination',
					type: 'fraction',
					formatFractionCurrent: function (number) {
						return ('0' + number).slice(-2);
					},
					formatFractionTotal: function (number) {
						return ('0' + number).slice(-2);
					},
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' +
							'<span class="' + totalClass + '"></span>';
					},
				},
				navigation: {
					nextEl: ".hero-slider__button-next",
					prevEl: ".hero-slider__button-prev",
				},
			});
		},

		toggler: () => {
			$(document).on('click', '.data-toggle', function () {
				let $target = $($(this).data('target'));
				let classes = $(this).data('classes');
				let backdrop = $(this).data('backdrop');
				let overflow = $(this).data('overflow');
				let siteBackdrop = $('.site-backdrop');
				let scrollLink = $('.scroll');

				$target.toggleClass(classes);

				if (backdrop === true) {
					siteBackdrop.toggleClass('active');
				}
				if (overflow === true) {
					$('body').toggleClass('overflow-hidden');
					$('html').toggleClass('overflow-hidden');
				}

				siteBackdrop.on('click', function () {
					closeDisable();
				})
				scrollLink.on('click', function () {
					closeDisable();
				})

				return false;
			});

			function closeDisable() {
				$('.site-backdrop').removeClass('active');
				$('.header').removeClass('active');
				$('.mobile-nav').removeClass('active');
				// $('.header-nav-wrapper').removeClass('active');
				$('.menu-toggle').removeClass('active');
				$('body').removeClass('overflow-hidden');
				$('html').removeClass('overflow-hidden');
			}
		}
	}

	theme.init();

})(jQuery);
