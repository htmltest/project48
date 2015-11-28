var sliderPeriod    = 5000;
var sliderTimer     = null;

(function($) {

    $(document).ready(function() {

        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            curSlider.find('.slider-content li:first').css({'z-index': 2});
            var curHTML = '';
            curSlider.find('.slider-content li').each(function() {
                curHTML += '<a href="#"></a>';
            });
            $('.slider-ctrl').html(curHTML);
            $('.slider-ctrl a:first').addClass('active');
            sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
        });

        function sliderNext() {
            var curSlider = $('.slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex >= curSlider.find('.slider-content li').length) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('.slider-ctrl a.active').removeClass('active');
                curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
            }
        }

        $('.slider').on('click', '.slider-ctrl a', function(e) {
            if (!$(this).hasClass('active')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;

                var curSlider = $('.slider');
                if (curSlider.data('disableAnimation')) {
                    var curIndex = curSlider.data('curIndex');
                    var newIndex = $('.slider-ctrl a').index($(this));

                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);

                    curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                    curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1}).show();

                    curSlider.find('.slider-ctrl a.active').removeClass('active');
                    curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                    curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                        curSlider.data('disableAnimation', true);
                        sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                    });
                }
            }

            e.preventDefault();
        });

        $('input.maskPhone').mask('+7 (999) 999-99-99');

        $.extend($.validator.messages, {
            required: 'Не заполнено поле',
            email: 'Введен некорректный e-mail'
        });

        $('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

        $('.form-input-date input').datepicker();

        $('form').each(function() {
            $(this).validate({
                ignore: '',
                invalidHandler: function(form, validatorcalc) {
                    validatorcalc.showErrors();
                    $('.form-file, .form-checkbox').each(function() {
                        var curField = $(this);
                        if (curField.find('label.error').length > 0) {
                            curField.after(curField.find('label.error').clone());
                            curField.find('label.error').remove();
                        }
                    });
                }
            });
        });

        $('.form-checkbox span input:checked').parent().addClass('checked');
        $('.form-checkbox').click(function() {
            $(this).find('span').toggleClass('checked');
            $(this).find('input').prop('checked', $(this).find('span').hasClass('checked')).trigger('change');
        });

        $('.form-radio span input:checked').parent().addClass('checked');
        $('.form-radio').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.form-radio input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).find('span').addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('.form-file input').change(function() {
            $(this).parent().parent().find('.form-file-title').html($(this).val().replace(/.*(\/|\\)/, '')).show();
            $(this).parent().parent().parent().find('label.error').remove();
        });

        $('.main-teaser-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
        });

        $('.main-teaser-slider-next').click(function(e) {
            var curSlider = $(this).parents().filter('.main-teaser-slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex >= curSlider.find('li').length) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('li').eq(curIndex).css({'z-index': 2});
                curSlider.find('li').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('li').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        $('.main-teaser-slider-prev').click(function(e) {
            var curSlider = $(this).parents().filter('.main-teaser-slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex - 1;
                if (newIndex < 0) {
                    newIndex = curSlider.find('li').length - 1;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('li').eq(curIndex).css({'z-index': 2});
                curSlider.find('li').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('li').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        $('.main-tabs li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                $('.main-tabs li.active').removeClass('active');
                curLi.addClass('active');

                var curIndex = $('.main-tabs li').index(curLi);
                $('.main-tabs-content.active').removeClass('active');
                $('.main-tabs-content').eq(curIndex).addClass('active');
            }
            e.preventDefault();
        });

        $('.menu-link').click(function(e) {
            $('.panel').addClass('open');
            e.preventDefault();
        });

        $('.panel-menu-link').click(function(e) {
            $('.panel').removeClass('open');
            e.preventDefault();
        });

        $('.map-mini-open').click(function(e) {
            $('.map-mini').toggleClass('open');
            e.preventDefault();
        });

        $('.gallery-preview a').click(function(e) {
            var curLink = $(this);
            if (!curLink.hasClass('active')) {
                $('.gallery-preview a.active').removeClass('active');
                curLink.addClass('active');
                $('.gallery-big img').attr('src', curLink.attr('href'));
            }
            e.preventDefault();
        });

        $('.top-search-link a').click(function(e) {
            $(this).parent().toggleClass('open');
            $('.search-line').toggleClass('open');
            e.preventDefault();
        });

        $('.search-line-close a').click(function(e) {
            $('.search-line-input input').val('');
            e.preventDefault();
        });

        $('.footer-map-link').click(function(e) {
            $('.footer-map-list').show();
            e.preventDefault();
        });

        $('.footer-map-list-link').click(function(e) {
            $('.footer-map-list').hide();
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.footer-map-text').length == 0) {
                $('.footer-map-list').hide();
            }
        });

        $('.calendar-item-link > a, .calendar-item-more > a').click(function(e) {
            var curLink = $(this);
            var curBlock = curLink.parent();

            $('.calendar-item.open').removeClass('open');
            $('.calendar-item-popup').remove();

            var curItem = curLink.parents().filter('.calendar-item');

            curItem.addClass('open');
            curBlock.append('<div class="calendar-item-popup"><div class="calendar-item-popup-loading"></div><a href="#" class="calendar-item-popup-close"></a></div>');
            $.ajax({
                url: curLink.attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                curBlock.find('.calendar-item-popup-loading').replaceWith(html);
                var curTop = curBlock.find('.calendar-item-popup').offset().top;
                if (curTop < 0) {
                    curBlock.find('.calendar-item-popup').css({'margin-bottom': curTop - 13});
                }
            });
            e.preventDefault();
        });

        $('.calendar').on('click', '.calendar-item-popup-close', function(e) {
            $('.calendar-item.open').removeClass('open');
            $('.calendar-item-popup').remove();
            e.preventDefault();
        });

        $(document).on('click', '.profile-photo-inner span', function(e) {
            $('input[name="newAva"]').click();
            e.preventDefault();
        });

        $('input[name="newAva"]').change(function() {
            var options = {
                success: function(data) {
                    if (data.status == 1) {
                        $('.avaImage').attr('src', data.pic);
                    } else {
                        alert(data.message, 'Ошибка');
                    }
                },
                url:        '/ajax/newAvatar.php',
                type:       'post',
                dataType:   'json',
                clearForm:  true,
                resetForm:  true
            };
            $('input[name="newAva"]').parent().ajaxSubmit(options);
        });

        $('.events-next').click(function(e) {
            var curSlider = $(this).parents().filter('.events');
            var curContainerLeft = $('.container').offset().left + 10;
            var curContainerWidth = $('.container').width();

            curSlider.find('.events-list').stop(true, true);
            curSlider.find('.events-month-title div').stop(true, true);
            var curLeft = Number(curSlider.find('.events-list').css('left').replace(/px/, ''));
            var startLeft = curLeft;
            curLeft -= curContainerWidth;

            curSlider.find('.events-prev').css({'display': 'block'});
            if (curSlider.find('.events-list').width() + curLeft <= curContainerWidth + curContainerLeft) {
                curSlider.find('.events-next').css({'display': 'none'});
                curLeft = -(curSlider.find('.events-list').width() - curContainerWidth - curContainerLeft);
            }
            $('.events-month').each(function() {
                var curMonth        = $(this);
                var curMonthLeft    = curMonth.offset().left + (curLeft - startLeft) - Number(curSlider.find('.events-list').css('margin-left').replace(/px/, ''));
                var curMonthWidth   = curMonth.width();

                if (curMonthLeft >= curContainerLeft + curContainerWidth / 2) {
                    curMonth.find('.events-month-title div').animate({'left': '10px'});
                } else if (curMonthLeft + curMonthWidth <= curContainerLeft +  curContainerWidth / 2) {
                    curMonth.find('.events-month-title div').animate({'left': curMonthWidth - curMonth.find('.events-month-title div').width() - 10});
                } else {
                    curMonth.find('.events-month-title div').animate({'left': curContainerLeft - curMonthLeft + ((curContainerWidth - curMonth.find('.events-month-title div').width()) / 2)});
                }
            });
            curSlider.find('.events-list').animate({'left': curLeft, 'margin-left': 0});

            e.preventDefault();
        });

        $('.events-prev').click(function(e) {
            var curSlider = $(this).parents().filter('.events');
            var curContainerLeft = $('.container').offset().left + 10;
            var curContainerWidth = $('.container').width();

            curSlider.find('.events-list').stop(true, true);
            curSlider.find('.events-month-title div').stop(true, true);
            var curLeft = Number(curSlider.find('.events-list').css('left').replace(/px/, ''));
            var startLeft = curLeft;
            curLeft += curContainerWidth;

            curSlider.find('.events-next').css({'display': 'block'});
            if (curLeft >= curContainerLeft) {
                curSlider.find('.events-prev').css({'display': 'none'});
                curLeft = curContainerLeft;
            }
            $('.events-month').each(function() {
                var curMonth        = $(this);
                var curMonthLeft    = curMonth.offset().left + (curLeft - startLeft) - Number(curSlider.find('.events-list').css('margin-left').replace(/px/, ''));
                var curMonthWidth   = curMonth.width();

                if (curMonthLeft >= curContainerLeft + curContainerWidth / 2) {
                    curMonth.find('.events-month-title div').animate({'left': '10px'});
                } else if (curMonthLeft + curMonthWidth <= curContainerLeft +  curContainerWidth / 2) {
                    curMonth.find('.events-month-title div').animate({'left': curMonthWidth - curMonth.find('.events-month-title div').width() - 10});
                } else {
                    curMonth.find('.events-month-title div').animate({'left': curContainerLeft - curMonthLeft + ((curContainerWidth - curMonth.find('.events-month-title div').width()) / 2)});
                }
            });
            curSlider.find('.events-list').animate({'left': curLeft, 'margin-left': 0});
            e.preventDefault();
        });

        if (Modernizr.touchevents) {
            var touchStartX = 0;
            var touchMoveX = 0;
            var curSlider = $('.events');

            curSlider.on('touchstart', function(e) {
                if (event.targetTouches.length == 1) {
                    event.preventDefault();
                    touchStartX = event.targetTouches[0].pageX;
                }
            });

            curSlider.on('touchmove', function(e) {
                touchMoveX = event.targetTouches[0].pageX - touchStartX;
                curSlider.find('.events-list').css({'margin-left': touchMoveX});
            });

            curSlider.on('touchend', function(e) {
                if (touchMoveX < 0) {
                    $('.events-next').click();
                } else if (touchMoveX > 0) {
                    $('.events-prev').click();
                }
            });
        }

        $(document).on('click', '.form-photo-add', function(e) {
            $('input[name="newPhoto"]').click();
            e.preventDefault();
        });

        $('input[name="newPhoto"]').change(function() {
            var options = {
                success: function(data) {
                    if (data.status == 1) {
                        $('.form-photo-loading').parent().html('<img src="' + data.pic + '" alt="" />');
                        $('.form-photo:last').show();
                    } else {
                        alert(data.message, 'Ошибка');
                    }
                },
                url:        '/ajax/newAvatar.php',
                type:       'post',
                dataType:   'json',
                clearForm:  true,
                resetForm:  true
            };
            $('.form-photo:last').hide();
            $('<div class="form-photo"><div class="form-photo-loading"></div></div>').insertBefore('.form-photo:last');
            $('input[name="newPhoto"]').parent().ajaxSubmit(options);
        });

        $('.territory-filter-item input:checked').parent().parent().addClass('checked');
        $('.territory-filter-item').click(function() {
            $(this).toggleClass('checked');
            $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
        });

        $('.territory-filter-group-title').click(function() {
            $(this).parent().toggleClass('open');
        });

        $('.territory-filter-list').each(function() {
            $(this).jScrollPane({
                autoReinitialise: true
            });
        });

        $('.header-search-mobile').click(function(e) {
            $('.header-search').toggleClass('open');
            e.preventDefault();
        });

        $('.main-teasers').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            var curHTML = '';
            curSlider.find('.main-teaser').each(function() {
                curHTML += '<a href="#"></a>';
            });
            $('.main-teasers-ctrl').html(curHTML);
            $('.main-teasers-ctrl a:first').addClass('active');
        });

        $('.main-teasers').on('click', '.main-teasers-ctrl a', function(e) {
            if (!$(this).hasClass('active')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;

                var curSlider = $('.main-teasers');
                if (curSlider.data('disableAnimation')) {
                    var curIndex = curSlider.data('curIndex');
                    var newIndex = $('.main-teasers-ctrl a').index($(this));

                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);

                    curSlider.find('.main-teasers-ctrl a.active').removeClass('active');
                    curSlider.find('.main-teasers-ctrl a').eq(newIndex).addClass('active');

                    curSlider.find('.main-teaser').eq(curIndex).fadeOut(function() {
                        curSlider.find('.main-teaser').eq(newIndex).fadeIn(function() {
                            curSlider.data('disableAnimation', true);
                        });
                    });
                }
            }

            e.preventDefault();
        });

        $('.filter-name').click(function() {
            var curBlock = $(this).parent();
            if (curBlock.hasClass('filter-open')) {
                curBlock.removeClass('filter-open');
            } else {
                $('.filter-open').removeClass('filter-open');
                curBlock.addClass('filter-open');
            }
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.filter-left').length == 0 && $(e.target).parents().filter('.filter-right').length == 0) {
                $('.filter-open').removeClass('filter-open');
            }
        });

        $('.similars').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            var curHTML = '';
            curSlider.find('.similar').each(function() {
                curHTML += '<a href="#"></a>';
            });
            $('.similars-ctrl').html(curHTML);
            $('.similars-ctrl a:first').addClass('active');
        });

        $('.similars').on('click', '.similars-ctrl a', function(e) {
            if (!$(this).hasClass('active')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;

                var curSlider = $('.similars');
                if (curSlider.data('disableAnimation')) {
                    var curIndex = curSlider.data('curIndex');
                    var newIndex = $('.similars-ctrl a').index($(this));

                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);

                    curSlider.find('.similars-ctrl a.active').removeClass('active');
                    curSlider.find('.similars-ctrl a').eq(newIndex).addClass('active');

                    curSlider.find('.similar').eq(curIndex).fadeOut(function() {
                        curSlider.find('.similar').eq(newIndex).fadeIn(function() {
                            curSlider.data('disableAnimation', true);
                        });
                    });
                }
            }

            e.preventDefault();
        });

        $('.territory-filter-close').click(function(e) {
            var curLink = $(this);
            var curText = curLink.html();
            curLink.html(curLink.attr('rel'));
            curLink.attr('rel', curText);
            $('.territory-filter').toggleClass('close');
            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {
        $('.main-teaser').stop(true, true).removeAttr('style');
        $('.main-teasers').data('curIndex', 0);
        $('.main-teasers').data('disableAnimation', true);

        $('.similar').stop(true, true).removeAttr('style');
        $('.similars').data('curIndex', 0);
        $('.similars').data('disableAnimation', true);

        $('.articles').each(function() {
            var curList = $('.articles');
            curList.find('.article-text').css({'min-height': 0 + 'px'});

            curList.find('.article-text').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                curList.find('.article-text').each(function() {
                    var otherBlock = $(this);
                    if (otherBlock.offset().top == curTop) {
                        var newHeight = otherBlock.height();
                        if (newHeight > curHeight) {
                            curBlock.css({'min-height': newHeight + 'px'});
                        } else {
                            otherBlock.css({'min-height': curHeight + 'px'});
                        }
                    }
                });
            });
        });

        $('.similars').each(function() {
            var curList = $('.similars');
            curList.find('.similar-content').css({'min-height': 0 + 'px'});

            curList.find('.similar-content').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                curList.find('.similar-content').each(function() {
                    var otherBlock = $(this);
                    if (otherBlock.offset().top == curTop) {
                        var newHeight = otherBlock.height();
                        if (newHeight > curHeight) {
                            curBlock.css({'min-height': newHeight + 'px'});
                        } else {
                            otherBlock.css({'min-height': curHeight + 'px'});
                        }
                    }
                });
            });
        });

        $('.events').each(function() {
            var curSlider = $(this);
            var curLeft = $('.container').offset().left + 10;
            var curContainerLeft = curLeft;
            var curContainerWidth = $('.container').width() - 20;

            curSlider.find('.events-list').stop(true, true).css({'left': curLeft, 'margin-left': 0});
            curSlider.find('.events-month-title div').stop(true, true);
            curSlider.find('.events-prev').css({'display': 'none'});
            curSlider.find('.events-next').css({'display': 'block'});

            if (curSlider.find('.events-item.active').length == 1) {
                curLeft -= $('.events-item.active').offset().left - curSlider.find('.events-list').offset().left;
            }
            curSlider.find('.events-list').stop(true, true).css({'left': curLeft, 'margin-left': 0});

            if (curLeft < curContainerLeft) {
                curSlider.find('.events-prev').css({'display': 'block'});
            }
            if (curSlider.find('.events-list').width() + curLeft <= curContainerWidth) {
                curSlider.find('.events-next').css({'display': 'none'});
            }

            $('.events-month').each(function() {
                var curMonth        = $(this);
                var curMonthLeft    = curMonth.offset().left;
                var curMonthWidth   = curMonth.width();

                if (curMonthLeft >= curContainerLeft + curContainerWidth / 2) {
                    curMonth.find('.events-month-title div').css({'left': '10px'});
                } else if (curMonthLeft + curMonthWidth <= curContainerLeft +  curContainerWidth / 2) {
                    curMonth.find('.events-month-title div').css({'left': curMonthWidth - curMonth.find('.events-month-title div').width() - 10});
                } else {
                    curMonth.find('.events-month-title div').css({'left': curContainerLeft - curMonthLeft + ((curContainerWidth - curMonth.find('.events-month-title div').width()) / 2)});
                }
            });
        });

    });

})(jQuery);