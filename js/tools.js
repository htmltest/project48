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

        $('.form-select select').chosen({disable_search: true});

        $('form').each(function() {
            $(this).validate({
                ignore: '',
                invalidHandler: function(form, validatorcalc) {
                    validatorcalc.showErrors();
                    $('.form-file').each(function() {
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
            $('.top-search-link').removeClass('open');
            $('.search-line').removeClass('open');
            $('.search-line-input input').val('');
            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {
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
    });

})(jQuery);